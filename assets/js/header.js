(function($){
      
    var URI = {
        LOGIN : 'actions/actions.php?action=validar'
    };

    $divLoginRegistro = $('#login-registro');
    $divUserLogueado = $('#userLogueado');
    $saludoUsuario = $('#saludoUsuario');
    $itemHome = $("#itemHome");

    $( document ).ready(function(){
        obtenerUsuario();
    });

    function obtenerUsuario()
    {   
        $idUsuario =   sessionStorage.getItem('idUser');

        if ($idUsuario > 0 ){
            $nombreCompleto = sessionStorage.getItem('apellido') + ' ' + sessionStorage.getItem('nombre');
           
            $divUserLogueado.removeClass("hide");
            $divLoginRegistro.addClass("hide");
            $saludoUsuario.text("Bienvenido " + $nombreCompleto);

            $tipoUsuario = sessionStorage.getItem('tipoUsuario');

            if ($tipoUsuario == "administrador"){
                $itemHome.prop("href", "menuInicioAdmin.php");
            }

        }else{

            $divUserLogueado.addClass("hide");
            $divLoginRegistro.removeClass("hide");
            $saludoUsuario.text("");
        }
       

               
    };

})(jQuery)