<?php
require_once "../index.php";

class ProductService extends conn{
    private $name;
    private $amount;
    private $price;
    private $category;

    public function __construct($name = '', $amount = 0, $price = 0, $category = 0){
        parent::__construct();
        $this->name = $name;
        $this->amount = $amount;
        $this->price = $price;
        $this->category = $category;
    }
    public function createProduct(){
        $insertProduct = $this->connection -> prepare("INSERT INTO PRODUCTS(name, amount, price, category_code) values ('{$this->name}', {$this->amount}, {$this->price}, {$this->category}) ");
        $insertProduct -> execute();
        return "product created";
    }
    public function deleteProducts($code){
        $deleteProduct = $this->connection -> prepare("DELETE FROM PRODUCTS WHERE CODE = {$code}");
        $deleteProduct -> execute();
        return "product deleted";
    }
    public function readProducts(){
        $fetchProducts = $this->connection -> query("SELECT products.*, categories.name as name_category, categories.tax as tax_category
        FROM products INNER JOIN categories ON products.category_code = categories.code;");
        $productsData = $fetchProducts -> fetchAll();
        return $productsData;
    }
    public function getProductById($code){
        $getProduct = $this->connection -> query("SELECT products.*, categories.tax as tax
        FROM products INNER JOIN categories ON products.category_code = categories.code WHERE products.CODE = {$code}");
        $productData = $getProduct -> fetch();
        return $productData;
    }
    public function updateAmount($amount, $code){
        $product = $this->getProductById($code);
        $newAmount = $product["amount"] - $amount;
        $updateProduct = $this->connection -> prepare("UPDATE PRODUCTS SET AMOUNT = {$newAmount} WHERE CODE = {$code}");
        $updateProduct -> execute();
    }
}
