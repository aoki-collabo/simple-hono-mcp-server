# プロジェクト用語集 (Glossary)

## 概要

このドキュメントは、simple-mcp-serverプロジェクトで使用される用語の定義を管理します。

**更新日**: 2025-01-17

## ドメイン用語

プロジェクト固有のビジネス概念や機能に関する用語。

### 素因数分解 (Factorization)

**定義**: 正の整数を素数の積として表すこと。

**説明**: 本プロジェクトのMCPツール「factorize」のコア機能。入力された正の整数を素因数に分解し、結果をリスト形式で返す。

**使用例**:
- 12 → [2, 2, 3]（2 × 2 × 3 = 12）
- 7 → [7]（素数なので自身のみ）
- 1 → [1]（特殊ケース）

**関連用語**: [素数](#素数-prime-number)

**英語表記**: Prime Factorization

### 素数 (Prime Number)

**定義**: 1と自分自身以外に正の約数を持たない、1より大きい自然数。

**説明**: 素因数分解の結果として返される数値は全て素数（1を除く）。

**使用例**:
- 2, 3, 5, 7, 11, 13, ... は素数
- 4, 6, 8, 9, 10, 12, ... は合成数（素数ではない）

**関連用語**: [素因数分解](#素因数分解-factorization)

## 技術用語

プロジェクトで使用している技術・フレームワーク・ツールに関する用語。

### MCP (Model Context Protocol)

**正式名称**: Model Context Protocol

**定義**: AIモデルとツールの間でコンテキストを共有するためのプロトコル。

**公式サイト**: https://modelcontextprotocol.io/

**本プロジェクトでの用途**: MCPサーバーとして、factorizeツールをMCPクライアント（Claude Desktop等）に公開。

**関連用語**: [MCPサーバー](#mcpサーバー-mcp-server)、[MCPクライアント](#mcpクライアント-mcp-client)、[MCPツール](#mcpツール-mcp-tool)

### MCPサーバー (MCP Server)

**定義**: MCPプロトコルに準拠し、ツールやリソースを提供するサーバー。

**本プロジェクトでの用途**: Cloudflare Workers上で動作し、factorizeツールを提供。

**関連用語**: [MCP](#mcp-model-context-protocol)、[Streamable HTTP](#streamable-http)

### MCPクライアント (MCP Client)

**定義**: MCPプロトコルを使用してMCPサーバーに接続し、ツールを呼び出すクライアントアプリケーション。

**使用例**:
- Claude Desktop
- Claude Code
- その他のMCP対応クライアント

**関連用語**: [MCP](#mcp-model-context-protocol)、[MCPサーバー](#mcpサーバー-mcp-server)

### MCPツール (MCP Tool)

**定義**: MCPサーバーが提供する、MCPクライアントから呼び出し可能な機能。

**本プロジェクトでの用途**: `factorize`ツールとして素因数分解機能を提供。

**構成要素**:
- `name`: ツール名（例: "factorize"）
- `description`: ツールの説明
- `inputSchema`: 入力パラメータのJSONスキーマ

**関連用語**: [MCP](#mcp-model-context-protocol)

### Streamable HTTP

**定義**: MCPで使用されるHTTPベースのトランスポートプロトコル。

**説明**: 通常のHTTP POSTリクエストと、Server-Sent Events（SSE）によるストリーミングレスポンスを組み合わせた通信方式。

**本プロジェクトでの用途**: MCPサーバーのエンドポイント `/mcp` で使用。

**関連用語**: [MCP](#mcp-model-context-protocol)、[SSE](#sse-server-sent-events)

### Hono

**定義**: 軽量で高速なWebフレームワーク。

**公式サイト**: https://hono.dev/

**本プロジェクトでの用途**: Cloudflare Workers上でHTTPリクエストを処理するWebフレームワークとして使用。

**選定理由**:
- Cloudflare Workersに最適化
- 軽量でバンドルサイズが小さい
- MCPサポート（@hono/mcp）

**バージョン**: 最新

**関連用語**: [Cloudflare Workers](#cloudflare-workers)

### Cloudflare Workers

**定義**: Cloudflareが提供するサーバーレスコンピューティングプラットフォーム。

**公式サイト**: https://workers.cloudflare.com/

**本プロジェクトでの用途**: MCPサーバーのホスティング環境。

**特徴**:
- エッジコンピューティング（世界中のデータセンターで実行）
- 無料枠あり
- 簡単なデプロイ

**制約**:
- CPU時間: 10ms/リクエスト（Free plan）
- メモリ: 128MB
- スクリプトサイズ: 1MB

**関連用語**: [Wrangler](#wrangler)

### Wrangler

**定義**: Cloudflare Workers用のCLIツール。

**公式サイト**: https://developers.cloudflare.com/workers/wrangler/

**本プロジェクトでの用途**:
- ローカル開発サーバーの起動（`wrangler dev`）
- Cloudflareへのデプロイ（`wrangler deploy`）

**バージョン**: 最新

**関連用語**: [Cloudflare Workers](#cloudflare-workers)

### TypeScript

**定義**: JavaScriptに静的型付けを追加したプログラミング言語。

**公式サイト**: https://www.typescriptlang.org/

**本プロジェクトでの用途**: 全てのソースコードをTypeScriptで記述。

**バージョン**: 5.x

**選定理由**:
- 型安全性によるバグ防止
- エディタの補完機能
- MCPライブラリの型定義サポート

**設定ファイル**: `tsconfig.json`

## 略語・頭字語

### MCP

**正式名称**: Model Context Protocol

**意味**: AIモデルとツールの間でコンテキストを共有するためのプロトコル

**本プロジェクトでの使用**: プロジェクト全体のコア技術

**参照**: [MCP (Model Context Protocol)](#mcp-model-context-protocol)

### SSE (Server-Sent Events)

**正式名称**: Server-Sent Events

**意味**: サーバーからクライアントへの一方向のリアルタイム通信を実現するWeb技術

**本プロジェクトでの使用**: Streamable HTTPトランスポートの一部として、MCPレスポンスのストリーミングに使用

### HTTP

**正式名称**: HyperText Transfer Protocol

**意味**: Webで使用される通信プロトコル

**本プロジェクトでの使用**: MCPサーバーのエンドポイント通信

### CLI

**正式名称**: Command Line Interface

**意味**: コマンドラインから操作するインターフェース

**本プロジェクトでの使用**: Wranglerを使用したローカル開発・デプロイ

### DoS

**正式名称**: Denial of Service

**意味**: サービス妨害攻撃

**本プロジェクトでの対策**: 入力値を15桁以下に制限し、計算量を抑制

## アーキテクチャ用語

### ステートレス (Stateless)

**定義**: サーバーがリクエスト間で状態を保持しない設計パターン

**本プロジェクトでの適用**: MCPサーバーはリクエストごとに独立して処理を行い、データを永続化しない

**メリット**:
- スケーラビリティ（Cloudflare Workersの自動スケーリングを活かせる）
- シンプルな実装
- 障害耐性

**関連用語**: [Cloudflare Workers](#cloudflare-workers)

### エッジコンピューティング (Edge Computing)

**定義**: ユーザーに近い場所（エッジ）でコンピューティングを行うアーキテクチャ

**本プロジェクトでの適用**: Cloudflare Workersにより、世界中のエッジロケーションでMCPサーバーが実行される

**メリット**:
- 低レイテンシ
- グローバルな可用性

## データモデル用語

### FactorizeInput

**定義**: factorizeツールの入力データ構造

**フィールド**:
- `number`: number - 素因数分解する正の整数（1以上、15桁以下）

**制約**:
- 正の整数のみ
- 最大値: 999,999,999,999,999

### FactorizeOutput

**定義**: factorizeツールの出力データ構造

**フィールド**:
- `factors`: number[] - 素因数のリスト
- `divisionCount`: number - 割り算回数

**例**:
```json
{
  "factors": [2, 2, 3],
  "divisionCount": 3
}
```

## エラー・例外

### INVALID_INPUT

**エラーメッセージ**: 「正の整数を入力してください」

**発生条件**:
- 入力が数値でない
- 入力が整数でない
- 入力が0以下

**対処方法**: 1以上の正の整数を入力する

### EXCEEDS_LIMIT

**エラーメッセージ**: 「入力値が上限（15桁）を超えています」

**発生条件**:
- 入力が9,999,999,999を超える

**対処方法**: 15桁以下の数値を入力する

## 計算・アルゴリズム

### 試行割り算法 (Trial Division)

**定義**: 素因数分解の基本的なアルゴリズム。小さい数から順に割り切れるか試す。

**計算手順**:
1. 2で割り切れる間、2を素因数リストに追加
2. 3から√nまでの奇数で同様に試行
3. 残りが1より大きければ、それは素数

**計算量**: O(√n)

**実装箇所**: `src/index.ts`

**例**:
```
入力: 12
処理:
  12 ÷ 2 = 6 → factors = [2]
  6 ÷ 2 = 3 → factors = [2, 2]
  3 ÷ 3 = 1 → factors = [2, 2, 3]
出力: [2, 2, 3]
```

## 索引

### あ行
- [エッジコンピューティング](#エッジコンピューティング-edge-computing) - アーキテクチャ用語

### さ行
- [試行割り算法](#試行割り算法-trial-division) - 計算・アルゴリズム
- [ステートレス](#ステートレス-stateless) - アーキテクチャ用語
- [素因数分解](#素因数分解-factorization) - ドメイン用語
- [素数](#素数-prime-number) - ドメイン用語

### A-Z
- [CLI](#cli) - 略語
- [Cloudflare Workers](#cloudflare-workers) - 技術用語
- [DoS](#dos) - 略語
- [EXCEEDS_LIMIT](#exceeds_limit) - エラー
- [FactorizeInput](#factorizeinput) - データモデル用語
- [FactorizeOutput](#factorizeoutput) - データモデル用語
- [Hono](#hono) - 技術用語
- [HTTP](#http) - 略語
- [INVALID_INPUT](#invalid_input) - エラー
- [MCP](#mcp-model-context-protocol) - 技術用語
- [MCPクライアント](#mcpクライアント-mcp-client) - 技術用語
- [MCPサーバー](#mcpサーバー-mcp-server) - 技術用語
- [MCPツール](#mcpツール-mcp-tool) - 技術用語
- [SSE](#sse-server-sent-events) - 略語
- [Streamable HTTP](#streamable-http) - 技術用語
- [TypeScript](#typescript) - 技術用語
- [Wrangler](#wrangler) - 技術用語
