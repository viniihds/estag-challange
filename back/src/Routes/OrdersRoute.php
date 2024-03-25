<?php
namespace App\Routes;
use App\Services\OrderService;
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");


class OrdersRoute {
    private $service;
    public function __construct(){
        if(isset($_POST)){
            $data = json_decode(file_get_contents('php://input'), true);
            ['products' => $order_items, 'user_code'=> $user_code] = $data; 
            $this->service = new OrderService($user_code, $order_items);
            return;
        }
        $this->service = new OrderService();
    }
    public function runServerMethod(){
        if($_SERVER["REQUEST_METHOD"] === "POST"){
            $this->service -> createOrder();
        }
        if($_SERVER["REQUEST_METHOD"] === "GET"){
            if($_SERVER["QUERY_STRING"]){
                $query_string = explode("=", $_SERVER["QUERY_STRING"]);
                if($query_string[0] == "user_code"){
                    $data_orders = $this->service -> readOrders($query_string[1]);
                    echo json_encode($data_orders);
                }
                if($query_string[0] == "code"){
                    $data_orders = $this->service -> GetOrderById($query_string[1]);
                    echo json_encode($data_orders);
                }
            }
        }
    }
}