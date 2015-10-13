<?php
require("connection.php");

class Tarjetas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    }   

    public function getTarjetas(){
        $query = "SELECT 
                    idTarjeta,
                    empresa
                    FROM tarjeta                     
                    ORDER BY empresa ";  
       
        $tarjetas = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $tarjetas[] = $fila;
            }
            $result->free();
        }
        return $tarjetas;
    }   

    public function getDatosTarjeta($tarjetaId){
        $id = (int) $this->connection->real_escape_string($tarjetaId);
        $query = "SELECT 
                    cantNumeros,
                    codigoSeguridad
                    FROM tarjeta                     
                    WHERE idTarjeta = $id";  
       
        $tarjeta = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $tarjeta[] = $fila;
            }
            $result->free();
        }
        return $tarjeta;
    }

    public function createTarjeta($tarjeta){
        $id = $this->connection->real_escape_string($tarjeta['idTarjeta']);
        $empresa = $this->connection->real_escape_string($tarjeta['empresa']);
        $codigoSeguridad = $this->connection->real_escape_string($tarjeta['codigoSeguridad']);
        $cantNumeros = $this->connection->real_escape_string($tarjeta['cantNumeros']);
        $query = "INSERT INTO tarjeta VALUES (
                    DEFAULT,
                    '$empresa',
                    '$codigoSeguridad',
                    '$cantNumeros')";

        if($this->connection->query($query)){
            $tarjeta['idTarjeta'] = $this->connection->insert_id;
            return $tarjeta;
        }else{
            return false;
        }
    }

    public function updateTarjeta($tarjeta){
        $id = $this->connection->real_escape_string($tarjeta['idTarjeta']);
        $empresa = $this->connection->real_escape_string($tarjeta['empresa']);
        $codigoSeguridad = $this->connection->real_escape_string($tarjeta['codigoSeguridad']);
        $cantNumeros = $this->connection->real_escape_string($tarjeta['cantNumeros']);       
        $query = "UPDATE tarjeta SET 
                    empresa = '$empresa',
                    codigoSeguridad = '$codigoSeguridad',
                    cantNumeros = '$cantNumeros'
                    WHERE idTarjeta = '$id'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

    public function removeTarjeta($tarjetaId){
        $id = (int) $this->connection->real_escape_string($tarjetaId);
        $query = "DELETE FROM tarjeta
                  WHERE idTarjeta = $id";
        return $this->connection->query($query);
    }
}