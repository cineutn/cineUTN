<?php
require("connection.php");

class Imagen
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionTwitter::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT imagenID, path, file_name FROM imagenes";
        $imagenes = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $imagenes[] = $fila;
            }
            $result->free();
        }
        return $imagenes;
    }

    public function create($imagen){
        $usuarioID = $this->connection->real_escape_string($imagen['id']);
        $path = $this->connection->real_escape_string($imagen['path']);
        $file_name = $this->connection->real_escape_string($imagen['file_name']);
        $fullPath = $path.'/'.$file_name;
        $query = "UPDATE usuarios SET
                    imagen = '$fullPath'
                    WHERE usuarioID = '$usuarioID'";
        if($this->connection->query($query)){
            $imagen['imageneID'] = $this->connection->insert_id;
            return $imagen;
        }else{
            return false;
        }
    }
    
}