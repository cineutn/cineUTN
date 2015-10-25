<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function nuevaSala($request){
	require("../models/salas.php");
    $s = new Salas();
    $sala = array();    
	$sala["idSala"] = $request->idSala;
	$sala["nombreSala"] = $request->nombreSala;
	$sala["filas"] = $request->filas;  
	$sala["columnas"] = $request->columnas;
					  
    if($nuevo = $s->createSala($sala)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "sala creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear  el sala"
        ));
    }
}

function obtenerSalas($request){
    require("../models/salas.php");
     $s = new Salas();
    if($salas = $s->getSalas()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $salas
        ));
     }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener salas. "
        ));
    }
}
    
$request = new Request();
$action = $request->action;
switch($action){                  
    case "nueva":
        nuevaSala($request);
        break;   
    case "obtener":
        obtenerSalas($request);
        break;   
}
