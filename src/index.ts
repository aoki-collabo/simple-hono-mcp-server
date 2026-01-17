import { Hono } from "hono";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPTransport } from "@hono/mcp";
import { z } from "zod";

// 定数
const MAX_INPUT_VALUE = 999999999999999; // 15桁まで対応

// zodスキーマによるバリデーション
const factorizeInputSchema = z.object({
  number: z
    .number({ message: "正の整数を入力してください" })
    .int({ message: "正の整数を入力してください" })
    .min(1, { message: "正の整数を入力してください" })
    .max(MAX_INPUT_VALUE, { message: "入力値が上限（15桁）を超えています" }),
});

// 素因数分解の結果
export interface FactorizeResult {
  factors: number[];
  divisionCount: number; // 割り算を行った回数
}

// 素因数分解アルゴリズム
export function factorize(n: number): FactorizeResult {
  if (n === 1) return { factors: [1], divisionCount: 0 };

  const factors: number[] = [];
  let remaining = n;
  let divisionCount = 0;

  while (remaining % 2 === 0) {
    divisionCount++;
    factors.push(2);
    remaining = remaining / 2;
  }

  let divisor = 3;
  while (divisor * divisor <= remaining) {
    divisionCount++;
    while (remaining % divisor === 0) {
      factors.push(divisor);
      remaining = remaining / divisor;
    }
    divisor += 2;
  }

  if (remaining > 1) {
    factors.push(remaining);
  }

  return { factors, divisionCount };
}

// MCPサーバーのセットアップ
const mcpServer = new McpServer({
  name: "simple-mcp-server",
  version: "1.0.0",
});

// factorizeツールの登録
mcpServer.registerTool(
  "factorize",
  {
    description:
      "正の整数を素因数分解します。素因数のリストと割り算回数を返します。",
    inputSchema: factorizeInputSchema,
  },
  async ({ number }) => {
    const { factors, divisionCount } = factorize(number);

    return {
      content: [
        {
          type: "text",
          text: `${number}の素因数分解結果:\n素因数: [${factors.join(", ")}]\n割り算回数: ${divisionCount.toLocaleString()}回`,
        },
      ],
    };
  }
);

// Honoアプリケーションのセットアップ
const app = new Hono();
const transport = new StreamableHTTPTransport();

app.all("/mcp", async (c) => {
  if (!mcpServer.isConnected()) {
    await mcpServer.connect(transport);
  }
  return transport.handleRequest(c);
});

export default app;
