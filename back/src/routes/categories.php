<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once "../services/categoriesService.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
    $tax = filter_input(INPUT_POST, "tax", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

    $create = createCategory($name, $tax);
    echo $create;
}

if($_SERVER["REQUEST_METHOD"] === "GET"){
    $data_categories = readCategories();
    echo json_encode($data_categories);
}

if($_SERVER["REQUEST_METHOD"] === "DELETE"){
    $toDelete = $_GET["code"];
    $deleteCategory = deleteCategory($toDelete);
    echo "category deleted";
}