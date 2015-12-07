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
					(DEFAULT,$idPelicula,$idIdioma,$idTipoFuncion,$estado,now(),$idComplejo)";
      
        if($this->connection->query($query)){
              $funcion['idFuncion'] = $this->connection->insert_id;
            return $funcion;
        }else{
            return false;
        }
    }
    
     
  public function createFuncionHorario($funcion){        		
      
    $idFuncionDetalle =$this->connection->real_escape_string($funcion['idFuncionDetalle']);
    $idFuncion =$this->connection->real_escape_string($funcion['idFuncion']);
    $idSala =$this->connection->real_escape_string($funcion['idSala']);
    $dia=$this->connection->real_escape_string($funcion['dia']);
    $horario =$this->connection->real_escape_string($funcion['horario']);
    $idSemana =$this->connection->real_escape_string($funcion['idSemana']);
      
    $query = "INSERT INTO funcionhorario(idFuncionDetalle,idFuncion,idSala,idSemana,dia,horario) VALUES 
            (DEFAULT,$idFuncion,$idSala,$idSemana,'$dia','$horario')";

    if($this->connection->query($query)){
          $funcion['idFuncionDetalle'] = $this->connection->insert_id;
        return $funcion;
    }else{
        return false;
    }
  }
    
    
    
  public function createSalaDetalle($funcion){        

    $idSalaFuncion =$this->connection->real_escape_string($funcion['idSalaFuncion']);
    $idFucnion =$this->connection->real_escape_string($funcion['idFucnion']);
    $columna =$this->connection->real_escape_string($funcion['columna']);
    $fila=$this->connection->real_escape_string($funcion['fila']);
    $habilitada =$this->connection->real_escape_string($funcion['habilitada']);
    $idSala =$this->connection->real_escape_string($funcion['idSala']);
    $idFuncionDetalle =$this->connection->real_escape_string($funcion['idFuncionDetalle']);
      
    $query ="INSERT INTO sala_funcion(idSalaFuncion,idFuncion,columna,fila,habilitada,idSala,idFuncionDetalle) VALUES 
            (DEFAULT,$idFucnion,$columna,'$fila',$habilitada,$idSala,$idFuncionDetalle)";      

    if($this->connection->query($query)){
          $funcion['idSalaFuncion'] = $this->connection->insert_id;
        return $funcion;
    }else{
        return false;
    }
  }
    
  public function obtenerFuncionesActivas($funcion){      

    $idSemana =$this->connection->real_escape_string($funcion['idSemana']);
    $idSala =$this->connection->real_escape_string($funcion['idSala']);
      
      
    $query ="select fn.idfuncion,pel.titulo,pel.duracion,fm.descripcion,fm.subtitulada,fh.horario 
    from funcionhorario fh inner join funcion fn on fh.idfuncion =fn.idfuncion
	inner join pelicula pel on pel.idpelicula=fn.idpelicula
	inner join formato fm on pel.idformato =fm.idformato
	where fh.idSemana =$idSemana    
    and fh.idSala =$idSala
    and fn.fechaBaja ='0000-00-00 00:00:00'  order by 6";

    $funciones = array();      
      if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $funciones[] = $fila;
            }
            $result->free();
        }
        return $funciones;
  }
    
  public function borrarFuncion($funcion){    

    $idFuncion =$this->connection->real_escape_string($funcion['idFuncion']);
    $query ="UPDATE funcion SET fechaBaja= NOW() WHERE idFuncion=$idFuncion";
      
      //$query ="DELETE FROM funcion where idFuncion=$idFuncion";          
      if( $result = $this->connection->query($query) ){
         return true;
        }else{
        return false;
      }
      
  } 
    
  public function borrarFuncionHorario($funcion){    

    $idFuncion =$this->connection->real_escape_string($funcion['idFuncion']);
    $query ="DELETE FROM funcionHorario where idFuncion=$idFuncion";          
      if( $result = $this->connection->query($query) ){
         return true;
        }else{
        return false;
      }
      
  } 
    
    public function borrarSalaFuncion($funcion){    

    $idFuncion =$this->connection->real_escape_string($funcion['idFuncion']);
    $query ="DELETE FROM sala_funcion where idFuncion=$idFuncion";          
      if( $result = $this->connection->query($query) ){
         return true;
        }else{
        return false;
      }
      
  }
    
 public function obtenerFuncionesPorSemana($funcion){          
    $nroSemana =$this->connection->real_escape_string($funcion['nroSemana']);     
      
    $query ="SELECT count(*) cantidad FROM semana se inner JOIN funcionhorario fh on se.idsemana=fh.idSemana 
    inner join funcion f on f.idfuncion=fh.idfuncion  WHERE numeroSemana =$nroSemana AND f.fechaBaja ='0000-00-00 00:00:00'";

    $funciones = array();      
      if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $funciones[] = $fila;
            }
            $result->free();
        }
        return $funciones;
  }        
    
    
 public function obtenerFuncionesPorSala($funcion){          
    $nroSemana =$this->connection->real_escape_string($funcion['nroSemana']); 
     
    $query ="SELECT sl.descripcion as Sala,pl.titulo,fm.descripcion,fm.subtitulada,fh.dia,fh.horario,fn.fechaBaja FROM `semana` se inner join funcionhorario fh  on se.idsemana=fh.idsemana
    inner join funcion fn on fn.idfuncion=fh.idfuncion inner join pelicula pl on pl.idPelicula = fn.idPelicula 
    inner join sala sl on sl.idsala=fh.idsala inner join formato fm on fm.idformato=pl.idFormato
    where se.numerosemana=$nroSemana";      

    $funciones = array();      
      if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $funciones[] = $fila;
            }
            $result->free();
        }
        return $funciones;
  } 
    
 public function bajaFuncionesPorSemana($funcion){          
    $nroSemana =$this->connection->real_escape_string($funcion['nroSemana']); 
    $idComplejo =$this->connection->real_escape_string($funcion['idComplejo']); 
    
     $query ="UPDATE funcion SET fechabaja=now()where idFuncion in(
select fh.idFuncion from funcionhorario fh inner join semana se on fh.idsemana =se.idsemana 
 where se.numerosemana=$nroSemana)
