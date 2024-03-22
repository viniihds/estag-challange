<?php
require_once "../index.php";

class UserService extends conn{
    private $username;
    private $password;
    public function __construct($username = '', $password = ''){
        parent::__construct();
        $this->username = $username;
        $this->password = $password;
    }
    public function createUser(){
        $insertProduct = $this->connection -> prepare("INSERT INTO USERS(username, password) values ('{$this->username}', '{$this->password}')");
        $insertProduct->execute();
        return "user created";
    }
    public function readUsers(){
        $readUser = $this->connection -> query("SELECT * FROM USERS");
        $usersData = $readUser->fetchALL();
        return $usersData;
    }
    public function loginUser(){
        $fetchUser = $this->connection -> query("SELECT * FROM USERS WHERE username = '{$this->username}'");
        $user = $fetchUser->fetch();
        if ($user) {
            if (password_verify($this->password, $user["password"])) {
                return json_encode(array("code" => $user["code"], "username" => $user["username"]));
            }
        }
        return json_encode(array('error' => 'user not found'));
    }
}
