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
		$habilitada =$this->connection->real_escape_string($sala['habilitada']);      
      
       $query = "INSERT INTO saladetalle(IdSalaDetalle,idSala,fila,columna,habilitada) VALUES
       (DEFAULT,$idSala,'$fila',$columna,$habilitada)";
     
      
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
    
   public function obtenerSalaDetalle($idSala){
    $id = (int) $this->connection->real_escape_string($idSala);
    $query = "SELECT * FROM saladetalle where idSala = $id order by fila,columna";
       
     $salas = array();     
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $salas[] = $fila;
            }
            $result->free();
        }
        return $salas;
  }
    
    public function editarSalaDetalle($sala){
        $idSalaDetalle =$this->connection->real_escape_string($sala['idSalaDetalle']);
        $habilitada =$this->connection->real_escape_string($sala['habilitada']);
        
        $query = "UPDATE saladetalle SET habilitada=$habilitada WHERE IdSalaDetalle = $idSalaDetalle";
        if($this->connection->query($query)){             
                return true;
            }else{
                return false;
            }
      }
    
}