    var URI = {        
        FUNCION : 'actions/actionPeliculaCompra.php?action=obtener',
		PRECIOS : 'actions/actionPeliculaCompra.php?action=obtenerPrecios',
    };
    
	//$idFuncion = $("#idFuncion");
    $tituloPelicula =$("#tituloPelicula");
    $complejo =$("#complejo");
    $diaFuncion =$("#diaFuncion");
    $horarioFuncion =$("#horarioFuncion");
    $sala =$("#sala");
    $imagenPelicula=$("#imagenPelicula");
    $idTipoFuncion=$("#idTipoFuncion").val();
    $precios=$("#precios");
    $cantidadEntradas=$("#cantidadEntradas").val();
    $(document ).ready(function(){	   
        obtenerDetalleFuncion();  
    });
	
    
    function obtenerDetalleFuncion()
    {   
         //$id = $idFuncion.val();
        $funcionID=1;//cambiarrrrr hay que pasarle el id de la funcion elegida en la pantalla anterior
        var obtener = $.ajax({
            url : URI.FUNCION,
            method : "GET",
             data: {idFuncion:$funcionID},
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
                      '<th class="columnaCantidad"><select name="" onchange="cantidad(this)"class="form-control comboCantidad">'+
                                '<option value="0">0</option>'+
                                '<option value="1">1</option>'+
                                '<option value="2">2</option>'+
                                '<option value="3">3</option>'+
                                '<option value="4">4</option>'+
                                '<option value="5">5</option>'+
                                '<option value="6">6</option>'+
                            '</select></th><th class="columnaPrecio">'+item.valor+'$</th></tr>';               
                
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

    if($("#cantidadEntradas").val()>6){
    alert('Debe elegir menos de 6 entradas');
        return;
    }
    else if($("#cantidadEntradas").val()>0){    
        location.href='ventaButacas.php';
    }
    
}


    //aca obtengo el valor seleccionado del combo
    function cantidad(combo){ 

        var cantidad=parseInt($("#cantidadEntradas").val());
        cantidad=cantidad+parseInt(combo.value);
        $("#cantidadEntradas").val(cantidad)
        
    }

