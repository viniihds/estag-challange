<?php
    namespace App\Router;
    use App\Routes\CategoriesRoute;
    use App\Routes\ProductsRoute;
    use App\Routes\OrdersRoute;
    use App\Routes\UserRoute;
    use App\Routes\LoginRoute;

class Router {

    public static $endPoints = array("endpoints"=>array(
        "http://localhost/Routes/CategoriesRoute.php",
        "http://localhost/Routes/ProductsRoute.php",
        "http://localhost/Routes/OrdersRoute.php",
        "http://localhost/Routes/OrdersRoute.php?code=1",
        "http://localhost/Routes/LoginRoute.php",
        "http://localhost/Routes/UserRoute.php",
    ));

    public static function Push(string $URI){
        if($URI == '/'){
            echo json_encode(self::$endPoints);
        } else if(str_contains($URI, '/Routes/CategoriesRoute.php')){
            $categories = new CategoriesRoute;
            $categories->runServerMethod();
        } else if(str_contains($URI, '/Routes/OrdersRoute.php')){
            $orders = new OrdersRoute;
            $orders->runServerMethod();
        } else if(str_contains($URI, '/Routes/ProductsRoute.php')){
            $products = new ProductsRoute;
            $products->runServerMethod();
        } else if(str_contains($URI, "/Routes/LoginRoute.php")){
            $login = new LoginRoute;
            $login->runServerMethod();
        } else if(str_contains($URI, "/Routes/UserRoute.php")){
            $users = new UserRoute;
            $users->runServerMethod();
        } else{
            echo 404;
        }
    }

}