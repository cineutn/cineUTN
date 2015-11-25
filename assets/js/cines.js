(function($){
      
    $('title').html("Complejos");

    var URI = {
        COMPLEJOS : 'actions/actionComplejos.php?action=obtener',
        UPLOAD : 'actions/actionComplejos.php?action=subir',
        ADD : 'actions/actionComplejos.php?action=nuevo',
        UPDATE : 'actions/actionComplejos.php?action=modificar',
        REMOVE : 'actions/actionComplejos.php?action=eliminar',
        VALIDAR : 'actions/actionComplejos.php?action=validar',
        FUNCIONES: 'actions/actionComplejos.php?action=obtenerFunciones'
    };

    $contenedorCines = $("#contenedorCines");
    $botonAddComplejo = $("#btnAdd");
    $formComplejo = $("#form-nuevoComplejo");
    $nombreComplejo = $("#nombreComplejo");
    $direccionComplejo = $("#direccionComplejo");
    $descripcionComplejo = $("#descripcionComplejo");
    $idComplejo = $("#idComplejo");
    $btnCerrar = $(".iconCerrar");
    $btnAltaModificacion = $("#btnAltaModificacion");
    $iconButton = $("#iconButton");
    $btnText =$("#btnText");
    
    $form =  $('#uploadForm');

    $('input[type=file]').on('change', prepareUpload);
    $form.on('submit', uploadFiles);

    $( document ).ready(function(){
        obtenerComplejos();
        ocultarBotones();
    });

    function ocultarBotones(){

        var tipoUsuario;

        $tipoUsuario = sessionStorage.getItem('tipoUsuario');

        if ($tipoUsuario == "superAdministrador"){
            $(".lapiz").removeClass("hide");
            $(".cruz").removeClass("hide");
            $botonAddComplejo.removeClass("hide");
        }else{
            $(".lapiz").addClass("hide");
            $(".cruz").addClass("hide");
            $botonAddComplejo.addClass("hide");
        }
    };

    function obtenerComplejos(){
        
        var obtener = $.ajax({
            url : URI.COMPLEJOS,
            method : "GET",
            async:false,
            dataType : 'json',
        });
       
        obtener.done(function(res){
            if(!res.error){
                $complejos = '';
                //Borro el listado actual
                $contenedorCines.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){
                    $complejos = $complejos + 
                    '<div class="cine">'+
                        '<span id="idComplejo" class="hide">'+item.idComplejo+'</span>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>'+
                        '<div class="col-xs-9 col-sm-9 col-md-4 col-lg-3 imagenes">'+               
                            '<img id="imgComplejo" src="'+item.imagen+'" alt="" class="img-responsive complejo">'+
                            '<div class="salas">'+
                                '<img id="sala2D" src="assets/img/sala2D.png" alt="" class="img-responsive sala">'+
                                '<img id="sala3D" src="assets/img/sala3D.png" alt="" class="img-responsive sala">'+
                                '<img id="salaXD" src="assets/img/salaXD.png" alt="" class="img-responsive sala">'+       
                            '</div>'+                                        
                        '</div>'+
                        '<div class="col-xs-9 col-sm-9 col-md-8 col-lg-9 datos">'+
                           '<h2 id="tituloComplejo" class="cine-titulo">'+item.nombre+'</h2>'+
                            '<h4 id="direccionComplejo">'+item.direccion+'</h4>'+
                            '<p id="descripcionComplejo">'+item.descripcion+'</p>'+
                            '<div class="pull-right lapiz">'+
                                '<span class="glyphicon glyphicon-pencil"></span>'+   
                            '</div>'+
                            '<div id="btnRemove" class="pull-right cruz" data-toggle="confirmation" data-singleton="true">'+
                                '<span class="glyphicon glyphicon-remove"></span>'+                                    
                            '</div>'+                         
                        '</div>'+    
                    '</div>';
                });
                //lo agrego al listado
                $contenedorCines.append($complejos);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('Complejos');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            alert(res.responseText);
            $('#msgBoxTitulo').text('Complejos');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
               
    };
    
    function prepareUpload(event){
        files = event.target.files;
        console.log(files);
    };
    
    function uploadFiles(event){
        event.stopPropagation();
        event.preventDefault();

        id = $idComplejo.val();

        if (id > 0 ){
            var data = new FormData();
       
            $.each(files, function(key, value){
                data.append(key, value);
            });

            var uploadImage =  $.ajax({
                url: URI.UPLOAD + "&idComplejo=" + id,
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false
            })

            uploadImage.done(function(response){                
                //alert(response.mensaje);
                $('#msgBoxTitulo').text('Complejos');
                $('#msgBoxMensaje').text(response.mensaje);
                $('#modalMsgBox').modal('show');
            });

            uploadImage.always(function(response){
                $formComplejo.addClass("hide");
                obtenerComplejos();
            });

        }else{
            //alert("Debes primero dar de alta el complejo para colocarle una imagen.");
            $('#msgBoxTitulo').text('Complejos');
            $('#msgBoxMensaje').text('Debes primero dar de alta el complejo para colocarle una imagen.');
            $('#modalMsgBox').modal('show');
        }
        
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
    
    $botonAddComplejo.on("click",function(){
        $formComplejo.removeClass("hide");
        $nombreComplejo.val("");
        $direccionComplejo.val("");
        $descripcionComplejo.val("");
        $idComplejo.val("0");
        $("#vistaPrevia").addClass('hide');
        $("#vistaPrevia").css('opacity', '0.0');
        $("#iconAvatar").removeClass("hide");
        $("#textoAvatar").removeClass("hide");

        $btnText.text("Crear");
        $iconButton.removeClass('glyphicon glyphicon-pencil');
        $iconButton.addClass('glyphicon glyphicon-plus');
    });

    $contenedorCines.on("click",".lapiz",function(event){
        event.preventDefault();
        $formComplejo.removeClass("hide");  

        $divPadre = $(this).closest('.cine');
        $complejoID =  $divPadre.children('#idComplejo').text();
        $complejoTitulo =  $divPadre.children('.datos').children('#tituloComplejo').text();
        $complejoDireccion =  $divPadre.children('.datos').children('#direccionComplejo').text();
        $complejoDescripcion =  $divPadre.children('.datos').children('#descripcionComplejo').text();
        $path = $divPadre.children('.imagenes').children('#imgComplejo').attr('src');

        $idComplejo.val($complejoID); 
        $nombreComplejo.val( $complejoTitulo);
        $direccionComplejo.val($complejoDireccion);
        $descripcionComplejo.val($complejoDescripcion);
        $("#vistaPrevia").removeClass('hide');
        $("#vistaPrevia").attr('src',$path);
        $("#vistaPrevia").css('opacity', '1.0');
        $("#iconAvatar").addClass("hide");
        $("#textoAvatar").addClass("hide");

        $btnText.text("Modificar");
        $iconButton.removeClass('glyphicon glyphicon-plus');
        $iconButton.addClass('glyphicon glyphicon-pencil');

        validarComplejo();
    });
    
    $contenedorCines.on("click",".cruz",function(event){
        event.preventDefault();
        
        $divPadre = $(this).closest('.cine');
        $complejoID =  $divPadre.children('#idComplejo').text();
        $mensaje = "";

        var obtenerFunciones =  $.ajax({
                    url: URI.FUNCIONES,
                    type: 'GET',
                    data: {idComplejo:$complejoID},
                    dataType: 'json',
                    async: false
        });

        obtenerFunciones.done(function(response){
            if(!response.error){
               $mensaje = "El complejo seleccionado contiene Funciones Asociadas. ¿Desea Eliminarlo de todos modos?";
            }else{
               $mensaje = "¿Desea eliminar el complejo seleccionado?";
            }  
        });       

        $(this).confirmation({
            title: $mensaje,
            placement: 'bottom',
            singleton: true,
            popout: true,
            btnOkClass: 'btn-success',
            btnCancelClass: 'btn-danger',
            href: '',
            btnOkLabel: 'Si',
            onConfirm: function() {
                
        
                var deleteComplejo =  $.ajax({
                    url: URI.REMOVE,
                    type: 'POST',
                    data: {idComplejo:$complejoID},
                    dataType: 'json'
                });

                deleteComplejo.done(function(response){
                    if(!response.error){
                        $formComplejo.addClass("hide");
                        obtenerComplejos();
                    }else{
                        event.preventDefault();
                        //alert(res.mensaje);
                        $('#msgBoxTitulo').text('Complejos');
                        $('#msgBoxMensaje').text(response.mensaje);
                        $('#modalMsgBox').modal('show');
                    }  
                });
            }
        });
        $(this).confirmation('show')

        /*if(confirm("¿Desea eliminar el complejo seleccionado?")){
           
        }
        else{
            return false;
        }*/
    });

    $btnCerrar.on("click",function(){
        $formComplejo.addClass("hide");   
    });


    $btnAltaModificacion.on("click",function(){

        $id = $idComplejo.val();
        $nombre = $nombreComplejo.val();
        $direccion = $direccionComplejo.val();
        $descripcion = $descripcionComplejo.val();

        var bValidar;

        bValidar = validarComplejo();

        if (bValidar){

            if ($id == "0"){
            
                var addComplejo =  $.ajax({
                    url: URI.ADD,
                    type: 'POST',
                    data: {idComplejo:$id,
                           nombreComplejo:$nombre, 
                           direccionComplejo:$direccion,
                           descripcionComplejo:$descripcion},
                    dataType: 'json',
                   
                })

                addComplejo.done(function(response){
                    if(!response.error){
                        $formComplejo.addClass("hide");
                        obtenerComplejos();
                    }else{
                        event.preventDefault();
                        //alert(res.mensaje);
                        $('#msgBoxTitulo').text('Complejos');
                        $('#msgBoxMensaje').text(response.mensaje);
                        $('#modalMsgBox').modal('show');
                    }  
                });

            }else{

                var updateComplejo =  $.ajax({
                    url: URI.UPDATE,
                    type: 'POST',
                    data: {idComplejo:$id,
                           nombreComplejo:$nombre, 
                           direccionComplejo:$direccion,
                           descripcionComplejo:$descripcion},
                    dataType: 'json',
                   
                })

                updateComplejo.done(function(response){
                    if(!response.error){
                        $formComplejo.addClass("hide");
                        obtenerComplejos();
                    }else{
                        event.preventDefault();
                        //alert(res.mensaje);
                        $('#msgBoxTitulo').text('Complejos');
                        $('#msgBoxMensaje').text(response.mensaje);
                        $('#modalMsgBox').modal('show');
                    }                     
                });
            }
        }
       
    });
    
    function validarComplejo(){
        var bRetorno = true;

        $id = $idComplejo.val();

        var nombre = $nombreComplejo.val();
        if(nombre.length == 0){
          $nombreComplejo.closest(".form-group").addClass("has-error");
          $nombreComplejo.siblings(".glyphicon-remove").removeClass("hide");
          $nombreComplejo.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{

            var validar =  $.ajax({
                    url: URI.VALIDAR,
                    type: 'GET',
                    data: {idComplejo:$id,
                           nombreComplejo:nombre},
                    dataType: 'json',
                    async: false
                   
                })

                validar.done(function(response){
                     if(response.error){
                        $nombreComplejo.closest(".form-group").addClass("has-error");
                        $nombreComplejo.siblings(".glyphicon-remove").removeClass("hide");
                        $nombreComplejo.siblings(".help-block").html(response.mensaje);
                        bRetorno = false;
                    }else{
                        $nombreComplejo.closest(".form-group").removeClass("has-error");
                        $nombreComplejo.siblings(".glyphicon-remove").addClass("hide");
                        $nombreComplejo.siblings(".help-block").html("");
                    }
                });             
        }

        var direccion = $direccionComplejo.val();
        if(direccion.length == 0){
          $direccionComplejo.closest(".form-group").addClass("has-error");
          $direccionComplejo.siblings(".glyphicon-remove").removeClass("hide");
          $direccionComplejo.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $direccionComplejo.closest(".form-group").removeClass("has-error");
          $direccionComplejo.siblings(".glyphicon-remove").addClass("hide");
          $direccionComplejo.siblings(".help-block").html("");          
        }

        var descripcion = $descripcionComplejo.val();
        if(descripcion.length == 0 ){
            $descripcionComplejo.closest(".form-group").addClass("has-error");
            $descripcionComplejo.siblings(".glyphicon-remove").removeClass("hide");
            $descripcionComplejo.siblings(".help-block").html("Debe completar este campo");
            bRetorno = false;
        }else{
            $descripcionComplejo.closest(".form-group").removeClass("has-error");
            $descripcionComplejo.siblings(".glyphicon-remove").addClass("hide");
            $descripcionComplejo.siblings(".help-block").html("");
        }
        
        return bRetorno;
    };

})(jQuery)