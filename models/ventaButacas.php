<?php
require("connection.php");

class VentaButacas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    }  
    
     public function getFuncionSala($idFuncion){
        $id = (int) $this->connection->real_escape_string($idFuncion);
        $query = "SELECT * FROM sala_funcion WHERE idFuncion= $id  order by fila,columna";                    
       
        $sala = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $sala[] = $fila;
            }
            $result->free();
        }
        return $sala;
    } 
    

}

