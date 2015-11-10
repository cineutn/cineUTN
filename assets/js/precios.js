(function($){
      
    $('title').html("Precios");

    var URI = {
        GET : 'actions/actionPrecios.php?action=obtener',
        GETFORMATOS : 'actions/actionPrecios.php?action=obtenerFormatos',
        UPDATE : 'actions/actionPrecios.php?action=modificar',
        ADD : 'actions/actionPrecios.php?action=nuevo',
        REMOVE : 'actions/actionPrecios.php?action=eliminar',
        VALIDAR : 'actions/actionPrecios.php?action=validar'
    };

    $contenedorPrecios = $("#contenedorPrecios");
    $botonAddPrecio = $("#btnAdd");       
    $form =  $('#form-Precio');
    $cmbFormatos =  $('#comboFormato');
    $btnText = $('#btnText')
    $iconButton = $('#iconButton')
    $btnAltaModificacion = $("#btnAltaModificacion");
    $btnCerrar = $("#iconCerrar");

    $idPrecio =  $('#idPrecio');
    $descripcionPrecio =  $('#descripcionPrecio');
    $valorPrecio =  $('#valorPrecio');

    $( document ).ready(function(){
        obtenerFormatos();
        obtenerPrecios();
        ocultarBotones();
    });

    function ocultarBotones(){

        var tipoUsuario;

        $tipoUsuario = sessionStorage.getItem('tipoUsuario');

        if ($tipoUsuario == "administrador" ||$tipoUsuario == "superAdministrador"){
            $(".updatePrecio").removeClass("hide");
            $(".removePrecio").removeClass("hide");
            $botonAddPrecio.removeClass("hide");
        }else{
            $(".updatePrecio").addClass("hide");
            $(".removePrecio").addClass("hide");
            $botonAddPrecio.addClass("hide");
        }
    };

    function obtenerFormatos(){   
       var obtener = $.ajax({
            url : URI.GETFORMATOS,
            method : "GET",
            dataType : 'json',
        });
       
        obtener.done(function(res){
            if(!res.error){
                $formatos = '<option value="0">Seleccione un formato</option>';
                //Borro el listado actual
                $cmbFormatos.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){
                    $formatos = $formatos + '<option value="'+item.descripcion+'">'+item.descripcion+'</option>';
                });
                //lo agrego al listado
                $cmbFormatos.append($formatos);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('Precios');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('Precios');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });         
    };
    
    function obtenerPrecios(){   
       var obtener = $.ajax({
            url : URI.GET,
            method : "GET",
            async:false,
            dataType : 'json',
        });
       
        obtener.done(function(res){
            if(!res.error){
                $formato = '';
                $precios= '';
                //Borro el listado actual
                $contenedorPrecios.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){

                    if ($formato != item.Formato){

                        if ($formato != '')
                         {
                            $precios = $precios + '</div>';
                         }

                        $formato = item.Formato;
                        
                        $precios = $precios + 
                        '<div class="Formato">'+
                        '<div class=" col-md-12 sombra"></div>'+
                        '<h3 class="precios-Titulo col-md-12">Sala '+  $formato +'</h3>';
                        
                    }

                    $precios = $precios + 
                        '<div class="col-md-3 objeto-precio">'+
                            '<input id="idPrecio" name="idPrecio" type="hidden" class="hide" value="'+item.idPrecio+'">'+
                            '<ul class="columna-Precio">'+
                                '<li class="columna-Titulo">'+
                                    '<h3 id="precio-descripcion">'+item.descripcion+'</h3>'+
                                '</li>'+
                                '<li class="columna-Detalle">'+
                                    '<span id="valor-precio">'+item.valor+'</span>'+                                    
                                    '<span class="simbolo">$</span>'+
                                    '<span class="detalle-texto">Por Persona</span>'+
                                '</li>'+
                                '<li class="columna-footer">'+
                                    '<div id="btnUpdate" class="updatePrecio lapiz">'+
                                        '<span class="glyphicon glyphicon-pencil "></span>'+    
                                    '</div>'+
                                    '<div id="btnRemove" class="removePrecio cruz" data-toggle="confirmation-singleton">'+
                                        '<span class="glyphicon glyphicon-remove "></span>'+    
                                    '</div>'+                            
                                '</li>'+
                            '</ul>'+                            
                        '</div>';
                    
                });
                //lo agrego al listado
                $contenedorPrecios.append($precios);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('Precios');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('Precios');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
               
    };

    $botonAddPrecio.on("click",function(){
        $form.removeClass("hide");
        $idPrecio.val("0");
        $descripcionPrecio.val("");
        $valorPrecio.val("");
        $cmbFormatos.val("0");

        $btnText.text("Crear");
        $iconButton.removeClass('glyphicon glyphicon-pencil');
        $iconButton.addClass('glyphicon glyphicon-plus');
    });

    $contenedorPrecios.on("click",".lapiz",function(event){
        event.preventDefault();

        $form.removeClass("hide");
       
        $divPadre = $(this).closest('.objeto-precio');
        $precioID =  $divPadre.children('#idPrecio').val();
        $precioDescripcion =  $divPadre.children('.columna-Precio').children('.columna-Titulo').children('#precio-descripcion').text();
        $precioValor =  $divPadre.children('.columna-Precio').children('.columna-Detalle').children('#valor-precio').text();
        $precioFormato = $(this).closest('.Formato').children('.precios-Titulo').text();
        
        $idPrecio.val($precioID);
        $descripcionPrecio.val($precioDescripcion);
        $valorPrecio.val($precioValor);

        $formato = $precioFormato.substring(5,$precioFormato.length);  
        
        var formato = $("#comboFormato option:contains('"+$formato+"')").val();
      
        $cmbFormatos.val(formato);
        
        $btnText.text("Modificar");
        $iconButton.removeClass('glyphicon glyphicon-plus');
        $iconButton.addClass('glyphicon glyphicon-pencil');

        validarPrecio();   
    });
    
    $contenedorPrecios.on("click",".cruz",function(event){
        event.preventDefault();

        $(this).confirmation({
            title: '¿Desea eliminar el precio seleccionado?',
            placement: 'bottom',
            singleton: true,
            popout: false,
            href: '',
            btnOkLabel: 'Si',
            onConfirm: function() {
                $divPadre = $(this).closest('.objeto-precio');
                $precioID =  $divPadre.children('#idPrecio').val();
        
                var deletePrecio =  $.ajax({
                    url: URI.REMOVE,
                    type: 'POST',
                    data: {idPrecio:$precioID},
                    dataType: 'json',
                })

                deletePrecio.done(function(response){
                    if(!response.error){
                        $form.addClass("hide");
                        obtenerPrecios();
                    }else{
                        event.preventDefault();
                        //alert(res.mensaje);
                        $('#msgBoxTitulo').text('Precios');
                        $('#msgBoxMensaje').text(response.mensaje);
                        $('#modalMsgBox').modal('show');
                    }  
                });
            }
        });
        $(this).confirmation('show')

        /*if(confirm("¿Desea eliminar el precio seleccionado?")){

        }
        else{
            return false;
        }*/
    });

    $btnAltaModificacion.on("click", function(){

        $id = $idPrecio.val();
        $formato =  $cmbFormatos.val();
        $descripcion = $descripcionPrecio.val();
        $precio = $valorPrecio.val();

        var bValidar ;

        bValidar = validarPrecio();

        if (bValidar){

            if ($id == "0"){
            
                var addPrecio =  $.ajax({
                    url: URI.ADD,
                    type: 'POST',
                    data: {idPrecio:$id,
                           formato:$formato, 
                           descripcionPrecio:$descripcion,
                           valorPrecio:$precio},
                    dataType: 'json',
                   
                })

                addPrecio.done(function(response){
                    if(!response.error){
                        $form.addClass("hide");
                        obtenerPrecios();
                    }else{          
                          //alert(res.mensaje);
                          $('#msgBoxTitulo').text('Precios');
                          $('#msgBoxMensaje').text(response.mensaje);
                          $('#modalMsgBox').modal('show');
                    }                    
                });

            }else{

                var updatePrecio =  $.ajax({
                    url: URI.UPDATE,
                    type: 'POST',
                    data: {idPrecio:$id,
                           formato:$formato, 
                           descripcionPrecio:$descripcion,
                           valorPrecio:$precio},
                    dataType: 'json',
                   
                })

                updatePrecio.done(function(response){
                    if(!response.error){
                        $form.addClass("hide");
                        obtenerPrecios();
                    }else{          
                          //alert(res.mensaje);
                          $('#msgBoxTitulo').text('Precios');
                          $('#msgBoxMensaje').text(response.mensaje);
                          $('#modalMsgBox').modal('show');
                    } 
                });
            }

        }
    });
     
    $btnCerrar.on("click",function(){
        $form.addClass("hide");   
    });

    function validarPrecio(){
        var bRetorno = true;

        $id = $idPrecio.val();

        var formato = $cmbFormatos.val();
        if(formato == 0){
          $cmbFormatos.closest(".form-group").addClass("has-error");
          $cmbFormatos.siblings(".glyphicon-remove").removeClass("hide");
          $cmbFormatos.siblings(".help-block").html("Debe seleccionar un formato de pelicula");
          bRetorno = false;
        }else{
          $cmbFormatos.closest(".form-group").removeClass("has-error");
          $cmbFormatos.siblings(".glyphicon-remove").addClass("hide");
          $cmbFormatos.siblings(".help-block").html("");          
        }

        var descripcion = $descripcionPrecio.val();
        if(descripcion.length == 0){
          $descripcionPrecio.closest(".form-group").addClass("has-error");
          $descripcionPrecio.siblings(".glyphicon-remove").removeClass("hide");
          $descripcionPrecio.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{

            var validar =  $.ajax({
                    url: URI.VALIDAR,
                    type: 'GET',
                    data: {idPrecio:$id,
                           descripcionPrecio:descripcion,
                           formato:formato},
                    dataType: 'json',
                    async: false
                   
                })

                validar.done(function(response){
                     if(response.error){
                        $descripcionPrecio.closest(".form-group").addClass("has-error");
                        $descripcionPrecio.siblings(".glyphicon-remove").removeClass("hide");
                        $descripcionPrecio.siblings(".help-block").html(response.mensaje);
                        bRetorno = false;
                    }else{
                        $descripcionPrecio.closest(".form-group").removeClass("has-error");
                        $descripcionPrecio.siblings(".glyphicon-remove").addClass("hide");
                        $descripcionPrecio.siblings(".help-block").html("");   
                    }

                }); 
                 
        }

        var valor = parseFloat($valorPrecio.val());
        if(valor <= 0 ){
            $valorPrecio.closest(".form-group").addClass("has-error");
            $valorPrecio.siblings(".glyphicon-remove").removeClass("hide");
            $valorPrecio.siblings(".help-block").html("El precio no puede ser inferior a 0");
            bRetorno = false;
        }else if(isNaN(valor)){
            $valorPrecio.closest(".form-group").addClass("has-error");
            $valorPrecio.siblings(".glyphicon-remove").removeClass("hide");
            $valorPrecio.siblings(".help-block").html("El precio ingresado no es correcto");
            bRetorno = false;
        }else{
            $valorPrecio.val(valor);
            $valorPrecio.closest(".form-group").removeClass("has-error");
            $valorPrecio.siblings(".glyphicon-remove").addClass("hide");
            $valorPrecio.siblings(".help-block").html("");
        }
        
        return bRetorno;
    };

})(jQuery)