(function($){
      
    var URI = {
        COMPLEJOS : 'actions/actionComplejos.php?action=obtener',
        PELICULASCARTELERA : 'actions/actionPeliculas.php?action=obtenerCartelera'
        
    };

    $cmbComplejos = $("#cmbComplejos");

    $cmbComplejos = $("#cmbComplejos");
    $( document ).ready(function(){
            obtenerComplejos();
            otenerPeliculasCartelera();
            
        
        //bindeos
            
        
    });

    function obtenerComplejos()
    {   
        var obtener = $.ajax({
            url : URI.COMPLEJOS,
            method : "GET",
            dataType : 'json',
        });
       
        obtener.done(function(res){
            if(!res.error){
                $complejos = '<option value="0">Seleccioná un complejo</option>';
                //Borro el listado actual
                $cmbComplejos.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){
                    $complejos = $complejos + '<option value="'+item.idComplejo+'">'+item.nombre+'</option>';
                });
                //lo agrego al listado
                $cmbComplejos.append($complejos);
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });
               
    };
    //obtiene peliculas y completa la cartelera
    function otenerPeliculasCartelera(){
       
        var obtener = $.ajax({
            url : URI.PELICULASCARTELERA,
            method : "GET",
            dataType : 'json',
        });
        
         obtener.done(function(res){
            if(!res.error){

                //Itero sobre la lista
                res.data.forEach(function(item){
                   
                    var peliculaCartelera = 
                        $('<a/>',   {
                            'href'   :  'compraDesdeMosaico.php?idPelicula='+ item.idPelicula
                        }).append(
                            $('<img/>', {
                                'class' :   'pelicula',
                                'id'    :   'pelicula' + item.idPelicula,
                                'src'   :   item.imagen,
                                'data-toggle':  "tooltipCartelera",
                                'title' :   item.titulo
                            })
                        
                        );
                    
                        
                    
                    $('#contenedorPeliculas').append(peliculaCartelera);
                });
                //inicializo tooltips de peliulas
                 $('[data-toggle="tooltipCartelera"]').tooltip();
                
                
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText);
        });
    
    };
    
    
    
    
    
})(jQuery)