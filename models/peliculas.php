<?php
require("connection.php");

class Peliculas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 

	
	public function addImage($imagen){
        $PeliculaID = $this->connection->real_escape_string($imagen['id']);
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
        }
    }
	
	
	    public function getPeliculas(){
        $query = "SELECT * FROM pelicula";  
       
        $peliculas = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $peliculas[] = $fila;
            }
            $result->free();
        }
        return $peliculas;
    }   

	
	
	
    public function createPelicula($pelicula){        
		$id = $this->connection->real_escape_string($pelicula['idPelicula']);
        $tituloPelicula = $this->connection->real_escape_string($pelicula['tituloPelicula']);
		$duracionPelicula = $this->connection->real_escape_string($pelicula['duracionPelicula']);
		$clasificacionPelicula = $this->connection->real_escape_string($pelicula['clasificacionPelicula']);
		$generoPelicula = $this->connection->real_escape_string($pelicula['generoPelicula']);							        
        $sinopsisPelicula = $this->connection->real_escape_string($pelicula['sinopsisPelicula']);
		$imagenPelicula = $this->connection->real_escape_string($pelicula['imagenPelicula']);	
		$trailerPelicula = $this->connection->real_escape_string($pelicula['trailerPelicula']);
		$actoresPelicula = $this->connection->real_escape_string($pelicula['actoresPelicula']);
		$directorPelicula = $this->connection->real_escape_string($pelicula['directorPelicula']);	
		$fechaEstrenoPelicula = $this->connection->real_escape_string($pelicula['fechaEstrenoPelicula']);
		
        $query = "INSERT INTO pelicula (idPelicula,titulo,duracion,clasificacion,genero,estreno,fechaAlta,sinopsis,imagen,trailer,actores,director) VALUES (                    
					DEFAULT,
                    '$tituloPelicula',
					'$duracionPelicula',										
					'$clasificacionPelicula',
					'$generoPelicula',
					'$fechaEstrenoPelicula',
                     SYSDATE(),							
					'$sinopsisPelicula',					
                    '$imagenPelicula',
					'$trailerPelicula',
					'$actoresPelicula',
					'$directorPelicula')";
        if($this->connection->query($query)){
              $pelicula['idPelicula'] = $this->connection->insert_id;
            return $pelicula;
        }else{
            return false;
        }
    }



}