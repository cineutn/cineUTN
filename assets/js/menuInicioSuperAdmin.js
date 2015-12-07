(function($){
    
    $('title').html("Home");

    var URI = {
        LOGIN : 'actions/actions.php?action=validar'
    };

    $divFunciones = $("#divFunciones");
    $divSalas = $("#divSalas");
    $divFormatos = $("#divFormatos");
    $divComplejos = $("#divComplejos");
    $divPrecios = $("#divPrecios");
    $divPeliculas = $("#divPeliculas");
    $divTarjetas = $("#divTarjetas");
    $divEntradas = $("#divEntradas");
    $divWeb = $("#divWeb");
    $divUsuarios = $("#divUsuarios");
    $divAdministrador = $("#divAdministrador");
    $divReportes = $("#divReportes");
	
    
    $divReportes.on("click",function(){
        window.location.href = "reportes.php";
    });
    
    $divFunciones.on("click",function(){
        window.location.href = "semanaNueva.php";
    });

    $divSalas.on("click",function(){
        window.location.href = "altaSala.php";
    });

    $divFormatos.on("click",function(){
        window.location.href = "formatos.php";
    });

    $divComplejos.on("click",function(){
        window.location.href = "cines.php";
    });

    $divPrecios.on("click",function(){
        window.location.href = "precios.php";
    });

    $divPeliculas.on("click",function(){
        window.location.href = "altaPelicula.php";
    });

    $divTarjetas.on("click",function(){
        window.location.href = "tarjetas.php";
    });

    $divEntradas.on("click",function(){
        window.location.href = "consultaVenta.php";
    });

    $divWeb.on("click",function(){
        window.location.href = "index.php";
    });
	
	$divUsuarios.on("click",function(){
        window.location.href = "usuarios.php";
    });
    $divAdministrador.on("click",function(){
        window.location.href = "administradores.php";
    });
})(jQuery)