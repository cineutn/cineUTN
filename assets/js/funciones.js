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


  var getIntervalo = function(fecha){
    var fechaRetorno = '';

    var date1 = new Date(fecha);
    var date2 = new Date();

    var diff = date2.getTime() - date1.getTime();

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -=  days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    var mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    var seconds = Math.floor(diff / (1000));
    diff -= seconds * (1000);


    if (days>0){
      var mes = date1.getMonth() + 1;
      var dia = date1.getUTCDate();
     
      switch(mes) {
        case 1:
            fechaRetorno = dia + ' de Ene.';
            break;
        case 2:
            fechaRetorno = dia + ' de Feb.';
            break;
        case 3:
            fechaRetorno = dia + ' de Mar.';
            break;
        case 4:
            fechaRetorno = dia + ' de Abr.';
            break;
        case 5:
            fechaRetorno = dia + ' de May.';
            break;
        case 6:
            fechaRetorno = dia + ' de Jun.';
            break;
        case 7:
            fechaRetorno = dia + ' de Jul.';
            break;
        case 8:
            fechaRetorno = dia + ' de Ago.';
            break;
        case 9:
            fechaRetorno = dia + ' de Sep.';
            break;
        case 10:
            fechaRetorno = dia + ' de Oct.';
            break;
        case 11:
            fechaRetorno = dia + ' de Nov.';
            break;
        case 12:
            fechaRetorno = dia + ' de Dic.';
            break;    
      }

    }else if(hours>0){
      fechaRetorno = hours + ' h';
    }else{
      fechaRetorno = mins + ' min';
    }

    return fechaRetorno;
  }  
