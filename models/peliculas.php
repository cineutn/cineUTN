<?php
require("connection.php");
class Peliculas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 
	
    public function validateNombrePelicula($pelicula){
        $id = $this->connection->real_escape_string($pelicula['idPelicula']);
        $titulo = $this->connection->real_escape_string($pelicula['tituloPelicula']);
        $idFormato = $this->connection->real_escape_string($pelicula['idFormato']);
        $query = "SELECT * 
                    FROM pelicula
                    WHERE UPPER(titulo) = UPPER('$titulo')
                    AND idFormato = '$idFormato'
                    AND idPelicula != '$id' ";  
       
        $peliculas = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $peliculas[] = $fila;
            }
            $result->free();
        }
        return $peliculas;
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
        $query = "
                  SELECT DISTINCT 
                        P.titulo,
                        P.imagen 
                FROM pelicula P
                INNER JOIN funcion F ON F.idPelicula = P.idPelicula
                WHERE F.fechaBaja = '0000-00-00 00:00:00'
                ORDER BY P.fechaAlta";  

        $peliculas = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $peliculas[] = $fila;
            }
            $result->free();
        }
        return $peliculas;
    }

    public function getPeliculasCarteleraPorComplejo($id){
        $query = "SELECT 
                        P.titulo,
                        P.imagen, 
                        FH.dia,
                        FH.horario,
                        FO.descripcion as formato, 
                        FO.subtitulada
                    FROM pelicula P
                    INNER JOIN funcion F ON P.idPelicula = F.idPelicula
                    INNER JOIN funcionhorario FH ON F.idFuncion = FH.idFuncion
                    INNER JOIN formato FO on F.idTipoFuncion = FO.idTipoFuncion
                    INNER JOIN complejo C on F.idComplejo = C.idComplejo
                    WHERE F.fechaBaja = '0000-00-00 00:00:00'
                    AND C.idComplejo = '$id'
                    ORDER BY P.titulo, FH.dia, FH.horario,FO.descripcion, FO.subtitulada";  

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
        $query = "SELECT * 
                    FROM pelicula 
                    WHERE idPelicula = '$id'";  
       
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
    
    public function getPeliculaByNombre($id){
        $query = "SELECT DISTINCT titulo,
                        imagen,
                        sinopsis,
                        genero,
                        duracion,
                        actores,
                        director,
                        clasificacion,
                        trailer
                    FROM pelicula 
                    WHERE titulo = '$id'";  
               
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
                    FO.idFormato,
                    FO.descripcion as formato, 
                    FO.subtitulada,
                    FH.idFuncionDetalle    
                    FROM funcion F
                    INNER JOIN complejo C on F.idComplejo = C.idComplejo
                    INNER JOIN pelicula P on F.idPelicula = P.idPelicula
                    INNER JOIN funcionhorario FH on F.idFuncion = FH.idFuncion
                    INNER JOIN formato FO on F.idTipoFuncion = FO.idTipoFuncion 
                    WHERE F.idPelicula='$id'
                    and F.fechaBaja ='0000-00-00 00:00:00'"; 

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
    
    public function getPeliculaFuncionByNombre($id){
              
        $query = "SELECT 
                    F.idComplejo,
                    C.nombre as nombreComplejo, 
                    F.idTipoFuncion,
                    FH.dia,
                    FH.horario,
                    FO.idFormato,
                    FO.descripcion as formato, 
                    FO.subtitulada,
                    FH.idFuncionDetalle    
                    FROM funcion F
                    INNER JOIN complejo C on F.idComplejo = C.idComplejo
                    INNER JOIN pelicula P on F.idPelicula = P.idPelicula
                    INNER JOIN funcionhorario FH on F.idFuncion = FH.idFuncion
                    INNER JOIN formato FO on F.idTipoFuncion = FO.idTipoFuncion 
                    WHERE P.titulo='$id'
                    and F.fechaBaja ='0000-00-00 00:00:00'"; 

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
        /*$query = "SELECT idFuncion,
                        CONCAT(c.titulo ,' - ' ,f.descripcion,' - ',case subtitulada when 0 then 'Español' else 'Subtitulada' end ) AS titulo
                    FROM peliculacomplejo a
                    INNER JOIN complejo b on b.idComplejo=a.idComplejo
                    INNER JOIN pelicula c on a.idPelicula=c.idPelicula
                    INNER JOIN funcion  d on d.idPelicula=c.idPelicula and d.idComplejo=a.idComplejo
                    INNER JOIN formato f on f.idTipoFuncion=d.idTipoFuncion
                    WHERE b.idComplejo = '$idComplejo' 
                    AND (c.fechaBaja = 0 or c.fechaBaja>now())
                    AND (d.fechaBaja = 0 or d.fechaBaja>now()) ";*/
            
        $query = "SELECT 
                        DISTINCT CONCAT(P.titulo ,' - ' ,FO.descripcion,' - ',case FO.subtitulada when 0 then 'Español' else 'Subtitulada' end ) AS titulo
                    FROM funcion F
                    INNER JOIN complejo C on F.idComplejo = C.idComplejo
                    INNER JOIN pelicula P on F.idPelicula = P.idPelicula
                    INNER JOIN formato FO on F.idTipoFuncion = FO.idTipoFuncion 
                    WHERE C.idComplejo = '$idComplejo' 
                    AND (P.fechaBaja = 0 or P.fechaBaja>now())
                    AND (F.fechaBaja = 0 or F.fechaBaja>now()) ";
             
                   
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
    
    public function getDiasxPeliculaxComplejo($datos){
        $idComplejo = $this->connection->real_escape_string($datos['idComplejo']);
        $pelicula = $this->connection->real_escape_string($datos['pelicula']);
        
        /*$query = "SELECT distinct dia
                    FROM funcionhorario a
                    WHERE idFuncion = '$id'";*/
        
        $query = "SELECT distinct FH.dia
                    FROM pelicula P
                    INNER JOIN funcion F ON P.idPelicula = F.idPelicula
                    INNER JOIN funcionhorario FH ON F.idFuncion = FH.idFuncion
                    INNER JOIN formato FO on F.idTipoFuncion = FO.idTipoFuncion
                    INNER JOIN complejo C on F.idComplejo = C.idComplejo
                    WHERE CONCAT(P.titulo ,' - ' ,FO.descripcion,' - ',case FO.subtitulada when 0 then 'Español' else 'Subtitulada' end ) = '$pelicula'
                    AND C.idComplejo = '$idComplejo' ";

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
        $idComplejo = $this->connection->real_escape_string($datos['idComplejo']);
        $pelicula = $this->connection->real_escape_string($datos['pelicula']);
        $dia = $datos['dia'];
         
        /*$query = "SELECT idFuncionDetalle,horario 
                    FROM funcionhorario
                    WHERE idFuncion = $idFuncion 
                    AND dia = '$dia'";*/

        $query = "SELECT FH.idFuncionDetalle,
                         FH.horario
                    FROM pelicula P
                    INNER JOIN funcion F ON P.idPelicula = F.idPelicula
                    INNER JOIN funcionhorario FH ON F.idFuncion = FH.idFuncion
                    INNER JOIN formato FO on F.idTipoFuncion = FO.idTipoFuncion
                    INNER JOIN complejo C on F.idComplejo = C.idComplejo
                    WHERE CONCAT(P.titulo ,' - ' ,FO.descripcion,' - ',case FO.subtitulada when 0 then 'Español' else 'Subtitulada' end ) = '$pelicula'
                    AND FH.dia = '$dia'
                    AND C.idComplejo = '$idComplejo' ";

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
      
        $query ="SELECT pel.idPelicula,pel.titulo,pel.duracion,frm.descripcion,frm.subtitulada,frm.idTipoFuncion 
                    FROM pelicula pel
                    INNER JOIN formato frm ON pel.idFormato = frm.idFormato
                    WHERE pel.fechaBaja='0000-00-00 00:00:00'
                    AND estreno < '$fechaSemana'
                    ORDER BY fechaAlta";
     
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