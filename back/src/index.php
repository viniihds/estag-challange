<?php

class conn {
    public $connection;
    private $host = "pgsql_desafio";
    private $db = "applicationphp";
    private $user = "root";
    private $pw = "root";

    private function createConnection(){
        $this->connection = new PDO("pgsql:host=$this->host;dbname=$this->db", $this->user, $this->pw);
        $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
    public function __construct(){
        $this->createConnection();
    }
    
}
