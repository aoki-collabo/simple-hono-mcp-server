# simple-mcp-server

CloudflareとHonoで作る最もシンプルなリモートMCPサーバー。

## 概要

このプロジェクトは、[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) サーバーをCloudflare Workers上で動作させるサンプル実装です。Honoフレームワークを使用し、最小限のコードでMCPサーバーを構築できることを示しています。

## 提供するツール

### factorize

正の整数を素因数分解するツールです。

**入力**:
- `number`: 素因数分解する正の整数（1以上、15桁以下）

**出力**:
- 素因数のリスト
- 割り算回数

**例**:
```
入力: 12
出力: 12の素因数分解結果:
素因数: [2, 2, 3]
割り算回数: 3回
```

## 前提条件

- Node.js v18以上
- Cloudflareアカウント（デプロイする場合）

## セットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd simple-mcp-server

# 依存関係のインストール
npm install
```

## ローカル実行

```bash
npm run dev
```

サーバーが `http://localhost:8787` で起動します。MCPエンドポイントは `http://localhost:8787/mcp` です。

## テスト

```bash
npm test
```

## Cloudflareへのデプロイ

```bash
# Cloudflareにログイン（初回のみ）
npx wrangler login

# デプロイ
npm run deploy
```

デプロイ後、`https://<your-worker>.workers.dev/mcp` でアクセスできます。

## MCPクライアントからの接続

### Claude Desktop

`claude_desktop_config.json` に以下を追加:

```json
{
  "mcpServers": {
    "simple-mcp-server": {
      "url": "http://localhost:8787/mcp"
    }
  }
}
```

デプロイ後は `url` をCloudflare WorkersのURLに変更してください。

### Claude Code

```bash
claude mcp add simple-mcp-server http://localhost:8787/mcp --transport http
```

## 動作確認

curlでの確認:

```bash
# ツール一覧の取得
curl -X POST http://localhost:8787/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "method": "tools/list", "id": 1}'

# 素因数分解の実行
curl -X POST http://localhost:8787/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "factorize", "arguments": {"number": 12}}, "id": 2}'
```

## 技術スタック

- [Hono](https://hono.dev/) - 軽量Webフレームワーク
- [@hono/mcp](https://github.com/honojs/middleware/tree/main/packages/mcp) - HonoのMCPサポート
- [Cloudflare Workers](https://workers.cloudflare.com/) - サーバーレス実行環境
- [Vitest](https://vitest.dev/) - テストフレームワーク
- [zod](https://zod.dev/) - スキーマバリデーション

## ライセンス

MIT

## License Notice

Claude Code関連ドキュメント（`.claude/`、`.steering/`等）は [GenerativeAgents/claude-code-book-chapter8](https://github.com/GenerativeAgents/claude-code-book-chapter8) を参考にしています（MIT License）。
