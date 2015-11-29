<?php

require("../utils/request.php");

function sendResponse($response){
    echo json_encode($response);
}

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}


function getUsuarios(){
    require("../models/tabla.php");
    $c = new Tabla();
   
    if($usuarios = $c->getUsuarios()){
		 sendResponse(array(
            "data" => $usuarios
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener peliculas. "
        ));
    }  
}
function getPersonal($request){
    require("../models/tabla.php");
    $c = new Tabla();
    
     $ar = array();
    $ar["idComplejo"] = $request->idComplejo;
   
    if($usuarios = $c->getPersonal($ar)){
		 sendResponse(array(
            "data" => $usuarios
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener peliculas. "
        ));
    }  
}
function getAdmins(){
    require("../models/tabla.php");
    $c = new Tabla();
    
       
    if($usuarios = $c->getAdmins()){
		 sendResponse(array(
            "data" => $usuarios
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener Administradores. "
        ));
    }  
}

function setState($request){
    require("../models/tabla.php");
    $s = new Tabla();
    	
    $state = array();
    $state["id"] = $request->id;
    $state["state"] = $request->newstate;
    
    if($res = $s->setState($state)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $res
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error"
        ));
    }
}
function getRecaudacionPelicula($request){
    require("../models/tabla.php");
    $s = new Tabla();
    	
    $fechas = array();
    $fechas["fInicio"] = $request->fInicio;
    $fechas["fFin"] = $request->fFin;
    
    if($res = $s->getRecaudacionPelicula($fechas)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $res
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error"
        ));
    }
}

function deletePersonal($request){
    require("../models/tabla.php");
    $s = new Tabla();
    	
    $state = array();
    $state["id"] = $request->id;
    
    
    if($res = $s->deletePersonal($state)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $res
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error"
        ));
    }
}

$request = new Request();
$action = $request->action;
switch($action){
    case "getUsuarios":
        getUsuarios();
        break;
    case "setState":
        setState($request);
        break;    
    case "getPersonal":
        getPersonal($request);
        break;
    case "deletePersonal":
        deletePersonal($request);
        break; 
    case "getAdmins":
        getAdmins();
        break;     
    case "getRecaudacionPelicula":
        getRecaudacionPelicula($request);
        break;     
        
    
}
