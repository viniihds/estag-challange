<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once "../Services/UserService.php";

class UserRoute{
    private $service;
    public function __construct(){
        if(!empty($_POST)){
            $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
            $password = $_POST["password"];
            $password = password_hash($password, PASSWORD_DEFAULT);
            $this->service = new UserService($username, $password);
            return;
        }
        $this->service = new UserService();
    }
    public function runServerMethod(){
        if($_SERVER["REQUEST_METHOD"] === "POST"){
            $result = $this->service -> createUser();
            echo $result;
        }
        if($_SERVER["REQUEST_METHOD"] === "GET"){
            $dataUsers = $this->service -> readUsers();
            echo json_encode($dataUsers);
        }
    }
}

$users = new UserRoute();
$users->runServerMethod();