<?php
require_once "../index.php";
require_once "../Services/ProductService.php";

class OrderItemService extends conn{
    private $productservice;
    public function __construct(){
        $this->productservice = new ProductService();
        parent::__construct();
    }
    public function createOrderItem($order_code, $product_code, $amount){
        $product = $this->productservice -> getProductById($product_code);
        $insertItem = $this->connection -> prepare("INSERT INTO ORDER_ITEM (order_code, product_code, name, amount, price, tax) VALUES(
            {$order_code}, {$product["code"]}, '{$product["name"]}',  {$amount}, {$product["price"]}, {$product["tax"]}
        )");
        $insertItem -> execute();
        $this->productservice -> updateAmount($amount, $product_code);
        return array("tax"=> $product["tax"], "price" => $product["price"], "amount" => $amount);
    }
}