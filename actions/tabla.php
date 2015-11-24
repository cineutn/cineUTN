<?php

require("../utils/request.php");

function sendResponse($response){
    echo json_encode($response);
}

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}


function getUsuarios($request){
    require("../models/tabla.php");
    $c = new Tabla();
   
    if($c->getUsuarios()){
		 sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $c
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener peliculas. "
        ));
    }
    
    
}


$request = new Request();
$action = $request->action;
switch($action){
    case "getUsuarios":
        getUsuarios();
        break;
    case "getPersonal":
        redirecRegistro();
        break;
    
}
