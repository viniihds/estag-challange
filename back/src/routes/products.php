<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once "../services/productsService.php";


    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
        $amount = filter_input(INPUT_POST, "amount", FILTER_SANITIZE_NUMBER_INT);
        $price = filter_input(INPUT_POST, "price", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $category = filter_input(INPUT_POST, "category", FILTER_SANITIZE_NUMBER_INT);
        
        $result = createProduct($name, $amount, $price, $category);
        echo $result;
    }

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $dataProducts = readProducts();
        echo json_encode($dataProducts);
    }


    if($_SERVER["REQUEST_METHOD"] === "DELETE"){
        $toDelete = $_GET["code"];
        $deleteProduct = deleteProducts($toDelete);
    }