<?php
require("connection.php");

class Funciones
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 
    
}