
(function ($) {
    
    //$('title').html("Regístrate en CineUTN");

  var URI = {     
    
        SIGNIN : 'actions/actions.php?action=nuevoUser',
        VALIDARMAIL : "actions/api.php?action=validarMail",
        VALIDARUSERNAME : "actions/api.php?action=validarUserName",
        EDIT : 'actions/actions.php?action=editUser'
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
                dataType: 'json',
                beforeSend : function(){
                     $('#modalSignup .modal-body').append('<div class="alert alert-success" role="alert"><strong>Procesando...</strong> Espere por favor.</div>');
                }
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
                } else{
                    alert(res.mensaje);
                }
            });
            
             loginSignup.fail(function(){

                alert("error");
             });   
        }
        e.preventDefault();
    });
    
     $('#editform').submit(function(e) { 
         $('#editform [data-toggle="tooltip"]').tooltip('hide');
         
    
        //se traen todos los inputs del formulario
        var $inputs = $('#editform :input');
        var error=false;
       
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
            
            var edit = $.ajax({
                url: URI.EDIT,
                method: "POST",
                data: $('#editform').serialize(),
                dataType: 'json',
                beforeSend : function(){
                     $('#modalEdit .modal-body').append('<div class="alert alert-success" role="alert"><strong>Editando...</strong> Espere por favor.</div>');
                }
            });
            edit.done(function(res){
                if(!res.error ){
                    table.ajax.reload();
                   
                    
                }else{
                    alert(res.mensaje);
                }
            });
            
             edit.fail(function(){
                alert("error");
             });      
        }
    e.preventDefault();    
    });
    
    
    
    function validar(elemento){        
        switch(elemento.attr('id')) {
            case 'passwordConfirmation':
                if($password.val()!=$passwordConfirmation.val()){
                    return true;
                }
                break;
            case 'passwordConfirmationEdit':
                if($('#passwordEdit').val()!=$('#passwordConfirmationEdit').val()){
                    return true;
                }
                break;    
             case 'cmbComplejoEdit':
                if($('#cmbComplejoEdit').val()==0){
                    return true;
                }
                break;
             case 'cmbComplejo':
                if($('#cmbComplejo').val()==0){
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