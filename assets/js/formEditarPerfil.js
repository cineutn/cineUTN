    (function($){

    $('title').html("Nombre Apellido (UserName) | Twitter ");

    $('#titulo').text("Editar Perfil"); 

    var files;
    var URI = {
        UPLOAD : 'actions/imagenes.php?action=subir',
        LIST : 'actions/imagenes.php?action=listar',
        OBTENERUSUARIO : "actions/api.php?action=obtener",
        CERRARSESION: "actions/actions.php?action=logout"
    };

    $nombreUsuario = $("#nombreCompleto");
    $userName = $("#userName");
    $telefono = $("#telefono");
    $mail = $("#mail");
    $password = $("#password");
    $usuarioID = $("#usuarioid").val();
    $btnCerrarSesion = $("#btnCerrarSesion");

    $('input[type=file]').on('change', prepareUpload);
    $('#uploadForm').on('submit', uploadFiles);
    
    $( document ).ready(function(){
           var id = $usuarioID;
            obtenerUsuario(id);
            $btnCerrarSesion.removeClass('hide');
      });

    function obtenerUsuario(id)
    {
         var obtener = $.ajax({
            url : URI.OBTENERUSUARIO,
            method : 'GET',
            dataType : 'json',
            data: {id:id}
        });

         obtener.done(function(res){
            if(!res.error){           
                $nombreUsuario.val(res.data.nombreCompleto);
                $userName.text('@'+res.data.userName);
                $telefono.val(res.data.telefono);
                $mail.val(res.data.mail);
                $password.val(res.data.password);

                $('title').html($nombreUsuario.val() +" (" + $userName.text() +") | Twitter ");

                if(res.data.imagen !== "")
                {
                       $("#vistaPrevia").attr("src", res.data.imagen);
                       $("#vistaPrevia").css({ opacity: 1 });
                       $("#vistaPrevia").removeClass('hide');
                       $("#iconAvatar").addClass("hide");
                       $("#textoAvatar").addClass("hide");
                }

            }else{
                console.error("Error al obtener usuario");
            }
        }); 
    };

    function prepareUpload(event){
        files = event.target.files;
        console.log(files);
    };
    
    function uploadFiles(event){
        event.stopPropagation();
        event.preventDefault();

        var data = new FormData();
        var usuarioID = $("#usuarioid").text();

        $.each(files, function(key, value){
            data.append(key, value);
        });

        var uploadImage =  $.ajax({
            url: URI.UPLOAD,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false
        })

        uploadImage.done(function(response){
            alert(response.mensaje);
        });
    };    

    var input = document.querySelector("input[type=file]"),
    img = document.querySelector("#vistaPrevia");

    input.addEventListener("change", function(){
        var file = this.files[0],
            reader = new FileReader();
                    
        reader.addEventListener("load", function(e){
            if (img.style.opacity == 0){
                $("#vistaPrevia").removeClass('hide');
                $("#iconAvatar").addClass("hide");
                $("#textoAvatar").addClass("hide");
                img.src = e.target.result;
                img.style.opacity = 1;
            }
            else{
                img.style.opacity = 0;
                setTimeout(function(){
                    $("#vistaPrevia").removeClass('hide');
                    $("#iconAvatar").addClass("hide");
                    $("#textoAvatar").addClass("hide");
                    img.src = e.target.result;
                    img.style.opacity = 1;
                }, 2250);
            }
        }, false);
                  
        reader.readAsDataURL(file);
    }, false);


})(jQuery)