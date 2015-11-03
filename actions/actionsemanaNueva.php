<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}


function obtenerNumeroSemanas($request){
    require("../models/semanas.php");
     $s = new Semanas();
    if($semanas = $s->getNumeroSemanas()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $semanas
        ));
     }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener semanas. "
        ));
    }
}
 
function obtenerUltimaSemanas($request){
    require("../models/semanas.php");
     $s = new Semanas();
    if($semanas = $s->getUltimaSemana()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $semanas
        ));
     }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener ultima semana. "
        ));
    }
}

function nuevaSemana($request){
    require("../models/semanas.php");
    $s = new Semanas();
    $semana = array();    	
    $semana["fecha"] = $request->fecha;
	$semana["numeroSemana"] = $request->numeroSemana;
    $semana["dias"] = $request->dias;
	
    if($nuevo = $s->addSemana($semana)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $nuevo
        ));
     }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al insertar ultima semana. "
        ));
    }
}
    
$request = new Request();
$action = $request->action;
switch($action){                      
    case "obtenerNumerosemanas":
        obtenerNumeroSemanas($request);
        break; 
    case "obtenerUltima":
        obtenerUltimaSemanas($request);
        break;        
   case "nueva":
        nuevaSemana($request);
        break;
        
        
}
