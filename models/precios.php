<?php
require("connection.php");

class Precios
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    }   

    public function validateDescripcionPrecio($precio){
        $id = $this->connection->real_escape_string($precio['idPrecio']);
        $descripcion = $this->connection->real_escape_string($precio['descripcionPrecio']);
        $formato = $this->connection->real_escape_string($precio['formato']);
        $query = "SELECT * 
                    FROM precios
                    WHERE UPPER(descripcion) = UPPER('$descripcion')
                    AND formato = '$formato'
                    AND idPrecio != '$id' ";  
       
        $precios = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $precios[] = $fila;
            }
            $result->free();
        }
        return $precios;
    } 

    public function getPrecios(){
        $query = "SELECT 
                    P.formato AS Formato, 
                    P.idPrecio, 
                    P.descripcion, 
                    P.valor 
                    FROM precios P 
                    ORDER BY Formato ";  
       
        $precios = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $precios[] = $fila;
            }
            $result->free();
        }
        return $precios;
    }   

    public function getDetallePrecio($idPrecio){
        $query = "SELECT 
                    P.descripcion AS detalle 
                    FROM precios P 
                    WHERE idPrecio =  '$idPrecio'";  
       
        $precios = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $precios[] = $fila;
            }
            $result->free();
        }
        return $precios;
    }   

    public function getFormatos(){
        $query = "SELECT DISTINCT descripcion FROM formato";  
       
        $formatos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $formatos[] = $fila;
            }
            $result->free();
        }
        return $formatos;
    }   

    public function createPrecio($precio){
        $id = $this->connection->real_escape_string($precio['idPrecio']);
        $formato = $this->connection->real_escape_string($precio['formato']);
        $descripcion = $this->connection->real_escape_string($precio['descripcionPrecio']);
        $valor = $this->connection->real_escape_string($precio['valorPrecio']);
        $query = "INSERT INTO precios VALUES (
                    DEFAULT,
                    '$formato',
                    '$descripcion',
                    '$valor')";

        if($this->connection->query($query)){
            $precio['idPrecio'] = $this->connection->insert_id;
            return $precio;
        }else{
            return false;
        }
    }

    public function updatePrecio($precio){
        $id = $this->connection->real_escape_string($precio['idPrecio']);
        $formato = $this->connection->real_escape_string($precio['formato']);
        $descripcion = $this->connection->real_escape_string($precio['descripcionPrecio']);
        $valor = $this->connection->real_escape_string($precio['valorPrecio']);
       
        $query = "UPDATE precios SET 
                    formato = '$formato',
                    descripcion = '$descripcion',
                    valor = '$valor'
                    WHERE idPrecio = '$id'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

    public function removePrecio($precioId){
        $id = (int) $this->connection->real_escape_string($precioId);
        $query = "DELETE FROM precios
                  WHERE idPrecio = $id";
        return $this->connection->query($query);
    }
}