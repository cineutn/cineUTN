 var URI = {        
        PELICULAS : 'actions/actionPeliculas.php?action=obtenerPeliculasActivas',
        INICIOSEMANA : 'actions/actionsemanaNueva.php?action=fechaInicioSemana',
        SALAS : 'actions/actionAltaSala.php?action=obtener',
        SEMANA : 'actions/actionsemanaNueva.php?action=diasSemana',     
    };

$nroSemana =$("#nroSemana").val();
$contenedorPeliculas =$("#contenedorPeliculas");
$contenedorSalas =$("#contenedorSalas");
$contenedorSemana =$("#contenedorSemana");

$(document ).ready(function(){	  
    $fehaInicioSemana= obtenerInicioSemana();
    obtenerPeliculas($fehaInicioSemana);
    obtenerSalas();
    obtenerDias();
    
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

function obtenerSalas(){           
    var obtener = $.ajax({
        url : URI.SALAS,
        method : "GET",     
        dataType : 'json',
    });
    obtener.done(function(res){
        if(!res.error){            
           $row='';
            $contenedorSalas.html("");            
            res.data.forEach(function(item){                
                $row=$row +'<li><input type="hidden" id="idPelicula" value='+item.idSala+' ></input><a>'+item.descripcion+'</a></li>';                                
            });
            $contenedorSalas.after($row);
        }else{
            event.preventDefault();
            alert(res.mensaje);
        }
    });

    obtener.fail(function(res){
        alert(res.responseText)
    });
};

function obtenerDias(){
    var obtener = $.ajax({
        url : URI.SEMANA,
        method : "GET",   
        data: {
                numeroSemana:$nroSemana
				  },
        dataType : 'json',
    });
    obtener.done(function(res){
        if(!res.error){
            console.log(res);
           $row='';
            $contenedorSemana.html("");            
            res.data.forEach(function(item){                
                $row=$row +'<li><input type="hidden" id="idPelicula" value='+item.idSemana+' ></input><a>'+item.fecha+'</a></li>';                                
            });
            $contenedorSemana.after($row);
        }else{
            event.preventDefault();
            alert(res.mensaje);
        }
    });

    obtener.fail(function(res){
        alert(res.responseText)
    });
};