<?php
require_once "../index.php";
require_once "../services/orderItemsService.php";

function createOrder($order_items, $user_code){
    $code = 1;
    $ordersLength = myPDO -> query("SELECT * FROM ORDERS");
    $ordersLength = $ordersLength -> fetchALL();
    $code += count($ordersLength);
    $insertOrder = myPDO -> prepare("INSERT INTO ORDERS (total, tax, user_code) VALUES (0, 0, $user_code)");
    $insertOrder -> execute();
    foreach($order_items as $item){
        $createItem = createOrderItem($code, $item["code"], $item["amount"]);
        updateOrderTaxAndTotal($code, $createItem);
    }
    echo "order created";
}
function updateOrderTaxAndTotal($code, $order_item){
    $getOrder = myPDO -> query("SELECT * FROM ORDERS WHERE CODE = $code");
    $getOrder = $getOrder -> fetch();
    $total = $getOrder["total"];
    $tax = $getOrder["tax"];
    $tax += ($order_item["price"] * $order_item["amount"] * ($order_item["tax"]/100));
    $total += $order_item["price"] * $order_item["amount"] + ($order_item["price"] * $order_item["amount"] * ($order_item["tax"]/100));
    $updateOrder = myPDO -> prepare("UPDATE ORDERS SET TAX = {$tax}, TOTAL = {$total} WHERE CODE = {$code}");
    $updateOrder -> execute();
}
function readOrders($user_code){
    $readOrders = myPDO -> query("SELECT * FROM ORDERS WHERE USER_CODE = {$user_code}");
    $fetchOrders = $readOrders -> fetchALL();
    return $fetchOrders;
}
function GetOrderById($code){
    $readOrder = myPDO -> query("SELECT * FROM ORDERS WHERE CODE = {$code}");
    $fetchOrder = $readOrder -> fetch();
    
    $readOrderitem = myPDO -> query("SELECT * FROM ORDER_ITEM WHERE ORDER_CODE = {$code}");
    $fetchItem = $readOrderitem -> fetchALL();
    return array(...$fetchOrder, "products"=> $fetchItem);
}