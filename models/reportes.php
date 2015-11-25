<?php
require("connection.php");

class Reportes
{
  private $connection;
    
  public function __construct(){
      $this->connection = ConnectionCine::getInstance();
  }   
  
  public function getReporte1(){

    $query ="SELECT
              P.titulo,
              SUM(VD.precio) AS Recaudacion,
              COUNT(VD.idVentaDetalle) AS CantidadPersonas
              FROM venta V
              INNER JOIN ventadetalle VD ON V.idVenta = VD.idVenta
              INNER JOIN sala_funcion SF ON VD.idSalaFuncion = SF.idSalaFuncion
              INNER JOIN funcion F ON SF.idFuncion = F.idFuncion
              INNER JOIN pelicula P ON F.idPelicula = P.idPelicula
              WHERE V.tipoVenta <> 'Reserva'
              AND V.fecha BETWEEN '$fechaDesde' AND '$fechaDesde' 
              GROUP BY P.titulo";
    
    $filas= array();
      
    if( $result = $this->connection->query($query) ){
        while($fila = $result->fetch_assoc()){
            $filas[] = $fila;
        }
        $result->free();
    }

    return $filas;
  } 
  
  public function getReporte2(){

    $query ="SELECT
              C.nombre AS Complejo, 
              SUM( VD.precio ) AS Recaudacion, 
              COUNT( VD.idVentaDetalle ) AS CantidadPersonas
              FROM venta V
              INNER JOIN ventadetalle VD ON V.idVenta = VD.idVenta
              INNER JOIN sala_funcion SF ON VD.idSalaFuncion = SF.idSalaFuncion
              INNER JOIN funcion F ON SF.idFuncion = F.idFuncion
              INNER JOIN complejo C ON F.idComplejo = C.idComplejo
              WHERE V.tipoVenta <>  'Reserva'
              AND V.fecha BETWEEN '$fechaDesde' AND '$fechaDesde'
              GROUP BY C.nombre";
    
    $filas= array();
      
    if( $result = $this->connection->query($query) ){
        while($fila = $result->fetch_assoc()){
            $filas[] = $fila;
        }
        $result->free();
    }

    return $filas;
  } 

   


}