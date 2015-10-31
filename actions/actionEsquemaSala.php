<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function nuevaSalaDetalle($request){
	require("../models/salaDetalle.php");
    $s = new SalaDetalle();
    $sala = array();    
	//$sala["idSalaDetalle"] = $request->idSalaDetalle;
    $sala["idSala"] = $request->idSala;	
	$sala["fila"] = $request->fila;  
	$sala["columna"] = $request->columna;
					  
    if($nuevo = $s->createSalaDetalle($sala)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "detalle de sala creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear detalle de sala"
        ));
    }
}


function eliminarSalaDetalle($request){
    require("../models/salaDetalle.php");
    $s = new SalaDetalle();
    $sala = array();    
	$sala["idSala"] = $request->idSala;	
					  
    if($nuevo = $s->eliminarSalaDetalle($sala)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Detallae de sala eliminada con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al eliminar detalle sala"
        ));
    }
}

    
$request = new Request();
$action = $request->action;
switch($action){                  
    case "nueva":
        nuevaSalaDetalle($request);
        break;      
    case "eliminar":
        eliminarSalaDetalle($request);
        break;      
}
