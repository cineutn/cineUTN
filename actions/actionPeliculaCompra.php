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
    $idFormato=$request->idFormato;
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


$request = new Request();
$action = $request->action;
switch($action){       
    case "obtener":
        obtenerFuncionDetalle($request);
        break;
    case "obtenerPrecios":
        obtenerPrecioFuncion($request);
        break;
}
