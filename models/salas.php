<?php
require("connection.php");

class Salas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 



  public function createSala($sala){        		
        
		$nombreSala =$this->connection->real_escape_string($pelicula['nombreSala']);
		$fila =$this->connection->real_escape_string($pelicula['filas']);
		$columna =$this->connection->real_escape_string($pelicula['columnas']);      
      
        $query = "INSERT INTO sala (idSala,nombresala,fila,columna) vlaues 
        (DEFAULT,'$nombreSala','$fila','$columna')";
      
        if($this->connection->query($query)){
              //$sala['idPelicula'] = $this->connection->insert_id;
            return $sala;
        }else{
            return false;
        }
    }


}