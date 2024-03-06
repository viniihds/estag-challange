<?php
require_once "../index.php";

function createProduct($name, $amount, $price, $category){
    $insertProduct = myPDO -> prepare("INSERT INTO PRODUCTS(name, amount, price, category_code) values ('{$name}', {$amount}, {$price}, {$category}) ");
    $insertProduct -> execute();

    return "product created";
}

function deleteProducts($code){
    $deleteProduct = myPDO -> prepare("DELETE FROM PRODUCTS WHERE CODE = {$code}");
    $deleteProduct -> execute();
    return "product deleted";
}

function readProducts(){
    $fetchProducts = myPDO -> query("SELECT products.*, categories.name as name_category, categories.tax as tax_category
    FROM products INNER JOIN categories ON products.category_code = categories.code;");
    $productsData = $fetchProducts -> fetchAll();
    return $productsData;
}

function getProductById($code){
    $getProduct = myPDO -> query("SELECT products.*, categories.tax as tax
    FROM products INNER JOIN categories ON products.category_code = categories.code WHERE products.CODE = {$code}");
    $productData = $getProduct -> fetch();
    return $productData;
}
function updateAmount($amount, $code){
    $product = getProductById($code);
    $newAmount = $product["amount"] - $amount;
    $updateProduct = myPDO -> prepare("UPDATE PRODUCTS SET AMOUNT = {$newAmount} WHERE CODE = {$code}");
    $updateProduct -> execute();
}