use axum::{Router, routing::get, serve};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(root))
        .route("/foo", get(get_foo).post(post_foo))
        .route("/foo/bar", get(foo_bar));

    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    serve(listener, app).await.unwrap();
}

async fn root() -> &'static str {
    "Root"
}

async fn get_foo() -> &'static str {
    "Get Foo"
}

async fn post_foo() -> &'static str {
    "Post Foo"
}

async fn foo_bar() -> &'static str {
    "Get Foo Bar"
}
