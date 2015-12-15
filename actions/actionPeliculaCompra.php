<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}


function obtenerFuncionDetalle($request){
    require("../models/peliculaCompra.php");
    $p = new PeliculaCompra();
    $idFuncion=$request->idFuncion;
    if($pagina = $p->getFuncionDetalle($idFuncion)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $pagina
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener el detalle de funcion. "
        ));
    }
}


function obtenerPrecioFuncion($request){
    require("../models/peliculaCompra.php");
    $p = new PeliculaCompra();
    $idFormato=$request->tipoFuncionID;
    if($pagina = $p->getPreciosPorFormato($idFormato)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $pagina
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener el detalle de precios. "
        ));
    }
}

function obtenerButacasLibres($request){
    require("../models/peliculaCompra.php");
    $p = new PeliculaCompra();
    $idFuncionDetalle=$request->idFuncionDetalle;
    if($pagina = $p->getButacasLibres($idFuncionDetalle)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $pagina
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener butacas libres. "
        ));
    }
}


$request = new Request();
$action = $request->action;
switch($action){       
    case "obtener":
        obtenerFuncionDetalle($request);
        break;
    case "obtenerPrecios":
        obtenerPrecioFuncion($request);
        break;
    case "obtenerButacasLibres":
        obtenerButacasLibres($request);
        break;        
        
        
}
