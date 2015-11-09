(function($){
      
    var URI = {
        UPDATE : 'actions/actions.php?action=actualizarPassword',
        VALIDAR : 'actions/actions.php?action=validarPassword',
    };

    $inputPassword = $('#passwordViejo');
    $inputPasswordNew = $('#newPassword');
    $inputPasswordNew2 = $('#newPassword2');

    $btnModificar = $("#btnModificarPass");

    function validarContraseña(){   
        var bRetorno = true;

        var idUsuario = sessionStorage.getItem('idUser');

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
                data: {usuarioID:idUsuario,
                      password:vieja}
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

             if(nueva2.length == 0){
                $inputPasswordNew2.closest(".form-group").addClass("has-error");
                $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
                $inputPasswordNew2.siblings(".help-block").html("Debe completar este campo");
              }

          bRetorno = false;
        }else if(nueva.length < 6){
          $inputPasswordNew.closest(".form-group").addClass("has-error");
          $inputPasswordNew.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew.siblings(".help-block").html("La contraseña debe contener al menos 6 caracteres");

              if(nueva2.length == 0){
                $inputPasswordNew2.closest(".form-group").addClass("has-error");
                $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
                $inputPasswordNew2.siblings(".help-block").html("Debe completar este campo");
              }else if(nueva2.length < 6){
                $inputPasswordNew2.closest(".form-group").addClass("has-error");
                $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
                $inputPasswordNew2.siblings(".help-block").html("La contraseña debe contener al menos 6 caracteres");
              }

          bRetorno = false;
        }else if(nueva2.length == 0){
          $inputPasswordNew2.closest(".form-group").addClass("has-error");
          $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew2.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else if(nueva2.length < 6){
          $inputPasswordNew2.closest(".form-group").addClass("has-error");
          $inputPasswordNew2.siblings(".glyphicon-remove").removeClass("hide");
          $inputPasswordNew2.siblings(".help-block").html("La contraseña debe contener al menos 6 caracteres");
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
          $inputPasswordNew.closest(".form-group").removeClass("has-error");
          $inputPasswordNew.siblings(".glyphicon-remove").addClass("hide");
          $inputPasswordNew.siblings(".help-block").html("");
          $inputPasswordNew2.closest(".form-group").removeClass("has-error");
          $inputPasswordNew2.siblings(".glyphicon-remove").addClass("hide");
          $inputPasswordNew2.siblings(".help-block").html("");
        }

        return bRetorno;   
  };

   $btnModificar.on("click", function(){

        var bValidar;

        bValidar = validarContraseña();

        if (bValidar){

            var idUsuario = sessionStorage.getItem('idUser');
            var nuevaPass = $inputPasswordNew.val();

            var modificar = $.ajax({
                url : URI.UPDATE,
                method : "POST",
                dataType : 'json',
                data: {usuarioID:idUsuario,
                      password:nuevaPass}
            });
       
            modificar.done(function(res){
                if(!res.error){
                    //alert(res.mensaje);
                    $('#msgBoxTitulo').text('Modificar Contraseña');
                    $('#msgBoxMensaje').text(res.mensaje);
                    $('#modalMsgBox').modal('show');
                }else{
                    event.preventDefault();
                    //alert(res.mensaje);
                    $('#msgBoxTitulo').text('Modificar Contraseña');
                    $('#msgBoxMensaje').text(res.mensaje);
                    $('#modalMsgBox').modal('show');
                }
            });
        }
     
   });

})(jQuery)