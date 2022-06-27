use warp;

mod db;
mod handlers;
mod models;
mod routes;

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let db = db::init_db();
    let customer_routes = routes::customer_routes(db);

    println!("Warp Server is running!");
    warp::serve(customer_routes)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
