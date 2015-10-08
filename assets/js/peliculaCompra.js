(function($){
    var URI = {        
        FUNCION : 'actions/actionPeliculaCompra.php?action=obtener',
		PRECIOS : 'actions/actionPeliculaCompra.php?action=obtener',
    };
    
	//$idFuncion = $("#idFuncion");
    $tituloPelicula =$("#tituloPelicula");
    $complejo =$("#complejo");
    $diaFuncion =$("#diaFuncion");
    $horarioFuncion =$("#horarioFuncion");
    $sala =$("#sala");
    $imagenPelicula=$("#imagenPelicula");
    $idTipoFuncion=$("#idTipoFuncion").val();
    
    $( document ).ready(function(){	   
        obtenerDetalleFuncion();
    });
	
    
    function obtenerDetalleFuncion()
    {   
         //$id = $idFuncion.val();
        $funcionID=1;
        var obtener = $.ajax({
            url : URI.FUNCION,
            method : "GET",
             data: {idFuncion:$funcionID},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){		
                 $("#tituloPelicula").text(res.data[0].titulo+'('+res.data[0].clasificacion+')');
                $("#complejo").text(res.data[0].descripcion);
                $("#diaFuncion").text(res.data[0].dia);
                $("#horarioFuncion").text(res.data[0].horario);
                $("#sala").text(res.data[0].sala);               
                $("#detalleCompra").text(res.data[0].titulo+' '+res.data[0].idioma+' ('+res.data[0].clasificacion+')');                
                $("#idTipoFuncion").val(res.data[0].idTipoFuncion);
                 $imagen = '<img id="imagenPelicula" src='+res.data[0].imagen+' class="img-responsive" alt="Responsive image">';                
                $imagenPelicula.append($imagen);
                idTipoFuncion
                console.log(res.data[0]);
                obtenerPrecioFuncion();       
            }else{
                
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });

    };    
    
      function obtenerPrecioFuncion()
    {   
         //$id = $idFuncion.val();
        
        var obtener = $.ajax({
            url : URI.PRECIOS,
            method : "GET",
             data: {idFuncion:$idTipoFuncion},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){		
                
                console.log(res.data[0]);
                               
            }else{
                
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });

    }; 


})(jQuery)

