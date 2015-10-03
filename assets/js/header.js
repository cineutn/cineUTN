(function($){
      
    var URI = {
        LOGIN : 'actions/actions.php?action=validar'
    };

    $divLoginRegistro = $('#login-registro');
    $divUserLogueado = $('#userLogueado');
    $saludoUsuario = $('#saludoUsuario');

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

        }else{

            $divUserLogueado.addClass("hide");
            $divLoginRegistro.removeClass("hide");
            $saludoUsuario.text("");
        }
       

               
    };

})(jQuery)