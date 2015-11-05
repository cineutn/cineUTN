<!doctype html>
<?php header('Content-Type: text/html; charset=utf-8'); ?>
<html class="no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <title>UTN Cine</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico" />
        <link rel="stylesheet" href="assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/css/header.css">
        <link rel="stylesheet" href="assets/css/footer.css">
        
        <!--[if lt IE 9]>
            <script src="js/vendor/html5-3.6-respond-1.4.2.min.js"></script>
        <![endif]-->
</head>
    <body>
    <div class="container">
        <div class="row tituloPagina"> 
            <div class="logo">
                <img src="assets/img/UTNCineLogo.png">
                <div class="cuentaUser pull-right">
                    <div id="login-registro">
                        <a data-toggle="modal" href="#modalLogin">
                        ENTRAR A MI CUENTA
                        <img src="assets/img/Next-64.png"><br>
                        </a>
                        <span data-toggle="modal" href="#modalSignup">
                        <a>¿No tenes usuario? | Crear Usuario </a>
                        </span>    
                    </div>
                    <div id="userLogueado" class="hide">
                        <a id="saludoUsuario">
                            Bienvenido
                        </a>    
                        <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button" id="btnMiCuenta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                MI CUENTA
                                <span id="cuentaFlecha" class="glyphicon glyphicon-menu-right"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li>
                                    <a href="#"><span style="font-size: 13px;" class="glyphicon glyphicon-link"></span> Cambiar Contraseña</a>
                                </li>
                                <li>
                                    <a href="#"><span style="font-size: 13px;" class="glyphicon glyphicon-envelope"></span> Cambiar Email</a>
                                </li>
                                <li>
                                    <a id="btnCerrarSesion"><span style="font-size: 13px;" class="glyphicon glyphicon-off"></span> Cerrar Sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>                    
                </div>
            </div>
            <ul class="tituloMenu" >
                <li class="itemMenu">
                    <a id="itemHome" href="index.php">Home</a>
                </li>
                <li class="itemMenu">
                    <a href="cines.php">Cines</a>
                </li>
                <li class="itemMenu">
                    <a href="precios.php">Precios</a>
                </li>
                <li class="itemMenu">
                    <a href="formatos.php">Formatos</a>
                </li>
                <li  id="liEntradas" class="itemMenu hide">
                    <a href="consultaVenta.php">Entradas</a>
                </li>
            </ul>
        </div>

<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/header.js"></script>

<!-- Modal forms-->
<?php require("partials/login.php"); ?> 
<?php require("partials/registro.php"); ?>