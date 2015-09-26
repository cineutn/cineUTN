<?php

require("../utils/request.php");

function sendRensponse($response){  
  
  echo json_encode($response);
    
}

function validateUser($request){
   require("../models/usuarios.php");
    $user = new Usuario();
    $id = $request->idLogin;
    $password = $request->passwordLogin;
    if($user = $user->validateUser()){
        sendRensponse(array(
          "error" => false,
          "mensaje" => "",
          "data" => $user
        ));
    }else{
        sendRensponse(array(
          "error" => true,
          "mensaje" => "El usuario ingresado o la contraseña son incorrectos. "          
        ));
    }
}
 
function validateMail($request){
   require("../models/usuarios.php");
    $user = new Usuario();
    $mail = $request->mail;
    if($user = $user->validateMail($mail)){
        sendRensponse(array(
          "error" => true,
          "mensaje" => "¡Este mail ya está en uso!"
        ));
    }else{
        sendRensponse(array(
          "error" => false,
          "mensaje" => ""          
        ));
    }
}

function validateUserName($request){
   require("../models/usuarios.php");
    $user = new Usuario();
    $userName = $request->userName;
    if($user = $user->validateUserName($userName)){
        sendRensponse(array(
          "error" => true,
          "mensaje" => "¡Este nombre de usuario ya está en uso!"       
        ));
    }else{
        sendRensponse(array(
          "error" => false,
          "mensaje" => ""          
        ));
    }
}

function getUser($request){
    require("../models/usuarios.php");    
    $user = new Usuario();
    $id = $request->id;
    if($c = $user->getUser($id)){
      sendRensponse(array(
          "error" => false,
          "mensaje" => "",
          "data" => $c
        ));
    }else{
        sendRensponse(array(
          "error" => true,
          "mensaje" => "¡Error al obtener Usuario!",
        ));
    }
}

function getCantidad($request){
    require("../models/usuarios.php");    
    $user = new Usuario();
    if($cantidad = $user->getCantidad()){
      sendRensponse(array(
          "error" => false,
          "mensaje" => "",
          "data" => $cantidad
        ));
    }else{
        sendRensponse(array(
          "error" => true,
          "mensaje" => "¡Error al obtener cantidad de Usuarios!",
        ));
    }
}

$request = new Request();
$action = $request->action;
switch($action){
    case "nuevoUser":
        nuevoUser($request);
        break;
    case "validar":
        validateUser($request);
        break;
    case "validarMail":
        validateMail($request);
        break;
    case "validarUserName":
        validateUserName($request);
        break;
    case "obtener":
        getUser($request);
        break;
    case "obtenerCantidad":
        getCantidad($request);
        break; 
    default:
        sendRensponse(array(
          "error" => "true",
          "mensaje" => "request mal formado"
        ));
        break;
}
