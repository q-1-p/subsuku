# API Docker Setup

## 実行方法

### 本番用（最適化ビルド）

```bash
# イメージをビルド
docker build -t api ./internal

# コンテナを実行
docker run -p 8000:8000 api
```

### 開発用（ホットリロード対応）

```bash
# 開発用イメージをビルド
docker build -f ./internal/Dockerfile.dev -t api-dev ./internal

# ホットリロード付きで実行（ソースコードをマウント）
docker run -p 8000:8000 -v $(pwd)/internal:/app api-dev

# バックグラウンドで実行
docker run -d -p 8000:8000 -v $(pwd)/internal:/app --name api-dev-container api-dev

# コンテナを停止・削除
docker stop api-dev-container && docker rm api-dev-container
```

## エンドポイント

APIは `http://localhost:8000` で利用可能です。

- `GET /` - Root endpoint
- `GET /foo` - Get Foo
- `POST /foo` - Post Foo  
- `GET /foo/bar` - Get Foo Bar

## 開発

### ローカル開発（Dockerなし）

```bash
cd internal
cargo run --bin api
```

### ホットリロードの仕組み

開発用Dockerコンテナでは：
- `cargo-watch` を使用してファイル変更を監視
- ソースコードをボリュームマウントして変更を即座に反映
- ファイル保存時に自動的にアプリケーションが再起動