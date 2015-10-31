<?php
require("connection.php");

class SalaDetalle
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 



  public function createSalaDetalle($sala){        		
        
		$idSala =$this->connection->real_escape_string($sala['idSala']);		
		$fila =$this->connection->real_escape_string($sala['fila']);
		$columna =$this->connection->real_escape_string($sala['columna']);      
      
       $query = "INSERT INTO saladetalle(IdSalaDetalle,idSala,fila,columna,habilitada) VALUES
       (DEFAULT,$idSala,$fila,$columna,0)";
     
      
        if($this->connection->query($query)){
              $sala['idSalaDetalle'] = $this->connection->insert_id;
            return $sala;
        }else{
            return false;
        }
    }
    
}