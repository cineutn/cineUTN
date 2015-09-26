|<?php

require("../utils/request.php");

function sendResponse($response){
    echo json_encode($response);
    //die();
}

function guardarArchivo($file, $imgId){
    $uploaddir = "../files/";
    $imgDir = $uploaddir . $imgId;
    if(mkdir($imgDir, 0777, true)){
        return move_uploaded_file($file['tmp_name'], $imgDir . "/" . $file['name']);
    }else{
        return move_uploaded_file($file['tmp_name'], $imgDir . "/" . $file['name']);
    }
    return false;
}

function subir($request){
    require("../models/imagen.php");
    
    if(!empty($_FILES)){ 
        
        $imgFile = $_FILES[0];
        $imgData = new Imagen();
        $usuarioid = isset($_COOKIE["usuarioid"]) ? $_COOKIE["usuarioid"] : null;
        
        $result = $imgData->create(array(
            "id" => $usuarioid,
            "path" => "files/".$usuarioid ,
            "file_name" => $imgFile['name']
        )); 
        
        if($result){
            if(guardarArchivo($imgFile, $usuarioid)){
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
    }
    
    sendResponse(array(
        "error" => true,
        "mensaje" => "No se ha enviado ninguna imagen",
        "get" => json_encode($_GET),
        "post" => json_encode($_POST),
        "files" => json_encode($_FILES),
    ));
}


function listar(){
    require("../models/imagen.php");
    $img = new Imagen();
    if($imagenes = $img->getAll()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $imagenes
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener imágenes"
        ));
    }
}

$request = new Request();
$action = $request->action;
switch($action){
    case "subir":
        subir($request);
        break;        
    case "listar":
        listar();
        break;
    default:
        sendResponse(array(
            "error" => true,
            "mensaje" => "Request mal formado"
        ));
        break;
}