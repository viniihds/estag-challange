<?php
require_once "../index.php";

class CategoryService extends conn {
    private $name;
    private $tax;
    
    public function __construct($name = '', $tax = 0){
        parent::__construct();
        $this->name = $name;
        $this->tax = $tax;
    }
    public function createCategory(){
        $insertCategory = $this->connection -> prepare("INSERT INTO CATEGORIES (name, tax) VALUES ('{$this->name}', {$this->tax})");
        $insertCategory -> execute();
        return "category created";
    } 
    
    public function readCategories(){
        $readCategory = $this->connection -> query("SELECT * FROM CATEGORIES");
        $categoriesData = $readCategory -> fetchAll();
        return $categoriesData;
    }
    public function deleteCategory($code){
        $delete = $this->connection -> prepare("DELETE FROM CATEGORIES WHERE CODE = {$code}");
        $delete -> execute();
        return "category deleted";
    }

}
