<?php
require("connection.php");

class Usuario
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
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
        $query = "SELECT U.idUsuario, U.nombre, U.apellido, U.tipoUsuario, E.perfil FROM usuario U LEFT JOIN empleado E ON U.idUsuario = E.idUsuario WHERE  U.usuario = '".$id."' AND U.contraseña = '". $password . "'";  
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
       
         $perfil =  $this->connection->real_escape_string($user['perfil']);
        $email =  $this->connection->real_escape_string($user['email']);
        $nombre =  $this->connection->real_escape_string($user['nombre']);
        $apellido =  $this->connection->real_escape_string($user['apellido']);
        $fechaNacimiento =  $this->connection->real_escape_string($user['fechaNacimiento']);
        $usuario =  $this->connection->real_escape_string($user['usuario']);
        $password =  $this->connection->real_escape_string($user['password']);
        $telefono =  $this->connection->real_escape_string($user['telefono']);
        $genero = $this->connection->real_escape_string($user['genero']);
         $dni = $this->connection->real_escape_string($user['dni']);

            
        $query = " INSERT INTO `utncine`.`usuario` 
            (`idUsuario`, `nombre`, `apellido`, `dni`, `sexo`, `fechaNacimiento`, `email`, `usuario`, `contraseña`, `telefono`, `estado`, `tipoUsuario`)              VALUES (NULL, '$nombre', '$apellido', '$dni', '$genero', '$fechaNacimiento', '$email', '$usuario', '$password', '$telefono', 'online', '$perfil')";
        
        print $query;
        exit();

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