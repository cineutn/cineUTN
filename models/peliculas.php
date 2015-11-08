<?php
require("connection.php");
class Peliculas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 
	
    public function getFormatos(){
        $query = "SELECT descripcion, subtitulada, idFormato FROM formato ORDER BY descripcion";  
       
        $formatos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $formatos[] = $fila;
            }
            $result->free();
        }
        return $formatos;
    }

	public function addImage($imagen){
        
        /*$PeliculaID = $this->connection->real_escape_string($imagen['id']);
        $path = $this->connection->real_escape_string($imagen['path']);
        $file_name = $this->connection->real_escape_string($imagen['file_name']);
        $fullPath = $path.'/'.$file_name;
        $query = "UPDATE pelicula SET
                    imagen = '$fullPath'
                    WHERE idPelicula = '$PeliculaID'";
        if($this->connection->query($query)){
            $imagen['idPelicula'] = $this->connection->insert_id;
            return $imagen;
        }else{
            return false;
        }*/
        if (isset($_FILES['archivo'])){

           $archivo = $_FILES['archivo'];
           $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
           $time = time();
           $nombre = "{$_POST['nombre_archivo']}_$time.$extension";
           if (move_uploaded_file($archivo['tmp_name'], "archivos_subidos/$nombre")){
              echo 1;
           }else{
              echo 0;
           }
        }      
    }

    public function getPeliculas(){
        $query = "SELECT 
                        P.idPelicula,
                        P.titulo,
                        P.duracion,
                        P.clasificacion, 
                        P.genero, 
                        P.estreno, 
                        P.fechaBaja, 
                        P.fechaAlta, 
                        P.sinopsis, 
                        P.imagen, 
                        P.trailer, 
                        P.actores, 
                        P.director, 
                        F.descripcion,
                        F.subtitulada
                    FROM pelicula P 
                    INNER JOIN formato F ON P.idFormato = F.idFormato 
                    ORDER BY titulo";  
       
        $peliculas = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $peliculas[] = $fila;
            }
            $result->free();
        }
        return $peliculas;
    }

    public function getPeliculasCartelera(){
        $query = "SELECT idPelicula,titulo,imagen FROM `pelicula` WHERE `fechaBaja`='0000-00-00 00:00:00' order by fechaAlta";  
       
        $peliculas = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $peliculas[] = $fila;
            }
            $result->free();
        }
        return $peliculas;
    }

    public function getPeliculaByID($id){
        $query = "SELECT * FROM pelicula where idPelicula='$id'";  
       
        $peliculas = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $peliculas[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $peliculas;
    
    }
    public function getPeliculaFuncionByID($id){
        /*$query = "SELECT 
                    a.idComplejo,
                    nombre as nombreComplejo, 
                    f.idTipoFuncion,
                    dia,
                    horario,
                    f.descripcion as formato, 
                    subtitulada,
                    idFuncionDetalle    
                    FROM peliculacomplejo a
                    INNER JOIN complejo b on b.idComplejo=a.idComplejo
                    INNER JOIN pelicula c on a.idPelicula=c.idPelicula
                    INNER JOIN funcion  d on d.idPelicula=c.idPelicula and d.idComplejo=a.idComplejo
                    INNER JOIN funcionhorario e on e.idFuncion=d.idFuncion
                    INNER JOIN formato f on f.idTipoFuncion=d.idTipoFuncion where a.idPelicula='$id'";  */
       
        $query = "SELECT 
                    F.idComplejo,
                    C.nombre as nombreComplejo, 
                    F.idTipoFuncion,
                    FH.dia,
                    FH.horario,
                    FO.descripcion as formato, 
                    FO.subtitulada,
                    FH.idFuncionDetalle    
                    FROM funcion F
                    INNER JOIN complejo C on F.idComplejo = C.idComplejo
                    INNER JOIN pelicula P on F.idPelicula = P.idPelicula
                    INNER JOIN funcionhorario FH on F.idFuncion = FH.idFuncion
                    INNER JOIN formato FO on F.idTipoFuncion = FO.idTipoFuncion 
                    WHERE F.idPelicula='$id'"; 

        $peliculas = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $peliculas[] = $fila;
                }
                $result->free();
            }
            else {
                    throw new Exception ($e->getMessage());
           }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $peliculas;
    
    }

    public function updatePelicula($pelicula){
        $id = $this->connection->real_escape_string($pelicula['idPelicula']);
        $tituloPelicula = $this->connection->real_escape_string($pelicula['tituloPelicula']);
        $duracionPelicula = $this->connection->real_escape_string($pelicula['duracionPelicula']);
        $clasificacionPelicula = $this->connection->real_escape_string($pelicula['clasificacionPelicula']);
        $generoPelicula = $this->connection->real_escape_string($pelicula['generoPelicula']);                                   
        $sinopsisPelicula = $this->connection->real_escape_string($pelicula['sinopsisPelicula']);
        $trailerPelicula = $this->connection->real_escape_string($pelicula['trailerPelicula']);
        $actoresPelicula = $this->connection->real_escape_string($pelicula['actoresPelicula']);
        $directorPelicula = $this->connection->real_escape_string($pelicula['directorPelicula']);   
        $fechaEstrenoPelicula = $this->connection->real_escape_string($pelicula['fechaEstrenoPelicula']);
        $urlimagen = $this->connection->real_escape_string( $pelicula["urlimagen"]);
        $idFormato = $this->connection->real_escape_string( $pelicula["idFormato"]);
        $query = "UPDATE pelicula SET 
                    titulo = '$tituloPelicula',
                    duracion = '$duracionPelicula',                                        
                    clasificacion = '$clasificacionPelicula',
                    genero = '$generoPelicula',
                    estreno = '$fechaEstrenoPelicula',                      
                    sinopsis = '$sinopsisPelicula',                    
                    imagen = '$urlimagen',
                    trailer = '$trailerPelicula',
                    actores = '$actoresPelicula',
                    director = '$directorPelicula',
                    idFormato = '$idFormato'
                    WHERE idPelicula = '$id'";

        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

    public function removePelicula($peliculaId){
        $id = (int) $this->connection->real_escape_string($peliculaId);
        $query = "DELETE FROM pelicula
                  WHERE idPelicula = $id";
        return $this->connection->query($query);
    }

    public function createPelicula($pelicula){        
		$id = $this->connection->real_escape_string($pelicula['idPelicula']);
        $tituloPelicula = $this->connection->real_escape_string($pelicula['tituloPelicula']);
		$duracionPelicula = $this->connection->real_escape_string($pelicula['duracionPelicula']);
		$clasificacionPelicula = $this->connection->real_escape_string($pelicula['clasificacionPelicula']);
		$generoPelicula = $this->connection->real_escape_string($pelicula['generoPelicula']);							        
        $sinopsisPelicula = $this->connection->real_escape_string($pelicula['sinopsisPelicula']);
		$trailerPelicula = $this->connection->real_escape_string($pelicula['trailerPelicula']);
		$actoresPelicula = $this->connection->real_escape_string($pelicula['actoresPelicula']);
		$directorPelicula = $this->connection->real_escape_string($pelicula['directorPelicula']);	
		$fechaEstrenoPelicula = $this->connection->real_escape_string($pelicula['fechaEstrenoPelicula']);
		$urlimagen = $this->connection->real_escape_string( $pelicula["urlimagen"]);
        $idFormato = $this->connection->real_escape_string( $pelicula["idFormato"]);
        $query = "INSERT INTO pelicula (idPelicula,titulo,duracion,clasificacion,genero,estreno,fechaAlta,sinopsis,imagen,trailer,actores,director, idFormato) VALUES (                    
					DEFAULT,
                    '$tituloPelicula',
					'$duracionPelicula',										
					'$clasificacionPelicula',
					'$generoPelicula',
					'$fechaEstrenoPelicula',
                     SYSDATE(),							
					'$sinopsisPelicula',					
                    '$urlimagen',
					'$trailerPelicula',
					'$actoresPelicula',
					'$directorPelicula',
                    '$idFormato')";
        if($this->connection->query($query)){
              $pelicula['idPelicula'] = $this->connection->insert_id;
            return $pelicula;
        }else{
            return false;
        }
    }
    public function getPeliculaxComplejo($idComplejo){
        $query = "select idFuncion,concat(c.titulo ,' - ' ,f.descripcion,' - ',case subtitulada when 0 then 'Español' else 'Subtitulada' end ) as titulo
from peliculacomplejo a
inner join complejo b on b.idComplejo=a.idComplejo
inner join pelicula c on a.idPelicula=c.idPelicula
inner join funcion  d on d.idPelicula=c.idPelicula and d.idComplejo=a.idComplejo
inner join formato f on f.idTipoFuncion=d.idTipoFuncion
where b.idComplejo='$idComplejo' and (c.fechaBaja=0 or c.fechaBaja>now())
and (d.fechaBaja=0 or d.fechaBaja>now()) ";
            
            
             
       
        $peliculas = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $peliculas[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $peliculas;
    
    }
    public function getDiasxPeliculaxComplejo($id){
        $query = "select distinct dia
from funcionhorario a
where idFuncion='$id'";  
       
        $peliculas = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $peliculas[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $peliculas;
    
    }
    public function getHorariosxPeliculaxComplejo($datos){
        $idFuncion = $this->connection->real_escape_string($datos['idFuncion']);
        $dia = $datos['dia'];
        
        $query = "  select idFuncionDetalle,horario 
                    from funcionhorario
                    where idFuncion=$idFuncion and dia='$dia'";  
       
        $peliculas = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $peliculas[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $peliculas;
    
    }
    
    
 public function getPeliculasDetalle($fechaSemana){    
      
     $query ="SELECT pel.idPelicula,pel.titulo,pel.duracion,frm.descripcion,frm.subtitulada,frm.idTipoFucnion FROM pelicula pel
    inner join formato frm on pel.idFormato=frm.idFormato
    WHERE pel.fechaBaja='0000-00-00 00:00:00'
    AND estreno < '$fechaSemana'
    order by fechaAlta";
     
     //$query ="SELECT idPelicula,titulo,duracion FROM pelicula WHERE fechaBaja='0000-00-00 00:00:00' AND estreno < '$fechaSemana' order by fechaAlta";
     $peliculas= array();
      
       if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $peliculas[] = $fila;
            }
            $result->free();
        }
        return $peliculas;
  
  } 
    
    
    
    
}