(function($){
      
    var URI = {
        LOGIN : 'actions/actions.php?action=validar'
    };

    $form = $("#login_form");
   
    
    $form.on("submit",function(){
       
        var loginUser = $.ajax({
            url : URI.LOGIN,
            method : "POST",
            dataType : 'json',
            data : $form.serialize()
        });

        loginUser.done(function(res){
        if(!res.error){
            sessionStorage.setItem('idUser', res.data.idUsuario);
            sessionStorage.setItem('tipoUsuario', res.data.tipoUsuario);
            sessionStorage.setItem('nombre', res.data.nombre);
            sessionStorage.setItem('apellido', res.data.apellido);
            /*alert(res.mensaje);*/
        }else{
            alert(res.mensaje);
            event.preventDefault();
        }
        });

        loginUser.fail(function(res){
            alert(res.responseText)
        });

    });
    
})(jQuery)