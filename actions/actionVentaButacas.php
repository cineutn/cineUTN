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

function obtenerButaca($request){
    require("../models/ventaButacas.php");
    $p = new VentaButacas();
    $idSalaFuncion=$request->idSalaFuncion;
    if($butaca = $p->getButaca($idSalaFuncion)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $butaca
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener la butaca. "
        ));
    }
}

function reservarButaca($request){
	require("../models/ventaButacas.php");
    $b = new ventaButacas();
      
	$salaFuncionID = $request->idSalaFuncion;	
    $habilitada = $request->hanilitada;	
						  
    if($nuevo = $b->updateButaca($salaFuncionID,$habilitada)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "pelicula creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear  el pelicula"
        ));
    }
}



$request = new Request();
$action = $request->action;
switch($action){       
    case "obtener":
        obtenerFuncionSala($request);
        break;
     case "butaca":
        obtenerButaca($request);
        break;
    case "reservar":
        reservarButaca($request);
        break;
   
}
