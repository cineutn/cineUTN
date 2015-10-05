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
      $usuarioid = $usuario['usuarioID'];
      setcookie('usuarioid',$usuarioid,time() + 3600);     
      redirect("../index.php?id=".$usuarioid);
    }else{
        echo "Error al registrar el usuario. " ;
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

$request = new Request();
$action = $request->action;
switch($action){
     case "redirecRegistrar":
        redirecRegistro($request);
        break;
    case "nuevoUser":
        nuevoUser($request);
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
    default:
        listar($request);
        break;
}
