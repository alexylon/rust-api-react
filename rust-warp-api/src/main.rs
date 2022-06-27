use warp;

mod db;
mod handlers;
mod models;
mod routes;

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let db = db::init_db();
    let customer_routes = routes::customer_routes(db);

    warp::serve(customer_routes)
        .run(([127, 0, 0, 1], 8000))
        .await;
}
