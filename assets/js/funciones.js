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
$contenedorHorarios =$("#contenedorHorarios");
$idPeliculaSeleccionada='0';
$duracionPelicula='0';
$idSalaSeleccionada='0';
$idSemanaSeleccionada=''


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
                $row=$row +'<li></input><a id="aPelicula_'+item.idPelicula+'" onclick="peliculaSeleccionada('+item.idPelicula+')">'+item.titulo+'</a></li>'+
                                '<input type="hidden" id="duracion_'+item.idPelicula+'" value='+item.duracion+' >';
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
                $row=$row +'<li><input type="hidden" id="sala_'+item.idSala+'" value='+item.idSala+'></input><a id="aSala_'+item.idSala+'" onclick="salaSeleccionada('+item.idSala+')" >'+item.descripcion+'</a></li>';                                
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
           $row='';
            $contenedorSemana.html("");            
            res.data.forEach(function(item){                  
                $row=$row +'<li></input><a id="afecha_'+item.idSemana+'" onclick="fechaSeleccionada('+item.idSemana+')">'+obtenerFecha(item.fecha) +'</a></li>';                                
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


 function obtenerFecha(fecha){
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

function peliculaSeleccionada(idPelicula){        
    
    $(".peliculasLista li a").removeClass("opcionSeleccionada");  
    $(".salasLista li a").removeClass("opcionSeleccionada"); 
    $(".semanaLista li a").removeClass("opcionSeleccionada"); 
    $("#aPelicula_"+idPelicula).addClass("opcionSeleccionada");
    
    
    $idPeliculaSeleccionada=idPelicula;
    $duracionPelicula=$("#duracion_"+idPelicula).val();
    $idSalaSeleccionada='0';
    $idSemanaSeleccionada=''
}

function salaSeleccionada(idSala){
    
    $(".salasLista li a").removeClass("opcionSeleccionada");  
    $(".semanaLista li a").removeClass("opcionSeleccionada"); 
    $("#aSala_"+idSala).addClass("opcionSeleccionada");    
    $idSalaSeleccionada=idSala;
    $idSemanaSeleccionada=''
};

function fechaSeleccionada(idSemana){
     
    $(".semanaLista li a").removeClass("opcionSeleccionada");    
    $("#afecha_"+idSemana).addClass("opcionSeleccionada");
    $idSemanaSeleccionada=idSemana;    
    calcularHorarioFunciones($duracionPelicula);
    
    buscarFuncionesActivas($idSemanaSeleccionada,$idSalaSeleccionada);
    
};


//busca en la semana para la sala seleccionada si hay funciones cargadas para esa sala.
//las tinen que mostrar al costado de horarios y se podran modificar
function buscarFuncionesActivas(idSemana,idSala){

}

//calcula los horarios sugeridos para la pelicula.
//el cine abre a las 12 y hay 15' de preparar la sala y se le suma 10' a la duracion de la pelicula por las propagandas y trailers
//ultima funcion a las 23
function calcularHorarioFunciones(duracionPelicula){
   
    var duracionConTrailer=parseInt(duracionPelicula)+30;
    //solo me interesa la hora en esta variable
    var apertura = new Date("July 21, 1983 12:00:00");
    var horaApertura = apertura.getHours();
    //solo me interesa la hora en esta variable
    var cierre = new Date("July 21, 1983 23:00:00");
    var horaCierre = cierre.getHours();
    var minutosApertura=0;
    $contenedorHorarios.html("");
    $row='';    
    
    while(horaApertura<horaCierre){     
        horaApertura = apertura.getHours();
        minutosApertura= apertura.getMinutes();     
        minutosApertura=(minutosApertura!=0)?minutosApertura:'00';
        console.log(horaApertura+':'+minutosApertura);        
        $row=$row +'<li></input><a>'+horaApertura+':'+ minutosApertura+'</a></li>';                                 
        apertura.setMinutes(apertura.getMinutes()+ parseInt(duracionConTrailer));
    }
    $contenedorHorarios.after($row);
}




