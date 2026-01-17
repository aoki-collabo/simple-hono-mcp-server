# 開発ガイドライン (Development Guidelines)

## コーディング規約

### 命名規則

#### 変数・関数

**TypeScript**:
```typescript
// 変数: camelCase、名詞または名詞句
const factorList = [2, 2, 3];
const elapsedTime = 0.5;
const isValidInput = true;

// 関数: camelCase、動詞で始める
function factorize(n: number): number[] { }
function validateInput(input: unknown): boolean { }
function formatResult(factors: number[], ms: number): string { }

// 定数: UPPER_SNAKE_CASE
const MAX_INPUT_VALUE = 999999999999999;
const ERROR_MESSAGES = {
  invalidInput: '正の整数を入力してください',
  exceedsLimit: '入力値が上限（15桁）を超えています',
} as const;
```

#### 型定義

```typescript
// インターフェース: PascalCase
interface FactorizeInput {
  number: number;
}

interface FactorizeOutput {
  factors: number[];
  divisionCount: number;
}

// 型エイリアス: PascalCase
type ErrorCode = 'INVALID_INPUT' | 'EXCEEDS_LIMIT';
```

### コードフォーマット

**インデント**: 2スペース

**行の長さ**: 最大100文字

**例**:
```typescript
// Honoアプリケーション
const app = new Hono();

app.post('/mcp', async (c) => {
  const request = await c.req.json();
  const result = handleMCPRequest(request);
  return c.json(result);
});
```

### コメント規約

**関数のドキュメント（必要な場合のみ）**:
```typescript
/**
 * 正の整数を素因数分解する
 *
 * @param n - 素因数分解する正の整数（1以上、15桁以下）
 * @returns 素因数のリスト（例: 12 → [2, 2, 3]）
 */
function factorize(n: number): number[] {
  // 実装
}
```

**インラインコメント**:
```typescript
// 良い例: なぜそうするかを説明
// 2で割り切れる間は2を追加（偶数の処理を最初に行う）
while (remaining % 2 === 0) {
  factors.push(2);
  remaining = remaining / 2;
}

// 悪い例: 何をしているか（コードを見れば分かる）
// remainingを2で割る
remaining = remaining / 2;
```

### エラーハンドリング

**原則**:
- 予期されるエラー: 日本語の親切なメッセージを返す
- 入力検証は関数の先頭で行う

**例**:
```typescript
function validateInput(input: unknown): FactorizeInput | { error: string } {
  const num = (input as any)?.number;

  // 型チェック
  if (typeof num !== 'number' || !Number.isInteger(num)) {
    return { error: '正の整数を入力してください' };
  }

  // 正の整数チェック
  if (num < 1) {
    return { error: '正の整数を入力してください' };
  }

  // 上限チェック
  if (num > MAX_INPUT_VALUE) {
    return { error: '入力値が上限（15桁）を超えています' };
  }

  return { number: num };
}
```

## Git運用ルール

### ブランチ戦略

本プロジェクトはサンプルアプリケーションのため、シンプルな戦略を採用:

**ブランチ種別**:
- `main`: 安定版コード（デプロイ可能な状態）
- `feature/[機能名]`: 新機能開発
- `fix/[修正内容]`: バグ修正

**フロー**:
```
main
├── feature/add-tool
└── fix/validation-error
```

### コミットメッセージ規約

**フォーマット（Conventional Commits）**:
```
<type>: <subject>
```

**Type**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `refactor`: リファクタリング
- `chore`: ビルド、依存関係等

**例**:
```
feat: factorizeツールを実装
fix: 入力バリデーションのエラーメッセージを修正
docs: READMEにデプロイ手順を追加
chore: 依存パッケージを更新
```

## 開発環境セットアップ

### 必要なツール

| ツール | バージョン | インストール方法 |
|--------|-----------|-----------------|
| Node.js | v18以上 | https://nodejs.org/ または nvm |
| npm | 9.x以上 | Node.jsに付属 |
| Cloudflareアカウント | - | https://dash.cloudflare.com/sign-up |

### セットアップ手順

```bash
# 1. リポジトリのクローン
git clone <repository-url>
cd simple-mcp-server

# 2. 依存関係のインストール
npm install

# 3. ローカルサーバーの起動
npm run dev

# 4. Cloudflareへのデプロイ（オプション）
npm run deploy
```

### npm スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | ローカル開発サーバーを起動（Wrangler） |
| `npm run deploy` | Cloudflare Workersにデプロイ |

## テスト戦略

### 本プロジェクトのテスト方針

本プロジェクトは**サンプルアプリケーション**のため、自動テストは必須ではありません。

**推奨するテスト**:
1. **手動テスト**: ローカルでMCPクライアントから接続して動作確認
2. **デプロイ後テスト**: Cloudflare上で動作確認

### 将来的にテストを追加する場合

**フレームワーク**: Vitest（推奨）

**テスト例**:
```typescript
import { describe, it, expect } from 'vitest';
import { factorize } from './factorize';

describe('factorize', () => {
  it('12を素因数分解すると[2, 2, 3]', () => {
    expect(factorize(12)).toEqual([2, 2, 3]);
  });

  it('素数は自身のみ', () => {
    expect(factorize(7)).toEqual([7]);
  });

  it('1は[1]を返す', () => {
    expect(factorize(1)).toEqual([1]);
  });
});
```

## コードレビュー基準（参考）

本プロジェクトは個人開発を想定していますが、参考として記載:

### レビューポイント

**機能性**:
- [ ] 素因数分解が正しく動作するか
- [ ] 入力バリデーションが適切か
- [ ] エラーメッセージが親切か

**可読性**:
- [ ] 命名が明確か
- [ ] コードがシンプルか

**セキュリティ**:
- [ ] 入力値の検証が行われているか
- [ ] 計算量が制限されているか（DoS対策）

## 推奨開発ツール

### エディタ

**VS Code** + 以下の拡張機能:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

### ターミナル

- **Wrangler**: Cloudflare Workers CLI
  - `npx wrangler dev`: ローカル開発
  - `npx wrangler deploy`: デプロイ

### デバッグ

- `console.log()` によるログ出力
- Wrangler の `--local` モードでローカルデバッグ
