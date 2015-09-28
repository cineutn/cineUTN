
(function($){
    
    $('title').html("Regístrate en CineUTN");

  var URI = {
        VALIDARMAIL : "actions/api.php?action=validarMail",
        VALIDARUSERNAME : "actions/api.php?action=validarUserName"
    };

	$email = $("#emaiil");
    $nombre = $("#nombre");
	$apellido = $("#apellido");
  	$fechaNacimiento = $("#fechaNacimiento");
  	$usuario = $("#usuario");
  	$password = $("#password");
	$passwordConfirmation = $("#passwordConfirmation");
  	$telefono = $("#telefono");
	$genero =$('input:radio[name=genero]:checked').val();
	$sumit=$('input:submit');
    
    $email.on("focusout",function(){
    	var mail = $mail.val();
    	 if(mail.length == 0){
            $("#email").closest(".form-group").addClass("has-error");
            $("#email").siblings(".glyphicon-remove").removeClass("hide");
            $("#email").siblings(".help-block").html("Debe completar este campo");
            valid = false;
        }else{

		var validarMail = $.ajax({
		        url : URI.VALIDARMAIL,
		        method : "POST",
		        dataType : 'json',
		        data : {mail:mail}
		    });
		    
		    validarMail.done(function(res){
		        if(!res.error){
	        	    $("#mail").closest(".form-group").removeClass("has-error");
			    	$("#mail").siblings(".glyphicon-remove").addClass("hide");
			    	$("#mail").siblings(".help-block").html("");
		        }else{
		          	$("#mail").closest(".form-group").addClass("has-error");
            		$("#mail").siblings(".glyphicon-remove").removeClass("hide");
            		$("#mail").siblings(".help-block").html(res.mensaje);
		        }
		    });
		    
		    validarMail.fail(function(res){
		        
		    });
        	 
        }

    });

	$usuario.on("focusout",function(){
    	var usuario = $usuario.val();
    	 if(userName.length == 0){
            $("#userName").closest(".form-group").addClass("has-error");
            $("#userName").siblings(".glyphicon-remove").removeClass("hide");
            $("#userName").siblings(".help-block").html("Debe completar este campo");
            valid = false;
        }else{

		var validarMail = $.ajax({
		        url : URI.VALIDARUSERNAME,
		        method : "POST",
		        dataType : 'json',
		        data : {userName:userName}
		    });
		    
		    validarMail.done(function(res){
		        if(!res.error){
	        	    $("#userName").closest(".form-group").removeClass("has-error");
			    	$("#userName").siblings(".glyphicon-remove").addClass("hide");
			    	$("#userName").siblings(".help-block").html("");
		        }else{
		          	$("#userName").closest(".form-group").addClass("has-error");
            		$("#userName").siblings(".glyphicon-remove").removeClass("hide");
            		$("#userName").siblings(".help-block").html(res.mensaje);
		        }
		    });
		    
		    validarMail.fail(function(res){
		        
		    });
        	 
        }

    });
    
    
     $( document ).ready(function(){
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