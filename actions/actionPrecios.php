<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function validarDescripcion($request){
    require("../models/precios.php");
    $c = new Precios();
    $precio = array();   
    $precio["idPrecio"] = $request->idPrecio;
    $precio["formato"] = $request->formato;
    $precio["descripcionPrecio"] = $request->descripcionPrecio;  
    if($nuevo = $c->validateDescripcionPrecio($precio)){
        sendResponse(array(
            "error" => true,
            "mensaje" => "La descripcion ingresada ya se encuentra en uso",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => false,
            "mensaje" => ""
        ));
    }
}

function nuevoPrecio($request){
    require("../models/precios.php");
    $c = new Precios();
    $precio = array();   
    $precio["idPrecio"] = $request->idPrecio;
    $precio["formato"] = $request->formato;
    $precio["descripcionPrecio"] = $request->descripcionPrecio;
    $precio["valorPrecio"] = $request->valorPrecio;   
    if($nuevo = $c->createPrecio($precio)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Precio creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear el Precio"
        ));
    }
}

function modificarPrecio($request){
    require("../models/precios.php");
    $c = new Precios();
    $precio = array();
    $precio["idPrecio"] = $request->idPrecio;
    $precio["formato"] = $request->formato;
    $precio["descripcionPrecio"] = $request->descripcionPrecio;
    $precio["valorPrecio"] = $request->valorPrecio; 
    if($c->updatePrecio($precio)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "precio actualizado con exito. "
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error ..."
        ));
    }
}

function eliminarPrecio($request){
    require("../models/precios.php");
    $c = new Precios();
    $precioId = $request->idPrecio;
    if($c->removePrecio($precioId)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "precio eliminado"
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error ..."
        ));
    }
}

function obtenerPrecios($request){
    require("../models/precios.php");
    $c = new Precios();
    if($precios = $c->getPrecios()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $precios
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener precios. "
        ));
    }
}

function obtenerDetallePrecio($request){
    require("../models/precios.php");
    $c = new Precios();
    $idPrecio = $request->idPrecio;
    if($precio = $c->getDetallePrecio($idPrecio )){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $precio
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener detalle del precio. "
        ));
    }
}

function obtenerFormatos($request){
    require("../models/precios.php");
    $c = new Precios();
    if($formatos = $c->getFormatos()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $formatos
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener precios. "
        ));
    }
}

$request = new Request();
$action = $request->action;
switch($action){             
    case "nuevo":
        nuevoPrecio($request);
        break;
    case "modificar":
        modificarPrecio($request);
        break;
    case "eliminar":
        eliminarPrecio($request);
        break;
    case "obtener":
        obtenerPrecios($request);
        break;
    case "obtenerFormatos":
        obtenerFormatos($request);
        break;
    case "detalle":
        obtenerDetallePrecio($request);
        break;
    case "validar":
        validarDescripcion($request);
        break;
    default:
        obtenerPrecios($request);
        break;
}
