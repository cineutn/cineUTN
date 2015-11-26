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
	$sala["idComplejo"] = $request->idComplejo;
					  
					  
					  
    if($nuevo = $s->createSala($sala)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "sala creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear sala"
        ));
    }
}

function obtenerSalas($request){
    require("../models/salas.php");
    $s = new Salas();
    $sala = array();    
	$sala["idComplejo"] = $request->idComplejo;	
     $s = new Salas();
    if($salas = $s->getSalas($sala)){
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
 
function eliminarSala($request){
    require("../models/salas.php");
    $s = new Salas();
    $sala = array();    
	$sala["idSala"] = $request->idSala;	
					  
    if($nuevo = $s->eliminarSala($sala)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "sala eliminada con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al eliminar sala"
        ));
    }
}

//este metodo solo trae una sala, la obtiene por id
function obtenerSala($request){
    require("../models/salas.php");
    $s = new Salas();
    $sala = array();    
	$idSala = $request->idSala;	
    
    if($nuevo = $s->obtenerSala($idSala)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "sala .",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener sala"
        ));
    }
					  
}

function validarFuncionesExistentes($request){
    require("../models/salas.php");
    $s = new Salas();
    $sala = array();    
	$idSala = $request->idSala;	
    
    if($nuevo = $s->validarFunciones($idSala)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "sala .",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al validar funciones"
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
    case "eliminar":
        eliminarSala($request);
        break;
    case "obtenerUna":
        obtenerSala($request);
        break;
    case "validar":
        validarFuncionesExistentes($request);
        break; 
}
