<?php
require("connection.php");

class Semanas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 
    
  public function getNumeroSemanas(){
     $query ="SELECT numeroSemana,fecha,nombreDia FROM semana WHERE nombreDia='jueves'";
     $semanas= array();
      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $semanas[] = $fila;
            }
            $result->free();
        }
        return $semanas;  
  }
 
   public function getUltimaSemana(){
     $query ="SELECT * FROM semana order by fecha desc limit 1";
     $semanas= '';
      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $semanas[] = $fila;
            }
            $result->free();
        }
        return $semanas;  
  } 
    
    
  public function addSemana($semana){        		

       $fecha =$this->connection->real_escape_string($semana['fecha']);      
       $numeroSemana =$this->connection->real_escape_string($semana['numeroSemana']);  
       $dias =$this->connection->real_escape_string($semana['dias']);  
       $nombreDia =$this->connection->real_escape_string($semana['nombreDia']);  
          
          
       $query = " INSERT INTO semana(idSemana,numeroSemana,fecha,nombreDia) VALUES (DEFAULT,$numeroSemana,ADDDATE('$fecha', INTERVAL $dias DAY),'$nombreDia')";

        if($this->connection->query($query)){
            $semana['idSemana'] = $this->connection->insert_id;
            return $semana;
        }else{
            return false;
        }
    }
    
  public function addSemana2($semana){        		
      $consulta =$this->connection->real_escape_string($semana['query']);
      		
      $query =stripslashes($consulta);
      
        if($this->connection->query($query)){
            
            return true;
        }else{
            return false;
        }
    }    
    
  public function obtenerFechaInicioSemana($semana){
    $nro = (int) $this->connection->real_escape_string($semana);
    $query = "SELECT fecha FROM semana where numeroSemana=$nro order by fecha asc limit 1";
       
     $fecha= '';      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $fecha = $fila;
            }
            $result->free();
        }
        return $fecha;
  }
    
   public function obtenerDiasSemana($semana){
    $nro = (int) $this->connection->real_escape_string($semana);
    $query = "SELECT * FROM semana where numeroSemana=$nro order by fecha asc";
       
     $fecha= array();      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $fecha[] = $fila;
            }
            $result->free();
        }
        return $fecha;
   }   
    
    
}