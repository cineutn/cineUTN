<?php
require("connection.php");

class Funciones
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 
    
    
    
    
  public function createFuncion($funcion){        		
      
		$idFuncion =$this->connection->real_escape_string($funcion['idFuncion']);
		$idPelicula =$this->connection->real_escape_string($funcion['idPelicula']);
        $idIdioma=$this->connection->real_escape_string($funcion['idIdioma']);
		$idTipoFuncion =$this->connection->real_escape_string($funcion['idTipoFuncion']);
		$estado =$this->connection->real_escape_string($funcion['estado']);
		$fechaAlta =$this->connection->real_escape_string($funcion['fechaAlta']);      
		$idComplejo =$this->connection->real_escape_string($funcion['idComplejo']);      
      
        $query = "INSERT INTO funcion(idFuncion, idPelicula,idIdioma,idTipoFuncion,estado,fechaAlta,idComplejo) VALUES 
					(DEFAULT,$idPelicula,$idIdioma,$idTipoFuncion,$estado,'$fechaAlta',$idComplejo)";
      
        if($this->connection->query($query)){
              $funcion['idFuncion'] = $this->connection->insert_id;
            return $funcion;
        }else{
            return false;
        }
    }
    
    
}