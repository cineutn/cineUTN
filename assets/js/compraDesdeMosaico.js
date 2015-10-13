(function($){
    var URI = {        
        PELICULA : 'actions/actionPeliculas.php?action=obtenerPeliculaById',		
    }; 
    
    $( document ).ready(function(){  
            otenerPeliculabyID();   
    });
    

    //funciones
    function otenerPeliculabyID(){
       
        var obtener = $.ajax({
            url : URI.PELICULA,
            method : "GET",
            dataType : 'json',
            data  :   {
                'id' : '1'
            }
        });
        
         obtener.done(function(res){
            if(!res.error){
                var pelicula = res.data[0];
                $('.titulo').html(pelicula.titulo);
                $('.imagenPelicula img').attr('src',pelicula.imagen);
                $('.descripcionPelicula').html(pelicula.sinopsis);
                $('.fichaTecnica p').html(
                    'Genero: '+pelicula.genero +'<br>Duración: '+ pelicula.duracion+'min <br>Actores: ' + pelicula.actores + '<br>Director: ' + pelicula.director + ' <br>Clasificación: ' + pelicula.clasificacion + '<br><br>'
                
                ); 
                $('.embed-responsive-item').attr('src',pelicula.trailer);
                
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