<?php
require_once "../index.php";

function createUser($username, $password)
{
    $insertProduct = myPDO->prepare("INSERT INTO USERS(username, password) values ('{$username}', '{$password}')");
    $insertProduct->execute();

    return "user created";
}

function readUsers()
{
    $readUser = myPDO->query("SELECT * FROM USERS");
    $usersData = $readUser->fetchALL();
    return $usersData;
}
function loginUser($username, $password)
{

        $fetchUser = myPDO->query("SELECT * FROM USERS WHERE username = '{$username}'");
        $user = $fetchUser->fetch();
        if ($user) {
            if (password_verify($password, $user["password"])) {
                return json_encode(array("code" => $user["code"], "username" => $user["username"]));
            }
        }
        return json_encode(array('error' => 'user not found'));
}
