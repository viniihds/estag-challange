<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once '../services/ordersService.php';

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $data = json_decode(file_get_contents('php://input'), true);
    createOrder($data);
}
if($_SERVER["REQUEST_METHOD"] === "GET"){
    if($_SERVER["QUERY_STRING"]){
        $toGet = $_GET["code"];
        $data_orders = GetOrderById($toGet);
    }else{
        $data_orders = readOrders();
    }
        echo json_encode($data_orders);

}