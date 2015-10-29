(function($){
      
    var URI = {
        LOGIN : 'actions/actions.php?action=validar'
    };

    $form = $("#login_form");
   
    $form.on("submit",function(e){
        
        //e.preventDefault();
       
        var loginUser = $.ajax({
            url : URI.LOGIN,
            method : "GET",
            dataType : 'json',
            async: false,
            data : $form.serialize()
        });

        loginUser.done(function(res){
            if(!res.error){
                sessionStorage.setItem('idUser', res.data.idUsuario);
                sessionStorage.setItem('tipoUsuario', res.data.tipoUsuario);
                sessionStorage.setItem('nombre', res.data.nombre);
                sessionStorage.setItem('apellido', res.data.apellido);
                sessionStorage.setItem('email', res.data.email);
            }else{
                alert(res.mensaje);

            }
        });

        loginUser.fail(function(res){
            alert(res.responseText)
        });

    });
    
})(jQuery)