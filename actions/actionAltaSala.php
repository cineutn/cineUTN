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

$request = new Request();
$action = $request->action;
switch($action){                  
    case "nueva":
        nuevaSala($request);
        break;   
}
