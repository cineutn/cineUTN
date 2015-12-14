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
   
    $usuarios = $c->getUsuarios();
		 sendResponse(array(
            "data" => $usuarios
        ));
    
}
function getPersonal($request){
    require("../models/tabla.php");
    $c = new Tabla();
    
     $ar = array();
    $ar["idComplejo"] = $request->idComplejo;
   
    $usuarios = $c->getPersonal($ar);
		 sendResponse(array(
            "data" => $usuarios
        ));
    
}
function getAdmins(){
    require("../models/tabla.php");
    $c = new Tabla();
    
       
    $usuarios = $c->getAdmins();
		 sendResponse(array(
            "data" => $usuarios
        ));
      
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
function getReporte($request){
    require("../models/tabla.php");
    $s = new Tabla();
    $res = array();	
    $arr = array();
    $arr["fInicio"] = $request->fInicio;
    $arr["fFin"] = $request->fFin;
    $arr["tipoReporte"] = $request->tipoReporte;
    $arr["idcomplejo"] = $request->idcomplejo;
    
    if($res = $s->getReporte($arr)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $res
        ));
    }else{
        sendResponse(array(
            "error" => false,
            "mensaje" => "Error" ,
            "data" => $res
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
    case "getReporte":
        getReporte($request);
        break;     
        
    
}
