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
		$idComplejo =$this->connection->real_escape_string($sala['idComplejo']);      
      
        $query = "INSERT INTO sala(idSala,descripcion,filas, columnas,IdComplejo) values
        (DEFAULT,'$nombreSala','$fila','$columna','$idComplejo')";
      
        if($this->connection->query($query)){
              $sala['idSala'] = $this->connection->insert_id;
            return $sala;
        }else{
            return false;
        }
    }
    
  
  public function getSalas($sala){
     $idComplejo =$this->connection->real_escape_string($sala['idComplejo']);
     $query ="SELECT * FROM sala where IdComplejo = $idComplejo";
     $salas= array();
      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $salas[] = $fila;
            }
            $result->free();
        }
        return $salas;
  
  }
 
  public function eliminarSala($sala){
    $idSala =$this->connection->real_escape_string($sala['idSala']);
    $query = "DELETE FROM sala where idSala = $idSala";
    if($this->connection->query($query)){             
            return true;
        }else{
            return false;
        }
  }
   
   public function obtenerSala($idSala){
    $id = (int) $this->connection->real_escape_string($idSala);
    $query = "SELECT * FROM sala where idSala = $id";
       
     $salas= '';      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $salas = $fila;
            }
            $result->free();
        }
        return $salas;
  }
    
 public function validarFunciones($idSala){
    $id = (int) $this->connection->real_escape_string($idSala);
    $query = "select count(*) as cant from funcion fn inner join funcionhorario fh on fn.idfuncion=fh.idfuncion
              where fn.fechabaja='0000-00-00 00:00:00'
              and fh.idsala=$id";       
   
     $salas= '';      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $salas = $fila;
            }
            $result->free();
        }
        return $salas;
  }
        
    
    
}