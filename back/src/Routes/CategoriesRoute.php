<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");

require_once "../Services/CategoryService.php";

class CategoriesRoute {
    private $service;
    public function __construct(){
        if(!empty($_POST)){
            $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
            $tax = filter_input(INPUT_POST, "tax", FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $this->service = new CategoryService($name, $tax);
            return;
        }
        $this->service = new CategoryService();
    }
    public function runServerMethod(){
        if($_SERVER["REQUEST_METHOD"] === "POST"){
        
            $create = $this->service -> createCategory();
            echo $create;
        }
        if($_SERVER["REQUEST_METHOD"] === "GET"){
            $data_categories = $this->service -> readCategories();
            echo json_encode($data_categories);
        }
        if($_SERVER["REQUEST_METHOD"] === "DELETE"){
            $toDelete = $_GET["code"];
            $deleteCategory = $this->service -> deleteCategory($toDelete);
            echo "category deleted";
        }
    }

}

$categories = new CategoriesRoute();
$categories->runServerMethod();