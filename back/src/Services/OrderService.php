<?php
require_once "../index.php";
require_once "../Services/OrderItemService.php";

class OrderService extends conn{
    private $user_code;
    private $order_items;
    private $item_service;
    public function __construct($user_code = 0, $order_items = []){
        parent::__construct();
        $this->item_service = new OrderItemService();
        $this->user_code = $user_code;
        $this->order_items = $order_items;
    }
    public function createOrder(){
        $code = 1;
        $ordersLength = $this->connection -> query("SELECT * FROM ORDERS");
        $ordersLength = $ordersLength -> fetchALL();
        $code += count($ordersLength);
        $insertOrder = $this->connection -> prepare("INSERT INTO ORDERS (total, tax, user_code) VALUES (0, 0, $this->user_code)");
        $insertOrder -> execute();
        foreach($this->order_items as $item){
            $createItem = $this->item_service -> createOrderItem($code, $item["code"], $item["amount"]);
            $this->updateOrderTaxAndTotal($code, $createItem);
        }
        echo "order created";
    }
    public function updateOrderTaxAndTotal($code, $order_item){
            $getOrder = $this->connection -> query("SELECT * FROM ORDERS WHERE CODE = $code");
            $getOrder = $getOrder -> fetch();
            $total = $getOrder["total"];
            $tax = $getOrder["tax"];
            $tax += ($order_item["price"] * $order_item["amount"] * ($order_item["tax"]/100));
            $total += $order_item["price"] * $order_item["amount"] + ($order_item["price"] * $order_item["amount"] * ($order_item["tax"]/100));
            $updateOrder = $this->connection -> prepare("UPDATE ORDERS SET TAX = {$tax}, TOTAL = {$total} WHERE CODE = {$code}");
            $updateOrder -> execute();
    }
    public function readOrders($code){
        $readOrders = $this->connection -> query("SELECT * FROM ORDERS WHERE USER_CODE = {$code}");
        $fetchOrders = $readOrders -> fetchALL();
        return $fetchOrders;
    }
    public function GetOrderById($code){
        $readOrder = $this->connection -> query("SELECT * FROM ORDERS WHERE CODE = {$code}");
        $fetchOrder = $readOrder -> fetch();
        
        $readOrderitem = $this->connection -> query("SELECT * FROM ORDER_ITEM WHERE ORDER_CODE = {$code}");
        $fetchItem = $readOrderitem -> fetchALL();
        return array(...$fetchOrder, "products"=> $fetchItem);
    }
}