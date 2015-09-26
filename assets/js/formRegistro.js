
(function($){
    
    $('title').html("Regístrate en Twitter");

  var URI = {
        VALIDARMAIL : "actions/api.php?action=validarMail",
        VALIDARUSERNAME : "actions/api.php?action=validarUserName"
    };

    $nombreCompleto = $("#nombreCompleto");
  	$telefono = $("#telefono");
  	$mail = $("#mail");
  	$password = $("#password");
  	$userName = $("#userName");
    
    $('#titulo').text( "Registro");

    $nombreCompleto.on("focusout",function(){
    	var nombre = $nombreCompleto.val();
    	 if(nombre.length == 0){
            $("#nombreCompleto").closest(".form-group").addClass("has-error");
            $("#nombreCompleto").siblings(".glyphicon-remove").removeClass("hide");
            $("#nombreCompleto").siblings(".help-block").html("Debe completar este campo");
            valid = false;
        }else{
        	$("#nombreCompleto").closest(".form-group").removeClass("has-error");
        	$("#nombreCompleto").siblings(".glyphicon-remove").addClass("hide");
        	$("#nombreCompleto").siblings(".help-block").html(""); 
        }
    });
  
   $password.on("focusout",function(){
    	var password = $password.val();
    	 if(password.length < 6){
            $("#password").closest(".form-group").addClass("has-error");
            $("#password").siblings(".glyphicon-remove").removeClass("hide");
            $("#password").siblings(".help-block").html("La contraseña debe ser de al menos 6 caracteres.");
            valid = false;
        }else{
        	$("#password").closest(".form-group").removeClass("has-error");
        	$("#password").siblings(".glyphicon-remove").addClass("hide");
        	$("#password").siblings(".help-block").html(""); 
        }
    });

    $mail.on("focusout",function(){
    	var mail = $mail.val();
    	 if(mail.length == 0){
            $("#mail").closest(".form-group").addClass("has-error");
            $("#mail").siblings(".glyphicon-remove").removeClass("hide");
            $("#mail").siblings(".help-block").html("Debe completar este campo");
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

	$userName.on("focusout",function(){
    	var userName = $userName.val();
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

           if($nombreCompleto.val() == 'name="nombreCompleto"'){
                $nombreCompleto.val('');
            }

            if($mail.val() == 'name="mail"'){
                $mail.val('');
            }

            if($password.val() == 'name="password"'){
                $password.val('');
            }
      });

})(jQuery);