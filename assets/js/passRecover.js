(function($){
  
  var URI = {
      GET : 'actions/actions.php?action=recover',
      SEND: 'actions/actionMail.php?action=recover'
    };

  $btnEnviarPass = $("#btnEnviarMail");
  $inputMail = $("#emailRecover");

  $btnEnviarPass.on("click", function(){
    var enviar = true;

    var mail = $inputMail.val();
    if(mail.length == 0){
          $inputMail.closest(".form-group").addClass("has-error");
          $inputMail.siblings(".glyphicon-remove").removeClass("hide");
          $inputMail.siblings(".help-block").html("Debe completar este campo");
          enviar = false;
    }else{
          $inputMail.closest(".form-group").removeClass("has-error");
          $inputMail.siblings(".glyphicon-remove").addClass("hide");
          $inputMail.siblings(".help-block").html("");     
    }

    if (enviar){
      var enviarPass = $.ajax({
        url : URI.GET,
        method : "POST",
        data: {email:mail},
        dataType : 'json'
      });

      enviarPass.done(function(res){
        if(!res.error){

            var sendMail = $.ajax({
              url : URI.SEND,
              method : "POST",
              data: {nombre:res.data.nombre,
                    email:res.data.email,
                    contraseña:res.data.contraseña},
              dataType : 'json'
            });

            enviarPass.done(function(res){ 
              if(!res.error){

              }else{          
                  alert(res.mensaje);
              }
            });

        }else{          
            alert(res.mensaje);
        }
      });
    }
  });
  
})(jQuery);