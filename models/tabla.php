<?php
require("connection.php");

class Tabla
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 
	
    public function getUsuarios(){
        $query = "SELECT idUsuario id , nombre, apellido, dni, sexo, fechaNacimiento , email, usuario, contraseña as pass, telefono,bloqueado 
FROM usuario
where tipousuario=1";  
       
        $usuarios = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $usuarios[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $usuarios;
    
    }
 
    public function setState($state){
        
        $id = $this->connection->real_escape_string($state['id']);
        $state = $this->connection->real_escape_string($state['state']);
       
        $query = "update usuario set bloqueado=$state where idUsuario=$id";  
       
       // echo $query;
    //    return false;
        
        $usuarios = array();
        
        try{
            if( $this->connection->query($query) ){
                return true;   
            }
            else{
                return false;
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $usuarios;
    
    }
    
   
    
    
}