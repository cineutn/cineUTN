(function($){
      
    var URI = {
        LOGIN : 'actions/actions.php?action=validar',
        UPDATE: 'actions/actions.php?action=actualizarEstado'
    };

    $divLoginRegistro = $('#login-registro');
    $divUserLogueado = $('#userLogueado');
    $saludoUsuario = $('#saludoUsuario');
    $itemHome = $("#itemHome");
    $liEntradas = $("#liEntradas");
    $btnCerrarSesion = $("#btnCerrarSesion");

    $('#btnMiCuenta').dropdown()

    $( document ).ready(function(){
        obtenerUsuario();
    });

    function obtenerUsuario(){   
        $idUsuario = sessionStorage.getItem('idUser');

        if ($idUsuario > 0 ){
            $nombreCompleto = sessionStorage.getItem('apellido') + ' ' + sessionStorage.getItem('nombre');
           
            $divUserLogueado.removeClass("hide");
            $divLoginRegistro.addClass("hide");
            $saludoUsuario.text("Bienvenido " + $nombreCompleto);

            $tipoUsuario = sessionStorage.getItem('tipoUsuario');

            if ($tipoUsuario == "administrador"){
                $itemHome.prop("href", "menuInicioAdmin.php");
            }else if($tipoUsuario == "vendedor"){   
                $liEntradas.removeClass("hide");
            }   
            else if($tipoUsuario == "superAdministrador"){
                $itemHome.prop("href", "menuInicioSuperAdmin.php");
            }
        }else{

            $divUserLogueado.addClass("hide");
            $divLoginRegistro.removeClass("hide");
            $saludoUsuario.text("");
        }
           
    };
   

    $btnCerrarSesion.on("click", function(){
        $idUsuario = sessionStorage.getItem('idUser');

        var updateEstado =  $.ajax({
            url: URI.UPDATE,
            type: 'POST',
            data: {idUsuario:$idUsuario,
                   estado:"offline"},
            dataType: 'json',
            async:false
        });

        updateEstado.done(function(response){
            if(response.error){
               alert(response.mensaje); 
            }else{
                sessionStorage.clear();
                window.location.href='index.php'; 
            }
        });
       
    });

})(jQuery)