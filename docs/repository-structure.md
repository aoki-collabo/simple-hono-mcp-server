# リポジトリ構造定義書 (Repository Structure Document)

## プロジェクト構造

```
simple-mcp-server/
├── src/                      # ソースコード
│   └── index.ts              # エントリーポイント（MCPサーバー実装）
├── tests/                    # テストコード
│   └── factorize.test.ts     # 素因数分解のユニットテスト
├── docs/                     # プロジェクトドキュメント
│   ├── ideas/                # アイデア・初期要件
│   ├── product-requirements.md
│   ├── functional-design.md
│   ├── architecture.md
│   ├── repository-structure.md
│   ├── development-guidelines.md
│   └── glossary.md
├── .claude/                  # Claude Code設定
│   ├── commands/             # スラッシュコマンド
│   └── skills/               # タスクモード別スキル
├── .steering/                # ステアリングファイル（作業単位のドキュメント）
├── package.json              # プロジェクト設定
├── tsconfig.json             # TypeScript設定
├── wrangler.toml             # Cloudflare Workers設定
├── README.md                 # プロジェクト概要・セットアップ手順
├── CLAUDE.md                 # Claude Codeプロジェクト設定
└── .gitignore                # Git除外設定
```

## ディレクトリ詳細

### src/ (ソースコードディレクトリ)

**役割**: アプリケーションのソースコードを配置

**配置ファイル**:
- `index.ts`: MCPサーバーのエントリーポイント

**命名規則**:
- ファイル名: camelCase または kebab-case
- エントリーポイント: `index.ts`

**構造**:
```
src/
└── index.ts          # Hono + MCP Server + factorizeツール
```

**設計方針**:
- 本プロジェクトは**学習用サンプル**のため、単一ファイル構成
- 複雑なレイヤー分離は行わない
- すべてのコードを`index.ts`に集約し、可読性を優先

### docs/ (ドキュメントディレクトリ)

**役割**: プロジェクトのドキュメントを配置

**配置ドキュメント**:
- `ideas/`: 初期アイデア・壁打ちメモ
- `product-requirements.md`: プロダクト要求定義書
- `functional-design.md`: 機能設計書
- `architecture.md`: アーキテクチャ設計書
- `repository-structure.md`: リポジトリ構造定義書（本ドキュメント）
- `development-guidelines.md`: 開発ガイドライン
- `glossary.md`: 用語集

### .claude/ (Claude Code設定ディレクトリ)

**役割**: Claude Codeのカスタマイズ設定

**構造**:
```
.claude/
├── commands/         # スラッシュコマンド定義
└── skills/           # タスクモード別スキル定義
```

**除外設定**: `.gitignore`に含めない（共有設定）

### .steering/ (ステアリングファイルディレクトリ)

**役割**: 特定の開発作業における「今回何をするか」を定義

**構造**:
```
.steering/
└── [YYYYMMDD]-[task-name]/
    ├── requirements.md      # 今回の作業の要求内容
    ├── design.md            # 変更内容の設計
    └── tasklist.md          # タスクリスト
```

**命名規則**: `20250115-add-new-tool` 形式

**除外設定**: 必要に応じて`.gitignore`に含める（作業途中のメモは除外推奨）

## ファイル配置規則

### ソースファイル

| ファイル種別 | 配置先 | 命名規則 | 例 |
|------------|--------|---------|-----|
| エントリーポイント | src/ | index.ts | src/index.ts |
| 型定義（将来的に分離する場合） | src/types/ | PascalCase.ts | src/types/Tool.ts |

### 設定ファイル

| ファイル種別 | 配置先 | 命名規則 |
|------------|--------|---------|
| TypeScript設定 | プロジェクトルート | tsconfig.json |
| Cloudflare設定 | プロジェクトルート | wrangler.toml |
| パッケージ設定 | プロジェクトルート | package.json |
| Git除外設定 | プロジェクトルート | .gitignore |

### テストファイル

| テスト種別 | 配置先 | 命名規則 | 例 |
|-----------|--------|---------|-----|
| ユニットテスト | tests/ | [対象].test.ts | tests/factorize.test.ts |

## 命名規則

### ディレクトリ名

- **レイヤーディレクトリ**: 複数形、kebab-case
  - 例: `src/`, `docs/`, `tests/`
- **設定ディレクトリ**: ドット接頭辞、kebab-case
  - 例: `.claude/`, `.steering/`

### ファイル名

- **TypeScriptファイル**: camelCase または kebab-case
  - 例: `index.ts`, `factorize.ts`
- **設定ファイル**: kebab-case または ツール指定の形式
  - 例: `package.json`, `tsconfig.json`, `wrangler.toml`
- **ドキュメント**: kebab-case
  - 例: `product-requirements.md`, `functional-design.md`

## 依存関係のルール

### 本プロジェクトの方針

本プロジェクトは単一ファイル構成のため、レイヤー間の依存関係ルールは適用されません。

将来的にファイルを分割する場合の指針：

```
src/
├── index.ts           # エントリーポイント（Hono設定）
├── tools/             # MCPツール実装
│   └── factorize.ts   # 素因数分解ツール
└── types/             # 型定義
    └── mcp.ts         # MCP関連の型
```

**依存方向**:
```
index.ts → tools/factorize.ts → types/mcp.ts
```

## スケーリング戦略

### 機能追加時の方針

本プロジェクトはサンプルのため、大規模な機能追加は想定していません。

**小規模な追加**（例: 新しいMCPツール）:
- `src/index.ts`に直接追加

**中規模な追加**（例: 複数のツールを追加）:
- `src/tools/`ディレクトリを作成し、ツールごとにファイル分割

```
src/
├── index.ts           # エントリーポイント
└── tools/
    ├── factorize.ts   # 素因数分解
    ├── fibonacci.ts   # フィボナッチ（例）
    └── index.ts       # ツールのエクスポート
```

### ファイルサイズの管理

**目安**:
- `src/index.ts`: 200行以下を推奨
- 300行を超える場合: ツールの分離を検討

## 除外設定

### .gitignore

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
.wrangler/

# Environment
.env
.env.local
.dev.vars

# OS
.DS_Store
Thumbs.db

# Editor
.idea/
.vscode/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Steering files (optional)
# .steering/
```

### 補足

- `node_modules/`: npm依存パッケージ（サイズが大きい）
- `dist/`: ビルド成果物
- `.wrangler/`: Wranglerのキャッシュ
- `.env`, `.dev.vars`: 環境変数（秘密情報を含む可能性）
- `.steering/`: 作業途中のメモ（チームで共有する場合は除外しない）

## 設定ファイル一覧

### package.json

```json
{
  "name": "simple-mcp-server",
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "types": ["@cloudflare/workers-types"]
  },
  "include": ["src/**/*"]
}
```

### wrangler.toml

```toml
name = "simple-mcp-server"
main = "src/index.ts"
compatibility_date = "2024-01-01"
```
