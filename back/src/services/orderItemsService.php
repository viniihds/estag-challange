<?php
require_once "../index.php";
require_once "../services/productsService.php";

function createOrderItem($order_code, $product_code, $amount){
    $product = getProductById($product_code);
    $insertItem = myPDO -> prepare("INSERT INTO ORDER_ITEM (order_code, product_code, name, amount, price, tax) VALUES(
        {$order_code}, {$product["code"]}, '{$product["name"]}',  {$amount}, {$product["price"]}, {$product["tax"]}
    )");
    $insertItem -> execute();
    updateAmount($amount, $product_code);
    return array("tax"=> $product["tax"], "price" => $product["price"], "amount" => $amount);
}
