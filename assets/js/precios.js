(function($){
      
    var URI = {
        GET : 'actions/actionPrecios.php?action=obtener',
        GETFORMATOS : 'actions/actionPrecios.php?action=obtenerFormatos',
        UPDATE : 'actions/actionPrecios.php?action=modificar',
        ADD : 'actions/actionPrecios.php?action=nuevo',
        REMOVE : 'actions/actionPrecios.php?action=eliminar',
    };

    $contenedorPrecios = $("#contenedorPrecios");
    $botonAddPrecio = $("#btnAdd");       
    $form =  $('#formPrecio');
    $cmbFormatos =  $('#comboFormato');
    $btnText = $('#btnText')
    $iconButton = $('#iconButton')

    $idPrecio =  $('#idPrecio');
    $descripcionPrecio =  $('#descripcionPrecio');
    $valorPrecio =  $('#valorPrecio');

    $( document ).ready(function(){
        obtenerFormatos();
        obtenerPrecios();
    });

    function obtenerFormatos()
    {   
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
                    $formatos = $formatos + '<option value="'+item.idFormato+'">'+item.descripcion+'</option>';
                });
                //lo agrego al listado
                $cmbFormatos.append($formatos);
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });
               
    };
    
     function obtenerPrecios()
    {   
       var obtener = $.ajax({
            url : URI.GET,
            method : "GET",
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
                                    '<div id="btnUpdate" class="updatePrecio">'+
                                        '<span class="glyphicon glyphicon-pencil lapiz"></span>'+    
                                    '</div>'+
                                    '<div id="btnRemove" class="removePrecio">'+
                                        '<span class="glyphicon glyphicon-remove cruz"></span>'+    
                                    '</div>'+                            
                                '</li>'+
                            '</ul>'+                            
                        '</div>';
                    
                });
                //lo agrego al listado
                $contenedorPrecios.append($precios);
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
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
        
        idFormato = $("#comboFormato option:contains('"+$formato+"')").val();
      
        $cmbFormatos.val(idFormato);
        
        $btnText.text("Modificar");
        $iconButton.removeClass('glyphicon glyphicon-plus');
        $iconButton.addClass('glyphicon glyphicon-pencil');       
    });


})(jQuery)