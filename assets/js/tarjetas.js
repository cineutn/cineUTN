(function($){
      
    var URI = {
        GET : 'actions/actionTarjetas.php?action=obtener',
        UPDATE : 'actions/actionTarjetas.php?action=modificar',
        ADD : 'actions/actionTarjetas.php?action=nuevo',
        REMOVE : 'actions/actionTarjetas.php?action=eliminar',
    };

    $contenedorTarjetas = $("#contenedorTarjetas");
    $botonAddPrecio = $("#btnAdd");       
    $form =  $('#form-Tarjeta');
    $btnText = $('#btnText')
    $iconButton = $('#iconButton')
    $btnAltaModificacion = $("#btnAltaModificacion");
    $btnCerrar = $("#iconCerrar");

    $idTarjeta =  $('#idTarjeta');
    $empresa =  $('#empresa');
    $cantNumeros =  $('#cantNumeros');
    $codigoSeguridad =  $('#codigoSeguridad');

    $( document ).ready(function(){
        obtenerTarjetas();
        ocultarBotones();
    });

    function ocultarBotones(){

        var tipoUsuario;

        $tipoUsuario = sessionStorage.getItem('tipoUsuario');

        if ($tipoUsuario == "administrador"){
            $(".updateTarjeta").removeClass("hide");
            $(".removeTarjeta").removeClass("hide");
            $botonAddPrecio.removeClass("hide");
        }else{
            $(".updateTarjeta").addClass("hide");
            $(".removeTarjeta").addClass("hide");
            $botonAddPrecio.addClass("hide");
        }
    
    };
 
    function obtenerTarjetas()
    {   
       var obtener = $.ajax({
            url : URI.GET,
            method : "GET",
            async:false,
            dataType : 'json',
        });
       
        obtener.done(function(res){
            if(!res.error){
                $tarjetas= '<div class=" col-md-12 sombra"></div>';
                //Borro el listado actual
                $contenedorTarjetas.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){

                    $tarjetas = $tarjetas + 
                        '<div class="col-md-3 objeto-tarjeta">'+
                            '<input id="tarjeta-idTarjeta" name="tarjeta-idTarjeta" type="hidden" class="hide" value="'+item.idTarjeta+'">'+
                            '<input id="tarjeta-cantNumeros" name="tarjeta-cantNumeros" type="hidden" class="hide" value="'+item.cantNumeros+'">'+
                            '<input id="tarjeta-codSeguridad" name="tarjeta-codSeguridad" type="hidden" class="hide" value="'+item.codigoSeguridad+'">'+
                            '<ul class="columna-Tarjeta">'+
                                '<li class="columna-Titulo">'+
                                    '<h3 id="tarjeta-empresa">'+item.empresa+'</h3>'+
                                '</li>'+
                                '<li class="columna-Detalle">'+
                                    '<span id="iconAvatar" class="glyphicon glyphicon-credit-card"></span>'+
                                '</li>'+
                                '<li class="columna-footer">'+
                                    '<div id="btnUpdate" class="updateTarjeta">'+
                                        '<span class="glyphicon glyphicon-pencil lapiz"></span>'+    
                                    '</div>'+
                                    '<div id="btnRemove" class="removeTarjeta">'+
                                        '<span class="glyphicon glyphicon-remove cruz"></span>'+    
                                    '</div>'+                            
                                '</li>'+
                            '</ul>'+                            
                        '</div>';
                    
                });
                //lo agrego al listado
                $contenedorTarjetas.append($tarjetas);
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
        $idTarjeta.val("0");
        $empresa.val("");
        $cantNumeros.val("");
        $codigoSeguridad.val("");

        $btnText.text("Crear");
        $iconButton.removeClass('glyphicon glyphicon-pencil');
        $iconButton.addClass('glyphicon glyphicon-plus');
    });

    $contenedorTarjetas.on("click",".lapiz",function(event){
        event.preventDefault();

        $form.removeClass("hide");
       
        $divPadre = $(this).closest('.objeto-tarjeta');
        $tarjetaID =  $divPadre.children('#tarjeta-idTarjeta').val();
        $cantidadNumeros =  $divPadre.children('#tarjeta-cantNumeros').val();
        $codSeguridad =  $divPadre.children('#tarjeta-codSeguridad').val();
        $empresaNombre =  $divPadre.children('.columna-Tarjeta').children('.columna-Titulo').children('#tarjeta-empresa').text();
                
        $idTarjeta.val($tarjetaID);
        $empresa.val($empresaNombre);
        $cantNumeros.val($cantidadNumeros);
        $codigoSeguridad.val($codSeguridad);      
        
        $btnText.text("Modificar");
        $iconButton.removeClass('glyphicon glyphicon-plus');
        $iconButton.addClass('glyphicon glyphicon-pencil');       
    });
    
    $contenedorTarjetas.on("click",".cruz",function(event){
        event.preventDefault();

        if(confirm("¿Desea eliminar la tarjeta seleccionada?")){
            $divPadre = $(this).closest('.objeto-tarjeta');
            $tarjetaID =  $divPadre.children('#tarjeta-idTarjeta').val();
        
            var deleteTarjeta =  $.ajax({
                url: URI.REMOVE,
                type: 'POST',
                data: {idTarjeta:$tarjetaID},
                dataType: 'json',
            })

            deleteTarjeta.done(function(response){
                $form.addClass("hide");
                obtenerTarjetas();
            });

        }
        else{
            return false;
        }
    });

    $btnAltaModificacion.on("click", function(){

        $id = $idTarjeta.val();
        $empresaTarjeta =  $empresa.val();
        $cantidadNumerosTarjeta = $cantNumeros.val();
        $codigoSeguridadTarjeta = $codigoSeguridad.val();

        var bValidar ;

        bValidar = validarTarjeta();

        if (bValidar){

            if ($id == "0"){
            
                var addTarjeta =  $.ajax({
                    url: URI.ADD,
                    type: 'POST',
                    data: {idTarjeta:$id,
                           empresa:$empresaTarjeta, 
                           cantNumeros:$cantidadNumerosTarjeta,
                           codigoSeguridad:$codigoSeguridadTarjeta},
                    dataType: 'json'
                   
                })

                addTarjeta.done(function(response){
                    $form.addClass("hide");
                    obtenerTarjetas();
                });

            }else{

                var updateTarjeta =  $.ajax({
                    url: URI.UPDATE,
                    type: 'POST',
                    data: {idTarjeta:$id,
                           empresa:$empresaTarjeta, 
                           cantNumeros:$cantidadNumerosTarjeta,
                           codigoSeguridad:$codigoSeguridadTarjeta},
                    dataType: 'json'
                   
                })

                updateTarjeta.done(function(response){
                    $form.addClass("hide");
                    obtenerTarjetas();
                });
            }

        }
    });
     
    $btnCerrar.on("click",function(){
        $form.addClass("hide");   
    });

    function validarTarjeta(){
        var bRetorno = true;

        var nombreEmpresa = $empresa.val();
        if(nombreEmpresa.length == 0){
          $empresa.closest(".form-group").addClass("has-error");
          $empresa.siblings(".glyphicon-remove").removeClass("hide");
          $empresa.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $empresa.closest(".form-group").removeClass("has-error");
          $empresa.siblings(".glyphicon-remove").addClass("hide");
          $empresa.siblings(".help-block").html("");          
        }

        var cantNumerosTarjeta = parseInt($cantNumeros.val());
        if(cantNumerosTarjeta <= 0 ){
            $cantNumeros.closest(".form-group").addClass("has-error");
            $cantNumeros.siblings(".glyphicon-remove").removeClass("hide");
            $cantNumeros.siblings(".help-block").html("La cantidad ingresada no puede ser inferior a 0");
            bRetorno = false;
        }else if(isNaN(cantNumerosTarjeta)){
            $cantNumeros.closest(".form-group").addClass("has-error");
            $cantNumeros.siblings(".glyphicon-remove").removeClass("hide");
            $cantNumeros.siblings(".help-block").html("La cantidad ingresada no es correcta");
            bRetorno = false;
        }else{
            $cantNumeros.val(cantNumerosTarjeta);
            $cantNumeros.closest(".form-group").removeClass("has-error");
            $cantNumeros.siblings(".glyphicon-remove").addClass("hide");
            $cantNumeros.siblings(".help-block").html("");
        }
        
        var codSeguridadTarjeta = parseInt($codigoSeguridad.val());
        if(codSeguridadTarjeta <= 0 ){
            $codigoSeguridad.closest(".form-group").addClass("has-error");
            $codigoSeguridad.siblings(".glyphicon-remove").removeClass("hide");
            $codigoSeguridad.siblings(".help-block").html("La cantidad ingresada no puede ser inferior a 0");
            bRetorno = false;
        }else if(isNaN(codSeguridadTarjeta)){
            $codigoSeguridad.closest(".form-group").addClass("has-error");
            $codigoSeguridad.siblings(".glyphicon-remove").removeClass("hide");
            $codigoSeguridad.siblings(".help-block").html("La cantidad ingresada no es correcta");
            bRetorno = false;
        }else{
            $codigoSeguridad.val(codSeguridadTarjeta);
            $codigoSeguridad.closest(".form-group").removeClass("has-error");
            $codigoSeguridad.siblings(".glyphicon-remove").addClass("hide");
            $codigoSeguridad.siblings(".help-block").html("");
        }

        return bRetorno;
    };

})(jQuery)