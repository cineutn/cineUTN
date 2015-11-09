(function($){
      
    var URI = {
        LOGIN : 'actions/actions.php?action=validar',
        UPDATE: 'actions/actions.php?action=actualizarEstado'
    };

    $formLogin = $("#login_form");

    $formLogin.on("submit",function(e){
        
        var loginUser = $.ajax({
            url : URI.LOGIN,
            method : "GET",
            dataType : 'json',
            async: false,
            data : $formLogin.serialize()
        });

        loginUser.done(function(res){
            if(!res.error){
                sessionStorage.setItem('idUser', res.data.idUsuario);
                sessionStorage.setItem('tipoUsuario', res.data.tipoUsuario);
                sessionStorage.setItem('nombre', res.data.nombre);
                sessionStorage.setItem('apellido', res.data.apellido);
                sessionStorage.setItem('email', res.data.email);

                var updateEstado =  $.ajax({
                    url: URI.UPDATE,
                    type: 'POST',
                    data: {idUsuario:res.data.idUsuario,
                           estado:"online"},
                    dataType: 'json',
                    async:false
                });

                updateEstado.done(function(response){
                    if(response.error){
                        sessionStorage.clear();
                        window.location.href='index.php'; 
                    }
                });

                
            }else{
                alert(res.mensaje);
            }
        });

        loginUser.fail(function(res){
            alert(res.responseText)
        });

    });
    
})(jQuery)