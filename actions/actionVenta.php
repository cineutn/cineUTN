<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function realizarVenta($request){
    require("../models/ventas.php");
    $c = new Ventas();
    $venta = array();   
    $venta["idVenta"] = $request->idPrecio;
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

$request = new Request();
$action = $request->action;
switch($action){             
    case "vender":
        realizarVenta($request);
        break;
    
}