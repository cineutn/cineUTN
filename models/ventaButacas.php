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
    
     public function getButaca($idSalaFuncion){
        $id = (int) $this->connection->real_escape_string($idSalaFuncion);
        $query = "SELECT CONCAT(fila, '-', `columna`) AS butaca
                  FROM sala_funcion WHERE idSalaFuncion = $id ";                    
       
        $butaca = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $butaca[] = $fila;
            }
            $result->free();
        }
        return $butaca;
    }
    
    
    public function updateButaca($salaFuncionID,$habilitada){
        $id = (int) $this->connection->real_escape_string($salaFuncionID);
        $estado = (int) $this->connection->real_escape_string($habilitada);
        $query ="UPDATE sala_funcion SET habilitada=$estado WHERE idSalaFuncion=$id";
    
    if($this->connection->query($query)){
        return true;
    }else{
        return false;
    }
    }
}

