<?php
require("connection.php");

class Comentario
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionTwitter::getInstance();
    }
    
    public function getCantidad($id){
        $query = "SELECT COUNT(tweet) AS cantidad FROM comentarios WHERE usuarioID = '$id'";                  
        $cantidad = $this->connection->query($query);
        return $cantidad->fetch_assoc();
    }

    public function getComentarios(){
        $query = "SELECT * FROM comentarios C INNER JOIN usuarios U ON  C.usuarioID =  U.usuarioID
                  ORDER BY fecha DESC";                  
        $comentarios = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $comentarios[] = $fila;
            }
            $result->free();
        }
        return $comentarios;
    }

    public function createComentario($request){
        $usuario = $this->connection->real_escape_string($request['usuarioID']);
        $tweet = $this->connection->real_escape_string($request['tweet']);
        $fecha = $this->connection->real_escape_string($request['fecha']);
        $query = "INSERT INTO comentarios VALUES (
                    DEFAULT,
                    '$tweet',
                    '$usuario',
                    '$fecha')";
        if($this->connection->query($query)){
            $request['comentarioId'] = $this->connection->insert_id;
            return $request;
        }else{
            return false;
        }
    }

    public function updateComentario($request){
        $id = (int) $this->connection->real_escape_string($request['comentarioId']);
        $usuario = $this->connection->real_escape_string($request['usuarioID']);
        $tweet = $this->connection->real_escape_string($request['tweet']);
        $fecha = $this->connection->real_escape_string($request['fecha']);
        $query = "UPDATE comentarios SET
                    tweet = '$tweet',
                    usuarioID = '$usuario',
                    fecha = '$fecha'
                  WHERE comentarioId = $id";
        return $this->connection->query($query);
    }

    public function removeComentario($comentarioId){
        $id = (int) $this->connection->real_escape_string($comentarioId);
        $query = "DELETE FROM comentarios
                  WHERE comentarioId = $comentarioId";
        return $this->connection->query($query);
    }

}