<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once '../services/ordersService.php';

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $data = json_decode(file_get_contents('php://input'), true);
    ['products' => $order_items, 'user_code'=> $user_code] = $data; 
    createOrder($order_items, $user_code);
}
if($_SERVER["REQUEST_METHOD"] === "GET"){
    if($_SERVER["QUERY_STRING"]){
        $query_string = explode("=", $_SERVER["QUERY_STRING"]);
        if($query_string[0] == "user_code"){
            $data_orders = readOrders($query_string[1]);
            echo json_encode($data_orders);
        }
        if($query_string[0] == "code"){
            $data_orders = GetOrderById($query_string[1]);
            echo json_encode($data_orders);
        }
    }
}
