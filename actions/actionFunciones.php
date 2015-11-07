<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}


function nuevaFuncion($request){
	require("../models/funciones.php");
    $f = new Funciones();
    $funcion = array();    
	$funcion["idFuncion"] = $request->idFuncion;
	$funcion["idPelicula"] = $request->idPelicula;
	$funcion["idIdioma"] = $request->idIdioma;
	$funcion["idTipoFuncion"] = $request->idTipoFuncion;
	$funcion["estado"] = $request->estado;
	$funcion["fechaAlta"] = $request->fechaAlta;
	$funcion["idComplejo"] = $request->idComplejo;
					  
    if($nuevo = $f->createFuncion($funcion)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "funcion creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear funcion"
        ));
    }
}

function nuevaFuncionHorario($request){
	require("../models/funciones.php");
    $f = new Funciones();
    $funcion = array();    
	$funcion["idFuncionDetalle"] = $request->idFuncionDetalle;
	$funcion["idFuncion"] = $request->idFuncion;
	$funcion["idSala"] = $request->idSala;
	$funcion["dia"] = $request->dia;
	$funcion["horario"] = $request->horario;
	$funcion["idSemana"] = $request->idSemana;
					  
    if($nuevo = $f->createFuncionHorario($funcion)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "horarrio creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear horario"
        ));
    }
}
    
$request = new Request();
$action = $request->action;
switch($action){                  
    case "nueva":
        nuevaFuncion($request);
      break;  
    case "nuevoHorario":
        nuevaFuncionHorario($request);
      break;  
        
}
