<?php
require("connection.php");

class VentaButacas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    }  
    
     public function getFuncionSala($idFuncionDetalle){
        $id = (int) $this->connection->real_escape_string($idFuncionDetalle);
        //$query = "SELECT * FROM sala_funcion WHERE idFuncionDetalle= $id  order by fila,columna";                    
        $query = "SELECT idSalaFuncion,idFuncion,columna,fila,(case when habilitada=2 and DATE_ADD(FechaPreCompra, INTERVAL 12 MINUTE)<now() then 3 else                                     habilitada end) as habilitada ,idSala,IdFuncionDetalle,FechaPreCompra
                FROM sala_funcion WHERE idFuncionDetalle= $id  order by fila,columna";                    
       
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
        if($estado==1){
            $query ="UPDATE sala_funcion SET habilitada=$estado, FechaPreCompra ='0000-00-00 00:00:00' WHERE idSalaFuncion=$id";
        }
        else{
            $query ="UPDATE sala_funcion SET habilitada=$estado, FechaPreCompra =NOW() WHERE idSalaFuncion=$id";
        }
        
    
    if($this->connection->query($query)){
        return true;
    }else{
        return false;
    }
    }
}

