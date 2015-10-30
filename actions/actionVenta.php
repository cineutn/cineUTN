<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function obtenerVenta($request){
    require("../models/ventas.php");
    $c = new Ventas();
    $codigo  = $request->codigo;
    if($venta = $c->getVenta($codigo)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $venta
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener la venta. "
        ));
    }
}

function realizarVenta($request){
    require("../models/ventas.php");
    $c = new Ventas();
    $venta = array();   
    $venta["idVenta"] = $request->idVenta;
    $venta["monto"] = $request->monto;
    $venta["tipoVenta"] = $request->tipoVenta;
    $venta["idVendedor"] = $request->idVendedor;   
    $venta["idCliente"] = $request->idCliente;
    $venta["fecha"] = $request->fecha;   
    $venta["codigo"] = $request->codigo; 
    if($nuevo = $c->createVenta($venta)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "la venta se realizo con exito",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al realizar venta. "
        ));
    }
}

function realizarVentaDetalle($request){
    require("../models/ventas.php");
    $c = new Ventas();
    $ventaDetalle = array();   
    $ventaDetalle["idVenta"] = $request->idVenta;
    $ventaDetalle["idButaca"] = $request->idButaca;
    $ventaDetalle["precio"] = $request->precio;
    if($nuevo = $c->createVentaDetalle($ventaDetalle)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "El detalle de la venta se inserto con exito",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al insertar el detalle de la venta. "
        ));
    }
}

function obtenerButacas($request){
    require("../models/ventas.php");
    $c = new Ventas();
    $idVenta  = $request->idVenta;
    if($butacas = $c->getVentaButaca($idVenta)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $butacas
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener las butacas vendidas. "
        ));
    }
}

$request = new Request();
$action = $request->action;
switch($action){             
    case "vender":
        realizarVenta($request);
        break;
    case "venderDetalle":
        realizarVentaDetalle($request);
        break;
    case "obtener":
        obtenerVenta($request);
        break;
    case "obtenerButacas":
        obtenerButacas($request);
        break;
    
}