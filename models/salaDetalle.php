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
      
       $query = "INSERT INTO saladetalle(IdSalaDetalle,idSala,fila,columna) VALUES
       (DEFAULT,$idSala,'$fila',$columna)";
     
      
        if($this->connection->query($query)){
              $sala['idSalaDetalle'] = $this->connection->insert_id;
            return $sala;
        }else{
            return false;
        }
    }
    
    
public function eliminarSalaDetalle($sala){
    $idSala =$this->connection->real_escape_string($sala['idSala']);
    $query = "DELETE FROM saladetalle where idSala = $idSala";
    if($this->connection->query($query)){             
            return true;
        }else{
            return false;
        }
  }    
    
}