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
                    CONCAT(pl.titulo , ' ' , case fo.descripcion when '2D' then '' else fo.descripcion end ,case fo.subtitulada when 0 then ' (Cast) ' else ' (Subt) ' end ) AS titulo,
                    pl.clasificacion,
                    pl.imagen,
                    il.descripcion as idioma,
                    fo.descripcion tipoFuncion,
                    fo.subtitulada,
                    fo.idTipoFuncion,
                    cm.nombre
                    from funcion as fn 
                    inner join funcionhorario fh on fn.idFuncion = fh.idFuncion
                    inner join sala as sl on fh.idSala = sl.idSala
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
                    where P.formato = $id";                    
       
        $precioFormato = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $precioFormato[] = $fila;
            }
            $result->free();
        }
        return $precioFormato;
    } 
    
    public function getButacasLibres($idFuncionDetalle){
        $id = (int) $this->connection->real_escape_string($idFuncionDetalle);
        $query = "select count(*) as cantidad from funcionhorario fh inner join funcion fn on fh.idfuncion = fn.idfuncion
                    inner join sala_funcion sf on sf.idfuncion=fn.idfuncion
                    where fh.idFuncionDetalle =$id
                    and sf.habilitada=1";                    
       
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

