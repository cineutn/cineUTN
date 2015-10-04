<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
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


$request = new Request();
$action = $request->action;
switch($action){   
    case "subir":
        subir($request);
        break;              
    case "nueva":
        nuevaPelicaula($request);
        break;
}
