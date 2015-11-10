
(function ($) {
    
    //$('title').html("Regístrate en CineUTN");

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
    $complejo = $("#complejo");
   
    $('#signupform').submit(function(e) { 
         $('#signupform [data-toggle="tooltip"]').tooltip('hide');
        e.preventDefault();
    
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
            var loginSignup = $.ajax({
                url: URI.SIGNIN,
                method: "POST",
                data: $('#signupform').serialize(),
                dataType: 'json'
            });
            loginSignup.done(function(res){
            if(!res.error && res.data.perfil==1 ){
                sessionStorage.setItem('idUser', res.data.usuarioID);
                sessionStorage.setItem('tipoUsuario', res.data.perfil);
                sessionStorage.setItem('nombre', res.data.nombre);
                sessionStorage.setItem('apellido', res.data.apellido);  
                sessionStorage.setItem('complejo', res.data.apellido); 
                 location.reload();
            }else if(res.data.perfil==2 || res.data.perfil==3){
                table.ajax.reload();
                $('#modalSignup').modal('hide');
            } else{
                alert(res.mensaje);

            }
        });
            
         loginSignup.fail(function(){
         
            alert("error");
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
        $('#email').on('change',function(){
           $('#signupform .alert.alert-danger.mail').remove();
            var validaMail = $.ajax({
                url: URI.VALIDARMAIL,
                method: "POST",
                data: {mail : $('#email').val()},
                dataType: 'json'
            });
            validaMail.done(function(e){
                if(e.error){  $('<div class="alert alert-danger mail">    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>    <strong>Atencion!</strong> El email '+ $('#email').val()+ ' ya esta en uso.</div>').insertAfter($('#email').parent().parent());
                            
                
                    $('#email').val('');
               }
                
                
                
             });
            
        
        }); 
		
        $('#usuario').on('change',function(){
            $('#signupform .alert.alert-danger.usuario').remove();
           
            var validaMail = $.ajax({
                url: URI.VALIDARUSERNAME,
                method: "POST",
                data: {userName : $('#usuario').val()},
                dataType: 'json'
            });
            validaMail.done(function(e){
                if(e.error){
                  $('<div class="alert alert-danger usuario">    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>    <strong>Atencion!</strong> El usuario '+ $('#usuario').val()+ ' ya esta en uso.</div>').insertAfter($('#usuario').parent().parent());
                            
                
                    $('#usuario').val('');
                }
             });
            
        
        }); 	
      });
	 

})(jQuery);