(function($){
      
    var URI = {
        LOGIN : 'actions/actions.php?action=validar'
    };

    $divFunciones = $("#divFunciones");
    $divSalas = $("#divSalas");
    $divFormatos = $("#divFormatos");
    $divComplejos = $("#divComplejos");
    $divPrecios = $("#divPrecios");
    $divPeliculas = $("#divPeliculas");
    $divEntradas = $("#divEntradas");
    $divWeb = $("#divWeb");
    
    $divFunciones.on("click",function(){
        window.location.href = "funciones.php";
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

    $divEntradas.on("click",function(){
        window.location.href = "consultaVenta.php";
    });

    $divWeb.on("click",function(){
        window.location.href = "index.php";
    });
    
})(jQuery)