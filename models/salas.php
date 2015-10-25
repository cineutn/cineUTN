<?php
require("connection.php");

class Salas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 



  public function createSala($sala){        		
        
		$idSala =$this->connection->real_escape_string($sala['idSala']);
		$nombreSala =$this->connection->real_escape_string($sala['nombreSala']);
		$fila =$this->connection->real_escape_string($sala['filas']);
		$columna =$this->connection->real_escape_string($sala['columnas']);      
      
        $query = "INSERT INTO sala(idSala,descripcion,fila, columna) values
        (DEFAULT,'$nombreSala','$fila','$columna')";
      
        if($this->connection->query($query)){
              $sala['idSala'] = $this->connection->insert_id;
            return $sala;
        }else{
            return false;
        }
    }
    
  
  public function getSalas(){
     $query ="SELECT * FROM sala";
     $salas= array();
      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $salas[] = $fila;
            }
            $result->free();
        }
        return $salas;
  
  }
   
}