<?php
require("connection.php");

class Usuario
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionTwitter::getInstance();
    }
    
    public function getCantidad(){  
        $query = "SELECT COUNT(usuarioID) AS cantidad FROM usuarios";
        $cantidad = $this->connection->query($query);
        return $cantidad->fetch_assoc();
    }

     public function getUser($id){  
        $query = "SELECT * FROM usuarios WHERE usuarioID = '".$id."'";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

    public function validateUser($id,$password){
        /*$userName = $this->connection->real_escape_string($user['userName']);
        $password = $this->connection->real_escape_string($user['password']);  */    
        $query = "SELECT * FROM usuarios WHERE mail = '".$id."' AND password = '". $password . "'
                    OR telefono = '".$id."' AND password = '". $password ."'
                    OR userName = '".$id."' AND password = '". $password ."'";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

    public function validateMail($mail){
        $query = "SELECT * FROM usuarios WHERE mail = '".$mail."'";                 
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

     public function validateUserName($userName){
        $query = "SELECT * FROM usuarios WHERE userName = '".$userName."'";                 
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

    public function createUser($user){
        $nombreCompleto = $this->connection->real_escape_string($user['nombreCompleto']);
        $mail = $this->connection->real_escape_string($user['mail']);
        $password = $this->connection->real_escape_string($user['password']);
        $telefono = $this->connection->real_escape_string($user['telefono']);
        $userName = $this->connection->real_escape_string($user['userName']);
       
        $query = "INSERT INTO usuarios VALUES (
                    DEFAULT,
                    '$nombreCompleto',
                    '$mail',
                    '$password',
                    '$telefono',
                    '$userName',
                    '')";

        if($this->connection->query($query)){
            $user['usuarioID'] = $this->connection->insert_id;
            return $user;
        }else{
            return false;
        }
    }

    public function updateUser($user){
        $usuarioID = $this->connection->real_escape_string($user['usuarioID']);
        $nombreCompleto = $this->connection->real_escape_string($user['nombreCompleto']);
        $mail = $this->connection->real_escape_string($user['mail']);
        $password = $this->connection->real_escape_string($user['password']);
        $telefono = $this->connection->real_escape_string($user['telefono']);
        $userName = $this->connection->real_escape_string($user['userName']);
       
        $query = "UPDATE usuarios SET 
                    nombreCompleto = '$nombreCompleto',
                    mail = '$mail',
                    password = '$password',
                    telefono = '$telefono'
                    WHERE usuarioID = '$usuarioID'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

}