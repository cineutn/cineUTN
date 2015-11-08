 var URI = {        
        PELICULAS : 'actions/actionPeliculas.php?action=obtenerPeliculasActivas',
        INICIOSEMANA : 'actions/actionsemanaNueva.php?action=fechaInicioSemana',
        SALAS : 'actions/actionAltaSala.php?action=obtener',
        SEMANA : 'actions/actionsemanaNueva.php?action=diasSemana',     
        FUNCION : 'actions/actionFunciones.php?action=nueva',     
        FUNCIONHORARIO : 'actions/actionFunciones.php?action=nuevoHorario',    
        SALADETALLE : 'actions/actionEsquemaSala.php?action=obtener',
        ADDSALAFUNCION : 'actions/actionFunciones.php?action=nuevaSala',
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
$fechaDesc='';
$idTipoFuncion='0';
//$dias = ["Jueves","Viernes","Sabado","Domingo","Lunes","Martes","Miercoles"];

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
                var subtitulos=(item.subtitulada==1)?"Subtitulada":"Castellano";
                $row=$row +'<li><a id="aPelicula_'+item.idPelicula+'" onclick="peliculaSeleccionada('+item.idPelicula+')">'+item.titulo+'  '+item.descripcion +'  '+subtitulos+'</a></li>'+
                                '<input type="hidden" id="duracion_'+item.idPelicula+'" value='+item.duracion+' ><input type="hidden" id="formato_'+item.idPelicula+'"  value='+item.idTipoFucnion+'>';  
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
        data: { numeroSemana:$nroSemana },
        dataType : 'json',
    });
    obtener.done(function(res){
        if(!res.error){            
           $row='';
            $contenedorSemana.html("");            
            res.data.forEach(function(item){ 
            $row=$row +'<li><a id="afecha_'+item.idSemana+'" onclick="fechaSeleccionada('+item.idSemana+')">'+obtenerFecha(item.fecha) +'</a><input type="hidden" id="feha_'+item.idSemana+'" value='+item.fecha+' ></li>';                                
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


function peliculaSeleccionada(idPelicula){            
    $(".peliculasLista li a").removeClass("opcionSeleccionada");  
    $(".salasLista li a").removeClass("opcionSeleccionada"); 
    $(".semanaLista li a").removeClass("opcionSeleccionada"); 
    $("#aPelicula_"+idPelicula).addClass("opcionSeleccionada");    
    $contenedorHorarios.html("");
    $idPeliculaSeleccionada=idPelicula;
    $duracionPelicula=$("#duracion_"+idPelicula).val();    
    $idSalaSeleccionada='0';
    $idSemanaSeleccionada=''; 
    $idTipoFuncion=  $("#formato_"+item.idPelicula).val();
}

function salaSeleccionada(idSala){    
    if($(".peliculasLista li a").hasClass("opcionSeleccionada")){    
        $(".salasLista li a").removeClass("opcionSeleccionada");  
        $(".semanaLista li a").removeClass("opcionSeleccionada"); 
        $("#aSala_"+idSala).addClass("opcionSeleccionada");    
        $idSalaSeleccionada=idSala;
        $idSemanaSeleccionada='';
        $contenedorHorarios.html("");
    }
};

function fechaSeleccionada(idSemana){
     
    if($(".salasLista li a").hasClass("opcionSeleccionada")){
        $(".semanaLista li a").removeClass("opcionSeleccionada");    
        $("#afecha_"+idSemana).addClass("opcionSeleccionada");
        $idSemanaSeleccionada=idSemana;  
        $fechaDesc=obtenerFecha($("#feha_"+idSemana).val());        
        buscarFuncionesActivas($idSemanaSeleccionada,$idSalaSeleccionada);
        calcularHorarioFunciones($duracionPelicula);
    }
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
    var apertura = new Date("01/01/1985 12:00:00");
    var cierre = new Date("01/01/1985 23:00:00");  
    $contenedorHorarios.html("");
    $row='';        
    while(new Date(apertura) < new Date(cierre)){        
        horaApertura = apertura.getHours();                   
        minutosApertura = ((apertura.getMinutes()<10)?'0':'')+apertura.getMinutes();
        horarioFuncion=horaApertura+':'+ minutosApertura;
        $row=$row +'<li><a>'+horarioFuncion+'  <button type="button"  onclick="crearFuncion('+horaApertura+','+minutosApertura+')" class="btn btn-default btn-circle botonVerde"><i class="glyphicon glyphicon-plus textoBoton"></i></button></a></li>';       
        apertura.setMinutes(apertura.getMinutes()+ parseInt(duracionConTrailer));        
    }
    $contenedorHorarios.append($row);
}


function crearFuncion(horaApertura,minutosApertura){ 
   //$('#modalLoading').modal('show');
   var guardarFuncion = $.ajax({
                    url : URI.FUNCION,
                    method : "POST",
                     data: {
                         idFuncion:0,
                         idPelicula:$idPeliculaSeleccionada,
                         idIdioma:1, //no se esta usando el idioma, el formato ya indica sub o no
                         idTipoFuncion:$idTipoFuncion,
                         estado:1,
                         fechaAlta:0,//en el insert se pone dateTime=now
                         idComplejo:1//cambiarrrr
                     },
                    dataType : 'json',
                });
    guardarFuncion.done(function(res){        
        if(!res.error){
                crearFuncionHorario(res.data.idFuncion,horaApertura,minutosApertura);
            }
        else{
            alert(res.error);
        }
    });
    guardarFuncion.fail(function(res){
        alert(res.responseText)
    });
}

function crearFuncionHorario(idFuncion,horaApertura,minutosApertura){   
   var guardarFuncionHorario = $.ajax({
                    url : URI.FUNCIONHORARIO,
                    method : "POST",
                     data: {
                         idFuncionDetalle:0,
                         idFuncion:idFuncion,
                         idSala:$idSalaSeleccionada,
                         dia: $fechaDesc,
                         horario:(horaApertura+':'+minutosApertura),
                         idSemana:$idSemanaSeleccionada
                       
                     },
                    dataType : 'json',
                });
    guardarFuncionHorario.done(function(res){        
        if(!res.error){                                            
                generarSalaFuncion(res.data.idFuncionDetalle,idFuncion);
            }
        else{
            alert(res.error);
        }
    });
    guardarFuncionHorario.fail(function(res){
        alert(res.responseText)
    });
}


function generarSalaFuncion(idFuncionDetalle,idFuncion){
    var obtener = $.ajax({
        url : URI.SALADETALLE,
        method : "GET",
         data: {idSala:$idSalaSeleccionada},
        dataType : 'json',
    });   
    obtener.done(function(res){
    if(!res.error){               
        if(res.data[0].fila!=null){                                     

            res.data.forEach(function(item){  
                console.log(item);
                insertarSalaFuncion(idFuncion,item.columna,item.fila,item.habilitada,$idSalaSeleccionada,idFuncionDetalle);
            }); 
            //$('#modalLoading').modal('hide');
            alert('Funcion creada con exito');
            //habilitar el boton de eliminar
        }
      }
    });    
    obtener.fail(function(res){
        alert(res.responseText)
    });
}

function insertarSalaFuncion(idFucnion,columna,fila,habilitada,idSala,idFuncionDetalle){ 
    
var addSalaFuncion =  $.ajax({
        url: URI.ADDSALAFUNCION,
        type: 'POST',
        data: {
                idSalaFuncion:0,
                idFucnion:idFucnion,
                columna:columna,
                fila:fila,				        
                habilitada:habilitada,
                idSala:idSala,
                idFuncionDetalle:idFuncionDetalle
          },
        dataType: 'json',
    })
    addSalaFuncion.done(function(response){	 
          if(!response.error){  
            console.log(response);
          }        
    }); 
    addSalaFuncion.fail(function(response){
        alert(response.responseText)
    });
}

function obtenerFecha(fecha){
    var fechaRetorno = '';

  var date1 = new Date(fecha);
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
    return fechaRetorno;
  } 