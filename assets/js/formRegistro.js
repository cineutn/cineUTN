
(function ($) {
    
    $('title').html("Regístrate en CineUTN");

  var URI = {
      
    
        SIGNIN : 'actions/actions.php?action=nuevoUser',
        VALIDARMAIL : "actions/api.php?action=validarMail",
        VALIDARUSERNAME : "actions/api.php?action=validarUserName"
    };

    $perfil = $("#perfil");
	$email = $("#email");
    $telefono = $("#telefono");
    $nombre = $("#nombre");
	$apellido = $("#apellido");
  	$fechaNacimiento = $("#fechaNacimiento");
  	$usuario = $("#usuario");
  	$password = $("#password");
	$passwordConfirmation = $("#passwordConfirmation");
  	$dni = $("#dni");
   
    $('#signupform').submit(function(e) { 
         $('#signupform [data-toggle="tooltip"]').tooltip('hide');
        e.preventDefault();
        
         var data = {
                        perfil : $perfil.val(),
                        email : $email.val(),
                        nombre : $nombre.val(),
                        apellido :  $apellido.val(),
                        fechaNacimiento :  $fechaNacimiento.val(),
                        usuario  : $usuario.val(),
                        password :  $password.val(), 
                        telefono  : $telefono.val(), 
                        genero : $('input:radio[name=genero]:checked').val(),
                        dni : $dni.val()
                    
                    };
        
        
     //se traen todos los inputs del formulario
        var $inputs = $('#signupform :input');
        var error=false;
        debugger;
        $inputs.each(function() {
            var encontro_error = validar($(this)); //uses dependence ok
            if (encontro_error){
                e.preventDefault();
                $(eval($(this).attr('id'))).tooltip('show');
                error=true;
                return false;
            }         
        }); 
        if(!error){
            debugger;
            $.ajax({
					url: URI.SIGNIN,
					type: 'POST',
					data: data,
					cache: false,
					dataType: 'json',
					processData: false,
					contentType: false
				});
        }
    });
    
    function validar(elemento){        
        switch(elemento.attr('id')) {
            case 'passwordConfirmation':
                if($password.val()!=$passwordConfirmation.val()){
                    return true;
                }
                break;
        }
    }
    
     $( document ).ready(function(){
         //$('[data-toggle="tooltip"]').tooltip()
         
/*
           if($nombreCompleto.val() == 'name="nombreCompleto"'){
                $nombreCompleto.val('');
            }

            if($mail.val() == 'name="mail"'){
                $mail.val('');
            }

            if($password.val() == 'name="password"'){
                $password.val('');
            }*/
			
      });
	 

})(jQuery);