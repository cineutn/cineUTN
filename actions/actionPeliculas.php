<?php
require("../utils/request.php");
function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}
function sendResponse($response){
    echo json_encode($response);
}
function obtenerPeliculas($request){
    require("../models/peliculas.php");
    $p = new Peliculas();
    if($peliculas = $p->getPeliculas()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $peliculas
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener peliculas. "
        ));
    }
}
function obtenerPeliculasCartelera($request){
    require("../models/peliculas.php");
    $p = new Peliculas();
    if($peliculas = $p->getPeliculasCartelera()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $peliculas
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener peliculas. "
        ));
    }
}
function nuevaPelicaula($request){
	require("../models/peliculas.php");
    $p = new Peliculas();
    $pelicula = array();    
	$pelicula["idPelicula"] = $request->idPelicula;
	$pelicula["tituloPelicula"] = $request->tituloPelicula;  
	$pelicula["duracionPelicula"] = $request->duracionPelicula;
	$pelicula["clasificacionPelicula"] = $request->clasificacionPelicula;
	$pelicula["generoPelicula"] = $request->generoPelicula;  	
	$pelicula["fechaBajaPelicula"] = $request->fechaBajaPelicula; 	
	$pelicula["sinopsisPelicula"] = $request->sinopsisPelicula; 
	$pelicula["imagenPelicula"] = $request->imagenPelicula;  
	$pelicula["trailerPelicula"] = $request->trailerPelicula;	
	$pelicula["actoresPelicula"] =$request->actoresPelicula;
	$pelicula["directorPelicula"] =$request->directorPelicula;
	$pelicula["fechaEstrenoPelicula"] =$request->fechaEstrenoPelicula;
					  
    if($nuevo = $p->createpelicula($pelicula)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "pelicula creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear  el pelicula"
        ));
    }
}
function subir($request){
    require("../models/peliculas.php");
    
    if(!empty($_FILES)){         
        $imgFile = $_FILES[0];
        $imgData = new Peliculas();
        $idPelicula = $request->idPelicula;
        
        $result = $imgData->addImage(array(
            "id" => $idPelicula,
            "path" => "files/peliculas/".$idPelicula ,
            "file_name" => $imgFile['name']
        )); 
        
        if($result){
            if(guardarArchivo($imgFile, $idPelicula)){
                sendResponse(array(
                    "error" => false,
                    "mensaje" => "Imagen guardada"
                ));
            }else{                
                sendResponse(array(
                    "error" => true,
                    "mensaje" => "Error al guardar imagen en disco"
                ));
            }
        }else{
            sendResponse(array(
                "error" => true,
                "mensaje" => "Error al guardar imagen en db"
            ));
        }        
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "No se ha enviado ninguna imagen",
            "get" => json_encode($_GET),
            "post" => json_encode($_POST),
            "files" => json_encode($_FILES)  ));
    }
}
function obtenerPeliculaById($request){
    require("../models/peliculas.php");
    $p = new Peliculas();
    try{
        if($pelicula = $p->getPeliculaByID($request->id)){
            sendResponse(array(
                "error" => false,
                "mensaje" => "",
                "data" => $pelicula
            ));
        }
    
    }
    catch(Exception $e){
        sendResponse(array(
            "error" => true,
            "mensaje" => 'Error al obtener la pelicula. ' . $e->getMessage()
        ));
    }
}
function obtenerPeliculaFuncionById($request){
    require("../models/peliculas.php");
    $p = new Peliculas();
    try{
        if($pelicula = $p->getPeliculaFuncionByID($request->id)){
            sendResponse(array(
                "error" => false,
                "mensaje" => "",
                "data" => $pelicula
            ));
        }   
    }
    catch(Exception $e){
        sendResponse(array(
            "error" => true,
            "mensaje" => 'Error al obtener la pelicula. ' . $e->getMessage()
        ));
    }
}
function obtenerPeliculaxComplejo($request){
    require("../models/peliculas.php");
    $p = new Peliculas();
    try{
        if($pelicula = $p->getPeliculaxComplejo($request->idComplejo)){
            sendResponse(array(
                "error" => false,
                "mensaje" => "",
                "data" => $pelicula
            ));
        }   
    }
    catch(Exception $e){
        sendResponse(array(
            "error" => true,
            "mensaje" => 'Error al obtener la pelicula. ' . $e->getMessage()
        ));
    }
}
function obtenerDiasxPeliculaxComplejo($request){
    require("../models/peliculas.php");
    $p = new Peliculas();
    try{
        if($pelicula = $p->getDiasxPeliculaxComplejo($request->idFuncion)){
            sendResponse(array(
                "error" => false,
                "mensaje" => "",
                "data" => $pelicula
            ));
        }   
    }
    catch(Exception $e){
        sendResponse(array(
            "error" => true,
            "mensaje" => 'Error al obtener la pelicula. ' . $e->getMessage()
        ));
    }
}
function obtenerHorariosxPeliculaxComplejo($request){
    require("../models/peliculas.php");
     $p = new Peliculas();
    
    $pelicula = array();    
	$pelicula["idFuncion"] = $request->idFuncion;
	$pelicula["dia"] = $request->dia; 
    
    
    try{
        if($horarios = $p->getHorariosxPeliculaxComplejo($pelicula)){
            sendResponse(array(
                "error" => false,
                "mensaje" => "",
                "data" => $horarios
            ));
        }   
    }
    catch(Exception $e){
        sendResponse(array(
            "error" => true,
            "mensaje" => 'Error al obtener la pelicula. ' . $e->getMessage()
        ));
    }
}


$request = new Request();
$action = $request->action;
switch($action){   
    case "subir":
        subir($request);
        break;              
    case "nueva":
        nuevaPelicaula($request);
        break;
    case "obtener":
        obtenerPeliculas($request);
        break;
    case "obtenerCartelera":
        obtenerPeliculasCartelera($request);
        break;
    case "obtenerPeliculaById":
        obtenerPeliculaById($request);
        break;
    case "obtenerPeliculaFuncionById":
        obtenerPeliculaFuncionById($request);
        break;
    case "obtenerPeliculaxComplejo":
        obtenerPeliculaxComplejo($request);
        break;    
    case "obtenerDiasxPeliculaxComplejo":
        obtenerDiasxPeliculaxComplejo($request);
        break;
    case "obtenerHorariosxPeliculaxComplejo":
        obtenerHorariosxPeliculaxComplejo($request);
        break;
        
       
        
         
        
}