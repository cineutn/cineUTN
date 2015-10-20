<?php
require("connection.php");

class PeliculaCompra
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    }   

    public function getFuncionDetalle($idFuncion){
        $id = (int) $this->connection->real_escape_string($idFuncion);
        $query = "select fh.dia,
                    fh.horario,
                    sl.descripcion as sala,
                    pl.titulo,
                    pl.clasificacion,
                    pl.imagen,
                    il.descripcion as idioma,
                    fo.descripcion tipoFuncion,
                    fo.subtitulada,
                    fo.idTipoFuncion,
                    cm.nombre
                    from funcion as fn 
                    inner join funcionhorario fh on fn.idFuncion = fh.idFuncion
                    inner join sala as sl on fn.idSala = sl.idSala
                    inner join pelicula pl on fn.idPelicula = pl.idPelicula
                    inner join idioma il on fn.idIdioma = il.idIdioma
                    inner join formato fo on fn.idTipoFuncion = fo.idTipoFuncion
                    inner join complejo cm on cm.idComplejo = fn.idComplejo
                    where fh.idFuncionDetalle = $id";  
       
        $funcionDetalle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $funcionDetalle[] = $fila;
            }
            $result->free();
        }
        return $funcionDetalle;
    } 
    
    
     public function getPreciosPorFormato($idFormato){
        $id = (int) $this->connection->real_escape_string($idFormato);
        $query = "SELECT                     
                    P.idPrecio, 
                    P.descripcion, 
                    P.valor 
                    FROM precios P 
                    where P.idFormato = $id";                    
       
        $precioFormato = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $precioFormato[] = $fila;
            }
            $result->free();
        }
        return $precioFormato;
    } 
    

}

