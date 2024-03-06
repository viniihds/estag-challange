<?php
require_once "../index.php";

function createCategory($name, $tax){
    $insertCategory = myPDO -> prepare("INSERT INTO CATEGORIES (name, tax) VALUES ('{$name}', {$tax})");
    $insertCategory -> execute();
    return "category created";
}

function readCategories(){
    $readCategory = myPDO -> query("SELECT * FROM CATEGORIES");
    $categoriesData = $readCategory -> fetchAll();
    return $categoriesData;
}
function deleteCategory($code){
    $delete = myPDO -> prepare("DELETE FROM CATEGORIES WHERE CODE = {$code}");
    $delete -> execute();
    return "category deleted";
}