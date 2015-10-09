<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}


function obtenerFuncionSala($request){
    require("../models/ventaButacas.php");
    $p = new VentaButacas();
    $idFuncion=$request->idFuncion;
    if($sala = $p->getFuncionSala($idFuncion)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $sala
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener la sala de la funcion. "
        ));
    }
}


$request = new Request();
$action = $request->action;
switch($action){       
    case "obtener":
        obtenerFuncionSala($request);
        break;
   
}
