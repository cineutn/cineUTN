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

    public function getBloqueo($user){
        $usuarioID = $this->connection->real_escape_string($user['usuarioID']);
        $query = "SELECT bloqueado 
                    FROM usuario
                    WHERE idUsuario = '$usuarioID' ";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

    public function getUserByMail($mail){  
        $query = "SELECT * FROM usuario WHERE email = '".$mail."'";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

     public function validateEMail($user){
        $usuarioID = $this->connection->real_escape_string($user['usuarioID']);
        $email = $this->connection->real_escape_string($user['email']);
        $query = "SELECT * 
                    FROM usuario 
                    WHERE email = '$email' AND idUsuario = '$usuarioID'";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

    public function updateEmail($user){
        $usuarioID = $this->connection->real_escape_string($user['usuarioID']);
        $email = $this->connection->real_escape_string($user['email']);
        $query = "UPDATE usuario SET 
                    email = '$email'
                    WHERE idUsuario = '$usuarioID'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

    public function updateEstado($user){
        $usuarioID = $this->connection->real_escape_string($user['usuarioID']);
        $estado = $this->connection->real_escape_string($user['estado']);
        $query = "UPDATE usuario SET 
                    estado = '$estado'
                    WHERE idUsuario = '$usuarioID'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

    public function getUserByPassword($user){
        $usuarioID = $this->connection->real_escape_string($user['usuarioID']);
        $password = $this->connection->real_escape_string($user['password']);
        $query = "SELECT * 
                    FROM usuario 
                    WHERE contraseña = '$password' AND idUsuario = '$usuarioID'";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

    public function updatePassword($user){
        $usuarioID = $this->connection->real_escape_string($user['usuarioID']);
        $password = $this->connection->real_escape_string($user['password']);
        $query = "UPDATE usuario SET 
                    contraseña = '$password'
                    WHERE idUsuario = '$usuarioID'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }


    public function validateUser($id,$password){
        $query = "SELECT U.idUsuario, U.nombre, U.apellido, TU.detalle AS tipoUsuario, U.email,idComplejo 
                    FROM usuario U 
                    INNER JOIN tipousuario TU ON U.tipoUsuario = TU.id
                    WHERE  U.usuario = '".$id."' AND U.contraseña = '". $password . "'";  
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

    public function validateMail($mail){
        $query = "SELECT * FROM usuario WHERE email = '".$mail."'";                 
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }

     public function validateUserName($userName){
        $query = "SELECT * FROM usuario WHERE usuario = '".$userName."'";                 
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
        $complejo = $this->connection->real_escape_string($user['complejo']);

            
        $query = " INSERT INTO `usuario` 
            (`idUsuario`, `nombre`, `apellido`, `dni`, `sexo`, `fechaNacimiento`, `email`, `usuario`, `contraseña`, `telefono`, `estado`, `tipoUsuario`,`idComplejo`)              VALUES (NULL, '$nombre', '$apellido', '$dni', '$genero', '$fechaNacimiento', '$email', '$usuario', '$password', '$telefono', 'online', '$perfil', '$complejo')";
        
        if($this->connection->query($query)){
            $user['usuarioID'] = $this->connection->insert_id;
            return $user;
        }else{
            return false;
        }
    }
    public function editUser($user){
       
        $id =  $this->connection->real_escape_string($user['id']);
        $email =  $this->connection->real_escape_string($user['email']);
        $nombre =  $this->connection->real_escape_string($user['nombre']);
        $apellido =  $this->connection->real_escape_string($user['apellido']);
       
        $usuario =  $this->connection->real_escape_string($user['usuario']);
        $password =  $this->connection->real_escape_string($user['password']);
        $telefono =  $this->connection->real_escape_string($user['telefono']);
       
         $dni = $this->connection->real_escape_string($user['dni']);
        $complejo = $this->connection->real_escape_string($user['complejo']);

            
        $query = " UPDATE `usuario` set 
            `nombre`='$nombre', `apellido`='$apellido', `dni`='$dni', `contraseña`='$password', `telefono`='$telefono' where idUsuario=$id            
            ";
        
        
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