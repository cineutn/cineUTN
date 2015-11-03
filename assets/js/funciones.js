 var URI = {        
        PELICULAS : 'actions/actionPeliculas.php?action=obtenerPeliculasActivas',
        INICIOSEMANA : 'actions/actionsemanaNueva.php?action=fechaInicioSemana',
    };

$nroSemana =$("#nroSemana").val();
$contenedorPeliculas =$("#contenedorPeliculas");

$(document ).ready(function(){	  
    $fehaInicioSemana= obtenerInicioSemana();
    obtenerPeliculas($fehaInicioSemana);
    //obtenerSalas();
    //obtenerDias();
    
    });

function obtenerInicioSemana(){   
    $fehaInicioSemana='';    
    var obtener = $.ajax({
        url : URI.INICIOSEMANA,
        async: false,
        method : "GET",
        data: {
                numeroSemana:$nroSemana
				  },
        dataType : 'json',
    });
    obtener.done(function(res){
        if(!res.error){          
            $fehaInicioSemana =res.data.fecha;            
        }else{
            event.preventDefault();
            alert(res.mensaje);
        }
    });
    obtener.fail(function(res){
        alert(res.responseText)
    });
    return $fehaInicioSemana;
};


function obtenerPeliculas($fehaInicioSemana){   
    
    console.log($fehaInicioSemana);
    var obtener = $.ajax({
        url : URI.PELICULAS,
        method : "GET",
        data: {
            fechaSemana:$fehaInicioSemana
        },
        dataType : 'json',
    });

    obtener.done(function(res){
        if(!res.error){
            $row='';
            $contenedorPeliculas.html("");            
            res.data.forEach(function(item){                
                $row=$row +'<li><input type="hidden" id="idPelicula" value='+item.idPelicula+' ></input><a>'+item.titulo+'</a></li>'+
                                '<input type="hidden" id="duracion" value='+item.duracion+' >';
            });
            $contenedorPeliculas.after($row);
        }else{
            event.preventDefault();
            alert(res.mensaje);
        }
    });

    obtener.fail(function(res){
        alert(res.responseText)
    });

};