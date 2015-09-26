<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function nuevoTweet($request){
    require("../models/comentario.php");
    $c = new Comentario();
    $comentario = array();
    $comentario["usuarioID"] = $request->usuarioID;
    $comentario["tweet"] = $request->tweet;
    $comentario["fecha"] = $request->fecha;
    if($nueva = $c->createComentario($comentario)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Comentario creado",
            "data" => $nueva
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al crear comentario"
        ));
    }
}

function modificarTweet($request){
    require("../models/comentario.php");
    $c = new Comentario();
    $comentario = array();
    $comentario["comentarioid"] = $request->comentarioid;
    $comentario["usuarioID"] = $request->usuarioID;
    $comentario["tweet"] = $request->tweet;
    $comentario["fecha"] = $request->fecha;
    if($c->updateComentario($comentario)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Comentario actualizado"
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error ..."
        ));
    }
}

function eliminarTweet($request){
    require("../models/comentario.php");
    $c = new Comentario();
    $comentarioId = $request->id;
    if($c->removeComentario($comentarioId)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "Comentario eliminado"
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error ..."
        ));
    }
}

function obtenerTweets($request){
    require("../models/comentario.php");
    $c = new Comentario();
    if($comentarios = $c->getComentarios()){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $comentarios
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener comentarios. "
        ));
    }
}

function obtenerCantidadTweets($request){
    require("../models/comentario.php");
    $c = new Comentario();
    $id = $request->id;
    if($cantidad = $c->getCantidad($id)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $cantidad
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener la cantidad de tweets."
        ));
    }
}

$request = new Request();
$action = $request->action;
switch($action){
    case "nuevo":
        nuevoTweet($request);
        break;
    case "modificar":
        modificarTweet($request);
        break;
    case "eliminar":
        eliminarTweet($request);
        break;
    case "obtener":
        obtenerTweets($request);
        break;
     case "obtenerCantidad":
        obtenerCantidadTweets($request);
        break;
    default:
        obtenerTweets($request);
        break;
}
