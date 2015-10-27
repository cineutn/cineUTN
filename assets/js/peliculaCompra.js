    var URI = {        
        FUNCION : 'actions/actionPeliculaCompra.php?action=obtener',
		PRECIOS : 'actions/actionPeliculaCompra.php?action=obtenerPrecios',
    };
    
	$idFuncionDetalle = $("#idFuncionDetalle").val();
    $tituloPelicula =$("#tituloPelicula");
    $complejo =$("#complejo");
    $diaFuncion =$("#diaFuncion");
    $horarioFuncion =$("#horarioFuncion");
    $sala =$("#sala");
    $imagenPelicula=$("#imagenPelicula");
    $idTipoFuncion=$("#idTipoFuncion").val();
    $precios=$("#precios");

    $(document ).ready(function(){	   
        obtenerDetalleFuncion();  
      
    });
	
    
    function obtenerDetalleFuncion()
    {        
        $funcionDetalleID=$idFuncionDetalle;
        var obtener = $.ajax({
            url : URI.FUNCION,
            method : "GET",
             data: {idFuncion:$funcionDetalleID},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){		
                $("#tituloPelicula").text(res.data[0].titulo+'('+res.data[0].clasificacion+')');
                $("#complejo").text(res.data[0].nombre);
                $("#diaFuncion").text(res.data[0].dia);
                $("#horarioFuncion").text(res.data[0].horario);
                $("#sala").text(res.data[0].sala);               
                $("#detalleCompra").text(res.data[0].titulo+' '+res.data[0].idioma+' ('+res.data[0].clasificacion+')');                
                $("#idTipoFuncion").val(res.data[0].idTipoFuncion);
                 $imagen = '<img id="imagenPelicula" src='+res.data[0].imagen+' class="img-responsive" alt="Responsive image">';                
                $imagenPelicula.append($imagen);                
                obtenerPrecioFuncion();                
            }else{
                
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });

    };    
    
      function obtenerPrecioFuncion(){           
        $TipoFuncionid = $("#idTipoFuncion").val();        
        var obtener = $.ajax({
            url : URI.PRECIOS,
            method : "GET",
             data: {tipoFuncionID:$TipoFuncionid},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){		
                $precio='';                
                res.data.forEach(function(item){
                $precio =$precio +
                     '<tr><td class="columnaEntradaDescripcion"><SPAN>'+item.descripcion +'<SPAN></td >'+
                      '<th class="columnaCantidad"><select name="" class="form-control comboCantidad">'+
                                '<option value="0">0</option>'+
                                '<option value="1">1</option>'+
                                '<option value="2">2</option>'+
                                '<option value="3">3</option>'+
                                '<option value="4">4</option>'+
                                '<option value="5">5</option>'+
                                '<option value="6">6</option>'+
                            '</select></th><input type="hidden" value="'+item.idPrecio+'"><th class="columnaPrecio">'+item.valor+'$</th></tr>';               
                
                });
                $precios.append($precio);
                
                
            }else{
                
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });

    };

function validarCompra(){

    var cantidades=[];
    var precios=[];
    var cantidad= 0;
    var precioTotal=0;
    var idPrecio=[];
    var ids=[];
    $( ".comboCantidad option:selected" ).each(function() {   
        
        cantidad=cantidad+parseInt($(this).text());
        cantidades.push($(this).text());
    });   
    
    
    $('#precios tr').each(function() {  
        idPrecio.push($(this).children('input').val());        
        precios.push($(this).find(".columnaPrecio").html());

        
    });
    
    sessionStorage.setItem('idPreciosGrilla',idPrecio);
    
    for(var i=0;i<cantidades.length;i++){        
        var sinMoneda = precios[i].split('$');
        precioTotal= precioTotal +(cantidades[i] *sinMoneda[0]);        
        if(cantidades[i]>0){
            ids.push(idPrecio[i])
        }
        
    }
    
    if(cantidad>6){
    alert('Debe elegir menos de 6 entradas');
        return;
    }
    else if(cantidad>0){            
        sessionStorage.setItem('idPrecios',ids);
        sessionStorage.setItem('cantidadEntradas',cantidades);
        sessionStorage.setItem('preciosEntradas',precios);
        location.href='ventaButacas.php?cantidadEntradas='+cantidad+'&precio='+precioTotal+',&idFuncionDetalle='+$idFuncionDetalle;        
    }
    
}

