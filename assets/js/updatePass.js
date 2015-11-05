(function($){
      
    var URI = {
        UPDATE : 'actions/actions.php?action=modificarContraseña',
        VALIDAR : 'actions/actions.php?action=validar',
    };

    $inputPassword = $('#password');
    $inputPasswordNew = $('#newPassword');
    $inputPasswordNew2 = $('#newPassword2');

    $btnModificar = $("#btnModificarPass");

    function validarContraseña()
    {   
        var bOk = true;

        var vieja = $inputPassword.val();
        if(vieja.length == 0){
          $inputPassword.closest(".form-group").addClass("has-error");
          $inputPassword.siblings(".glyphicon-remove").removeClass("hide");
          $inputPassword.siblings(".help-block").html("Debe ingresar su contraseña");
          bRetorno = false;
        }else{

            var validar = $.ajax({
                url : URI.VALIDAR,
                method : "GET",
                async:false,
                dataType : 'json',
            });
       
            validar.done(function(res){
                if(!res.error){                        
                    $inputPassword.closest(".form-group").removeClass("has-error");
                    $inputPassword.siblings(".glyphicon-remove").addClass("hide");
                    $inputPassword.siblings(".help-block").html("");
                }else{
                    $inputPassword.closest(".form-group").addClass("has-error");
                    $inputPassword.siblings(".glyphicon-remove").removeClass("hide");
                    $inputPassword.siblings(".help-block").html("La contraseña ingresada es incorrecta.");
                    bRetorno = false;
                }
            });
          
        }

        var nueva = $inputPasswordNew.val();
        var nueva2 = $inputPasswordNew2.val();

        if(nueva.length == 0){
          $inputPasswordNew.closest(".form-group").addClass("has-error");
          $inputPasswordNew.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew.siblings(".help-block").html("Debe ingresar una nueva contraseña");
          bRetorno = false;
        }else if(nueva2.length == 0){
          $inputPasswordNew2.closest(".form-group").addClass("has-error");
          $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew2.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else if(nueva != nueva2){
          $inputPasswordNew.closest(".form-group").addClass("has-error");
          $inputPasswordNew.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew.siblings(".help-block").html("Debe ingresar la misma contraseña");
          $inputPasswordNew2.closest(".form-group").addClass("has-error");
          $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew2.siblings(".help-block").html("Debe ingresar la misma contraseña");
          bRetorno = false;
        }else{
          $inputPasswordNew.closest(".form-group").addClass("has-error");
          $inputPasswordNew.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew.siblings(".help-block").html("Debe ingresar la misma contraseña");
          $inputPasswordNew2.closest(".form-group").addClass("has-error");
          $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew2.siblings(".help-block").html("Debe ingresar la misma contraseña");
        }

        return bOK   
    };

   $btnModificar.on("click", function(){

        var bValidar;

        bValidar = validarContraseña();

        if (bValidar){

            var modificar = $.ajax({
                url : URI.COMPLEJOS,
                method : "GET",
                async:false,
                dataType : 'json',
            });
       
            modificar.done(function(res){
                if(!res.error){
                   
                }else{
                    event.preventDefault();
                    alert(res.mensaje);
                }
            });
        }
     
   });

})(jQuery)