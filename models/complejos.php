<?php
require("connection.php");

class Complejos
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    }   

    public function addImage($imagen){
        $ComplejoID = $this->connection->real_escape_string($imagen['id']);
        $path = $this->connection->real_escape_string($imagen['path']);
        $file_name = $this->connection->real_escape_string($imagen['file_name']);
        $fullPath = $path.'/'.$file_name;
        $query = "UPDATE complejo SET
                    imagen = '$fullPath'
                    WHERE idComplejo = '$ComplejoID'";
        if($this->connection->query($query)){
            $imagen['idComplejo'] = $this->connection->insert_id;
            return $imagen;
        }else{
            return false;
        }
    }

    public function getComplejos(){
        $query = "SELECT * FROM complejo";  
       
        $complejos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $complejos[] = $fila;
            }
            $result->free();
        }
        return $complejos;
    }   

    public function createComplejo($complejo){
        $id = $this->connection->real_escape_string($complejo['idComplejo']);
        $nombre = $this->connection->real_escape_string($complejo['nombreComplejo']);
        $direccion = $this->connection->real_escape_string($complejo['direccionComplejo']);
        $descripcion = $this->connection->real_escape_string($complejo['descripcionComplejo']);
        $idZona = $this->connection->real_escape_string($complejo['idZona']);
       
        $query = "INSERT INTO complejo VALUES (
                    DEFAULT,
                    '$idZona',
                    '$nombre',                    
                    '$descripcion',
                    '$direccion',
                    '')";

        if($this->connection->query($query)){
            $complejo['idComplejo'] = $this->connection->insert_id;
            return $complejo;
        }else{
            return false;
        }
    }

    public function updateComplejo($complejo){
        $id = $this->connection->real_escape_string($complejo['idComplejo']);
        $nombre = $this->connection->real_escape_string($complejo['nombreComplejo']);
        $direccion = $this->connection->real_escape_string($complejo['direccionComplejo']);
        $descripcion = $this->connection->real_escape_string($complejo['descripcionComplejo']);
        $idZona = $this->connection->real_escape_string($complejo['idZona']);
       
        $query = "UPDATE complejo SET 
                    nombre = '$nombre',
                    direccion = '$direccion',
                    descripcion = '$descripcion'
                    WHERE idComplejo = '$id'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

    public function removeComplejo($complejoId){
        $id = (int) $this->connection->real_escape_string($complejoId);
        $query = "DELETE FROM complejo
                  WHERE idComplejo = $id";
        return $this->connection->query($query);
    }

}