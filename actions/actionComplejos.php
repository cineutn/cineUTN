<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function nuevoComplejo($request){
    require("../models/complejos.php");
    $c = new Complejos();
    $complejo = array();
    $complejo["idComplejo"] = $request->idComplejo;
    $complejo["idZona"] = 0;
    $complejo["nombreComplejo"] = $request->nombreComplejo;
    $complejo["direccionComplejo"] = $request->direccionComplejo;
    $complejo["descripcionComplejo"] = $request->descripcionComplejo;
    if($nuevo = $c->createComplejo($complejo)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Complejo creado con exito. ",
            "data" => $nuevo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear  el Complejo"
        ));
    }
}

function modificarComplejo($request){
    require("../models/complejos.php");
    $c = new Complejos();
    $complejo = array();
    $complejo["idComplejo"] = $request->idComplejo;
    $complejo["idZona"] = 0;
    $complejo["nombreComplejo"] = $request->nombreComplejo;
    $complejo["direccionComplejo"] = $request->direccionComplejo;
    $complejo["descripcionComplejo"] = $request->descripcionComplejo;
    if($c->updateComplejo($complejo)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Complejo actualizado con exito. "
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error ..."
        ));
    }
}

function eliminarComplejo($request){
    require("../models/complejos.php");
    $c = new Complejos();
    $complejoId = $request->idComplejo;
    if($c->removeComplejo($complejoId)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Complejo eliminado"
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al eliminar el complejo."
        ));
    }
}

function obtenerComplejo($request){
    require("../models/complejos.php");
    $c = new Complejos();
    if($complejos = $c->getComplejos()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $complejos
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener complejos. "
        ));
    }
}

function validarNombre($request){
    require("../models/complejos.php");
    $c = new Complejos();
    $complejo = array();
    $complejo["idComplejo"] = $request->idComplejo;
    $complejo["nombreComplejo"] = $request->nombreComplejo;
    if($complejos = $c->validateNombreComplejo($complejo)){
        sendResponse(array(
            "error" => true,
            "mensaje" => "El nombre ingresado ya se encuentra en uso",
            "data" => $complejos
        ));
    }else{
        sendResponse(array(
            "error" => false,
            "mensaje" => ""
        ));
    }
}

function guardarArchivo($file, $imgId){
    $uploaddir = "../files/complejos/";
    $imgDir = $uploaddir . $imgId;
    if(mkdir($imgDir, 0777, true)){
        return move_uploaded_file($file['tmp_name'], $imgDir . "/" . $file['name']);
    }else{
        return move_uploaded_file($file['tmp_name'], $imgDir . "/" . $file['name']);
    }
    return false;
}

function subir($request){
    require("../models/complejos.php");
    
    if(!empty($_FILES)){ 
        
        $imgFile = $_FILES[0];
        $imgData = new Complejos();
        $idComplejo = $request->idComplejo;
        
        $result = $imgData->addImage(array(
            "id" => $idComplejo,
            "path" => "files/complejos/".$idComplejo ,
            "file_name" => $imgFile['name']
        )); 
        
        if($result){
            if(guardarArchivo($imgFile, $idComplejo)){
                sendResponse(array(
                    "error" => false,
                    "mensaje" => "Imagen guardada"
                ));
            }else{
                //TODO: eliminar de la base la imagen creada para consistencia con fileSistem
                sendResponse(array(
                    "error" => true,
                    "mensaje" => "Error al guardar imagen en disco"
                ));
            }
        }else{
            sendResponse(array(
                "error" => true,
                "mensaje" => "Error al guardar imagen en db"
            ));
        }
        
    }else{

        sendResponse(array(
            "error" => true,
            "mensaje" => "No se ha enviado ninguna imagen",
            "get" => json_encode($_GET),
            "post" => json_encode($_POST),
            "files" => json_encode($_FILES)  ));
    }
    
   
}

$request = new Request();
$action = $request->action;
switch($action){
    case "subir":
        subir($request);
        break;                
    case "nuevo":
        nuevoComplejo($request);
        break;
    case "modificar":
        modificarComplejo($request);
        break;
    case "eliminar":
        eliminarComplejo($request);
        break;
    case "obtener":
        obtenerComplejo($request);
        break;
    case "validar":
        validarNombre($request);
        break;
    default:
        obtenerComplejo($request);
        break;
}
