<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function validarEmpresa($request){
    require("../models/tarjetas.php");
    $c = new Tarjetas();
    $tarjeta = array();
    $tarjeta["idTarjeta"] = $request->idTarjeta;
    $tarjeta["empresa"] = $request->empresa;
    if($nuevo = $c->validateEmpresaTarjeta($tarjeta)){
        sendResponse(array(
            "error" => true,
            "mensaje" => "La empresa ingresada ya se encuentra en uso",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => false,
            "mensaje" => ""
        ));
    }
}

function nuevaTarjeta($request){
    require("../models/tarjetas.php");
    $c = new Tarjetas();
    $tarjeta = array();
    $tarjeta["idTarjeta"] = $request->idTarjeta;
    $tarjeta["empresa"] = $request->empresa;
    $tarjeta["codigoSeguridad"] = $request->codigoSeguridad;
    $tarjeta["cantNumeros"] = $request->cantNumeros;  
    if($nuevo = $c->createTarjeta($tarjeta)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Tarjeta creada con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear la tarjeta. "
        ));
    }
}

function modificarTarjeta($request){
    require("../models/tarjetas.php");
    $c = new Tarjetas();
    $tarjeta = array();
    $tarjeta["idTarjeta"] = $request->idTarjeta;
    $tarjeta["empresa"] = $request->empresa;
    $tarjeta["codigoSeguridad"] = $request->codigoSeguridad;
    $tarjeta["cantNumeros"] = $request->cantNumeros; 
    if($c->updateTarjeta($tarjeta)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "tarjeta actualizada con exito. "
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error ..."
        ));
    }
}

function eliminarTarjeta($request){
    require("../models/tarjetas.php");
    $c = new Tarjetas();
    $idTarjeta = $request->idTarjeta;
    if($c->removeTarjeta($idTarjeta)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "tarjeta eliminada"
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error ..."
        ));
    }
}

function obtenerTarjetas($request){
    require("../models/tarjetas.php");
    $c = new Tarjetas();
    if($tarjetas = $c->getTarjetas()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $tarjetas
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener Tarjetas. "
        ));
    }
}

function obtenerDatos($request){
    require("../models/tarjetas.php");
    $c = new Tarjetas();
    $idTarjeta = $request->idTarjeta;
    if($tarjeta = $c->getDatosTarjeta($idTarjeta)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $tarjeta
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener Tarjeta. "
        ));
    }
}


$request = new Request();
$action = $request->action;
switch($action){       
    case "nuevo":
        nuevaTarjeta($request);
        break;
    case "modificar":
        modificarTarjeta($request);
        break;
    case "eliminar":
        eliminarTarjeta($request);
        break;
    case "obtener":
        obtenerTarjetas($request);
        break;
    case "obtenerDatos":
        obtenerDatos($request);
        break;
    case "validar":
        validarEmpresa($request);
        break;
    default:
        obtenerTarjetas($request);
        break;
}
