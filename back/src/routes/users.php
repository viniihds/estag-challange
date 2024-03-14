<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once "../services/usersService.php";

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
        $password = $_POST["password"];
        $password = password_hash($password, PASSWORD_DEFAULT);

        $result = createUser($username, $password);
        echo $result;
    }
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $dataUsers = readUsers();
        echo json_encode($dataUsers);
    }