and idComplejo=$idComplejo"; 

    $funciones = array();      
      if( $result = $this->connection->query($query) ){
             return true;
        }else{
        return false;
        }
  } 
 
 public function obtenerFuncionesPorComplejo($funcion){          
    $nroSemana =$this->connection->real_escape_string($funcion['nroSemana']);     
    $idComplejo=$this->connection->real_escape_string($funcion['idComplejo']); 
     $query ="SELECT count(*) cantidad FROM semana se inner JOIN funcionhorario fh on se.idsemana=fh.idSemana 
    inner join funcion f on f.idfuncion=fh.idfuncion
    #inner join complejo cl on cl.idComplejo=f.idcomplejo
    WHERE numeroSemana =$nroSemana 
    AND f.fechaBaja ='0000-00-00 00:00:00'
    #AND cl.idComplejo =$idComplejo
     AND f.idComplejo =$idComplejo";

     echo $query;
     return false;
     
    $funciones = array();      
      if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $funciones[] = $fila;
            }
            $result->free();
        }
        return $funciones;
  }

public function obtenerFuncionesPorSalaComplejo($funcion){          
    $nroSemana =$this->connection->real_escape_string($funcion['nroSemana']); 
    $idComplejo =$this->connection->real_escape_string($funcion['idComplejo']); 
     
    $query ="SELECT sl.descripcion as Sala,pl.titulo,fm.descripcion,fm.subtitulada,fh.dia,fh.horario,fn.fechaBaja FROM `semana` se inner join funcionhorario fh  on se.idsemana=fh.idsemana
    inner join funcion fn on fn.idfuncion=fh.idfuncion inner join pelicula pl on pl.idPelicula = fn.idPelicula 
    inner join sala sl on sl.idsala=fh.idsala inner join formato fm on fm.idformato=pl.idFormato
    inner join complejo cl on cl.idcomplejo=sl.idcomplejo
    where se.numerosemana=$nroSemana
    and cl.idcomplejo=$idComplejo";      

    $funciones = array();      
      if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $funciones[] = $fila;
            }
            $result->free();
        }
        return $funciones;
  } 
    
}