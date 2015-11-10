<?php
session_start();

require("../utils/request.php");

function sendResponse($response){
    echo json_encode($response);
}

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function validatePassword($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
    $user["usuarioID"] = $request->usuarioID;
    $user["password"] = $request->password;
    if($usuario = $c->getUserByPassword($user)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $usuario
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener usuario"
        ));
    }
}

function updatePassword($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
    $user["usuarioID"] = $request->usuarioID;
    $user["password"] = $request->password;
    if($c->updatePassword($user)){
      sendResponse(array(
            "error" => false,
            "mensaje" => "Se modificó la contraseña. "
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al actualizar password. "
        ));
    }
}

function validateEmail($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
    $user["usuarioID"] = $request->usuarioID;
    $user["email"] = $request->email;
    if($usuario = $c->validateEMail($user)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data" => $usuario
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener usuario"
        ));
    }
}

function updateEmail($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
    $user["usuarioID"] = $request->usuarioID;
    $user["email"] = $request->email;
    if($c->updateEmail($user)){
      sendResponse(array(
            "error" => false,
            "mensaje" => "Se modificó el email. "
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al actualizar email. "
        ));
    }
}

function recoverPassword($request){
    require("../models/usuarios.php");
    $user = new Usuario();
    $email = $request->email;
    if($usuario = $user->getUserByMail($email)){
        sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data"=> $usuario
        ));
      
    }else{
         sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener datos de usuario. "
        ));
    }
}

function validateUser($request){
    require("../models/usuarios.php");    
    $user = new Usuario();
    $id = $request->idLogin;
    $password = $request->passwordLogin;
    if($c = $user->validateUser($id,$password)){
     /* setcookie('usuarioid',$usuarioid,time() + 3600);  */
       sendResponse(array(
            "error" => false,
            "mensaje" => "Usuario logueado.",
            "data"=> $c
        ));
    }else{
         sendResponse(array(
            "error" => true,
            "mensaje" => "El nombre de Usuario o Contraseña son incorrectos. "
        ));
    }
}

function nuevoUser($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
       
    $user["perfil"] = $request->perfil;
    $user["complejo"] = $request->complejo;
    $user["email"] = $request->email;
    $user["nombre"] = $request->nombre;
    $user["apellido"] = $request->apellido;
    $user["fechaNacimiento"] = $request->fechaNacimiento;
    $user["usuario"] = $request->usuario;
    $user["password"] = $request->password;
    $user["telefono"] = $request->telefono;
    $user["genero"] = $request->genero;
    $user["dni"] = $request->dni;
    
    
    if($usuario = $c->createUser($user)){
      //$c = $user->validateUser($user["usuario"],$user["password"]);
      sendResponse(array(
            "error" => false,
            "mensaje" => "Usuario Creado.",
            "data"=> $usuario
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al registrar el usuario."
        ));
        
    }
}

function editUser($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
       
    $user["id"] = $request->idEdit;
    $user["perfil"] = $request->perfilEdit;
    $user["complejo"] = $request->complejoEdit;
    $user["email"] = $request->emailEdit;
    $user["nombre"] = $request->nombreEdit;
    $user["apellido"] = $request->apellidoEdit;
    $user["usuario"] = $request->usuarioEdit;
    $user["password"] = $request->passwordEdit;
    $user["telefono"] = $request->telefonoEdit;
    $user["dni"] = $request->dniEdit;
    
    
    if($usuario = $c->editUser($user)){
      //$c = $user->validateUser($user["usuario"],$user["password"]);
      sendResponse(array(
            "error" => false,
            "mensaje" => "Usuario Editado.",
            "data"=> $usuario
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al editar el usuario."
        ));
        
    }
}

function updateUser($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
    $user["usuarioID"] = $request->usuarioID;
    $user["nombreCompleto"] = $request->nombreCompleto;
    $user["mail"] = $request->mail;
    $user["password"] = $request->password;
    $user["telefono"] = $request->telefono;
    $usuarioid = $request->usuarioID;
    if($c->updateUser($user)){
      //redirect("../INDEX.php?id=".$usuarioid);
    }else{
        echo "Error al actualizar el usuario. " ;
    }
}

function redirecRegistro($request){
    //redirect("../formRegistro.php?nombreCompleto=" . $request->nombreCompleto . "&mail=" .  $request->mail . "&password=" . $request->password);
    redirect("../formRegistro.php?nombreCompleto=" . $request->nombreCompleto . "&mail=" .  $request->mail);
}

function logoutUser($request){
    if(isset($_COOKIE['usuarioid'])){        
        unset($_COOKIE['usuarioid']);
        setcookie('usuarioid',$_POST['usuarioid'],time() - 1);
    }

    session_destroy();
    redirect("../index.php");
}

function obtenerBloqueo($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
    $user["usuarioID"] = $request->idUsuario;
    if($bloqueo = $c->getBloqueo($user)){
      sendResponse(array(
            "error" => false,
            "mensaje" => "",
            "data"=> $bloqueo
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al obtener el campo bloqueado"
        ));
    }
}

function actualizarEstado($request){
    require("../models/usuarios.php");
    $c = new Usuario();
    $user = array();
    $user["usuarioID"] = $request->idUsuario;
    $user["estado"] = $request->estado;
    if($c->updateEstado($user)){
        sendResponse(array(
            "error" => false,
            "mensaje" => ""
        ));
    }else{
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al actualizar el campo estado"
        ));
    }
}

$request = new Request();
$action = $request->action;
switch($action){
    case "validarMail":
        validateEmail($request);
        break;
    case "actualizarMail":
        updateEmail($request);
        break;
    case "validarPassword":
        validatePassword($request);
        break;
    case "actualizarPassword":
        updatePassword($request);
        break;
    case "recover":
        recoverPassword($request);
        break;
    case "redirecRegistrar":
        redirecRegistro($request);
        break;
    case "nuevoUser":
        nuevoUser($request);
        break;
    case "editUser":
        editUser($request);
        break;    
    case "validar":
        validateUser($request);
        break;
    case "actualizar":
        updateUser($request);
        break;
    case "logout":
        logoutUser($request);
        break;
    case "obtenerBloqueo":
        obtenerBloqueo($request);
        break;
    case "actualizarEstado":
        actualizarEstado($request);
        break; 
    default:
        listar($request);
        break;
}
