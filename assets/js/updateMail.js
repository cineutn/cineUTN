(function($){
      
    var URI = {
        UPDATE : 'actions/actions.php?action=actualizarMail',
        VALIDARPASS : 'actions/actions.php?action=validarPassword',
        VALIDARMAIL : 'actions/actions.php?action=validarMail',
    };

    $txtPasswordVal = $('#passValidar');
    $txtEmail = $('#emailViejo');
    $inputEmailNew = $('#newEmail');
    $inputEmailNew2 = $('#newEmail2');

    $btnModificar = $("#btnModificarEmail");

    function validarMail(){   
        var bRetorno = true;

        var idUsuario = sessionStorage.getItem('idUser');

        var password = $txtPasswordVal.val();
        if(password.length == 0){
          $txtPasswordVal.closest(".form-group").addClass("has-error");
          $txtPasswordVal.siblings(".glyphicon-remove").removeClass("hide");
          $txtPasswordVal.siblings(".help-block").html("Debe ingresar su contraseña");
          bRetorno = false;
        }else{

            var validar = $.ajax({
                url : URI.VALIDARPASS,
                method : "GET",
                async:false,
                dataType : 'json',
                data: {usuarioID:idUsuario,
                      password:password}
            });
       
            validar.done(function(res){
                if(!res.error){                        
                    $txtPasswordVal.closest(".form-group").removeClass("has-error");
                    $txtPasswordVal.siblings(".glyphicon-remove").addClass("hide");
                    $txtPasswordVal.siblings(".help-block").html("");
                }else{
                    $txtPasswordVal.closest(".form-group").addClass("has-error");
                    $txtPasswordVal.siblings(".glyphicon-remove").removeClass("hide");
                    $txtPasswordVal.siblings(".help-block").html("La contraseña ingresada es incorrecta");
                    bRetorno = false;
                }
            });
          
        }

        var email = $txtEmail.val();
        if(email.length == 0){
          $txtEmail.closest(".form-group").addClass("has-error");
          $txtEmail.siblings(".glyphicon-remove").removeClass("hide");
          $txtEmail.siblings(".help-block").html("Debe ingresar su email");
          bRetorno = false;
        }else{

            var validar = $.ajax({
                url : URI.VALIDARMAIL,
                method : "GET",
                async:false,
                dataType : 'json',
                data: {usuarioID:idUsuario,
                      email:email}
            });
       
            validar.done(function(res){
                if(!res.error){                        
                    $txtEmail.closest(".form-group").removeClass("has-error");
                    $txtEmail.siblings(".glyphicon-remove").addClass("hide");
                    $txtEmail.siblings(".help-block").html("");
                }else{
                    $txtEmail.closest(".form-group").addClass("has-error");
                    $txtEmail.siblings(".glyphicon-remove").removeClass("hide");
                    $txtEmail.siblings(".help-block").html("El email ingresado es incorrecto");
                    bRetorno = false;
                }
            });
          
        }

        var nueva = $inputEmailNew.val();
        var nueva2 = $inputEmailNew2.val();

        if(nueva.length == 0){
          $inputEmailNew.closest(".form-group").addClass("has-error");
          $inputEmailNew.siblings(".glyphicon-remove").removeClass("hide");
          $inputEmailNew.siblings(".help-block").html("Debe ingresar un nuevo email");

             if(nueva2.length == 0){
                $inputEmailNew2.closest(".form-group").addClass("has-error");
                $inputEmailNew2.siblings(".glyphicon-remove").removeClass("hide");
                $inputEmailNew2.siblings(".help-block").html("Debe completar este campo");
              }

          bRetorno = false;
        }else if(nueva2.length == 0){
          $inputEmailNew2.closest(".form-group").addClass("has-error");
          $inputEmailNew2.siblings(".glyphicon-remove").removeClass("hide");
          $inputEmailNew2.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else if(nueva != nueva2){
          $inputEmailNew.closest(".form-group").addClass("has-error");
          $inputEmailNew.siblings(".glyphicon-remove").removeClass("hide");
          $inputEmailNew.siblings(".help-block").html("Debe ingresar el mismo email");
          $inputEmailNew2.closest(".form-group").addClass("has-error");
          $inputEmailNew2.siblings(".glyphicon-remove").removeClass("hide");
          $inputEmailNew2.siblings(".help-block").html("Debe ingresar el mismo email");
          bRetorno = false;
        }else{
          $inputEmailNew.closest(".form-group").removeClass("has-error");
          $inputEmailNew.siblings(".glyphicon-remove").addClass("hide");
          $inputEmailNew.siblings(".help-block").html("");
          $inputEmailNew2.closest(".form-group").removeClass("has-error");
          $inputEmailNew2.siblings(".glyphicon-remove").addClass("hide");
          $inputEmailNew2.siblings(".help-block").html("");
        }

        return bRetorno;   
  };

   $btnModificar.on("click", function(){

        var bValidar;

        bValidar = validarMail();

        if (bValidar){

            var idUsuario = sessionStorage.getItem('idUser');
            var nuevoEMail = $inputEmailNew.val();

            var modificar = $.ajax({
                url : URI.UPDATE,
                method : "POST",
                dataType : 'json',
                data: {usuarioID:idUsuario,
                      email:nuevoEMail}
            });
       
            modificar.done(function(res){
                if(!res.error){
                   alert(res.mensaje);
                }else{
                    event.preventDefault();
                    alert(res.mensaje);
                }
            });
        }
     
   });

})(jQuery)