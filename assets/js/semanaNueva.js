
$('title').html("Funciones");

 var URI = {        
        SEMANAS : 'actions/actionsemanaNueva.php?action=obtenerNumerosemanas',       
        ULTIMA:'actions/actionsemanaNueva.php?action=obtenerUltima',
        ADD : 'actions/actionsemanaNueva.php?action=nueva',       
        FUNCIONES : 'actions/actionFunciones.php?action=obtenerPorSemana',  
        CERRAR: 'actions/actionFunciones.php?action=cerrar',  
        FUNCIONESCOMPLEJO: 'actions/actionFunciones.php?action=obtenerPorComplejo',  
    };

$contenedorSemana =$("#tablaSemana");
$btnAddRow=$("#btnAddRow");
$contenedorSemanas=$("#contenedorSemanas");
$dias = ["Jueves","Viernes","Sabado","Domingo","Lunes","Martes","Miercoles"];
$idComplejoUsuario = sessionStorage.getItem('idcomplejo');
$tipoUsuarioLogueado = sessionStorage.getItem('tipoUsuario');
 

$(document ).ready(function(){	   
        obtenerSemanas();
    });

function obtenerSemanas(){       
    var obtener = $.ajax({
        url : URI.SEMANAS,
        method : "GET",
        dataType : 'json',
    });

    obtener.done(function(res){
        if(!res.error){				            
            $row='';
            $contenedorSemana.html("");
            
            res.data.forEach(function(item){                
                $row=$row +
                '<tr id="rowSala"><td class="form-group"><span>'+item.numeroSemana+'</span></td><td class="form-group"><span>'+item.nombreDia+' ' +obtenerFecha(item.fecha)+'</span></td><td class="form-group"><span>'+obtenerFunciones(item.numeroSemana)+'</span></td>'+
                '<td><button  class="botonAzul" type="button"><i class="glyphicon glyphicon-pencil textoBoton"></i></button></td><td><button class="botonVerde" type="button"><i class="glyphicon glyphicon glyphicon-arrow-right textoBoton"></i></button></td><td><button class="botonRojo" type="button"><i class="glyphicon glyphicon glyphicon-remove textoBoton"></i></button></td></tr>';      
            });
            $contenedorSemana.append($row);
        }else{
            event.preventDefault();            
            $('#msgBoxTitulo').text('Nueva Semana');
            $('#msgBoxMensaje').text(res.mensaje);
            $('#modalMsgBox').modal('show');
        }
    });
    obtener.fail(function(res){
        //alert(res.responseText);
        $('#msgBoxTitulo').text('Nueva Semana');
        $('#msgBoxMensaje').text(res.responseText);
        $('#modalMsgBox').modal('show');
    });
};

$btnAddRow.click(function() {   

    var ultimaFecha='';
    var ultimaSemana='';
    
    var obtener = $.ajax({
        url : URI.ULTIMA,
        method : "GET",
        dataType : 'json',
        });

   obtener.done(function(res){
        if(!res.error){		            
            res.data.forEach(function(item){             
                ultimaFecha=item.fecha;
                ultimaSemana=item.numeroSemana;
            });                
            generarSemana(ultimaFecha,ultimaSemana);
        }else{
            event.preventDefault();            
            $('#msgBoxTitulo').text('Nueva Semana');
            $('#msgBoxMensaje').text(res.mensaje);
            $('#modalMsgBox').modal('show');
        }
    });
    obtener.fail(function(res){        
        $('#msgBoxTitulo').text('Nueva Semana');
        $('#msgBoxMensaje').text(res.responseText);
        $('#modalMsgBox').modal('show');
    });  
});

function generarSemana(ultimaFecha,ultimaSemana){
    ultimaSemana=parseInt(ultimaSemana);
    ultimaSemana=ultimaSemana+1;    
   
    
    $.each( $dias, function( key, value ) {        
            var addSemana =  $.ajax({
            url: URI.ADD,
            async: false,
            type: 'POST',
            data: {
                    fecha:ultimaFecha,
                    numeroSemana:ultimaSemana,
                    dias:key,
                    nombreDia:value
              },
            dataType: 'json',
        });
        addSemana.done(function(response){                
        
        });
        
        addSemana.fail(function(res){
            
            $('#msgBoxTitulo').text('Nueva Semana');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
});
    obtenerSemanas();
}  

  $contenedorSemanas.on("click",".botonAzul",function(event){
    event.preventDefault();        
    $numeroSemana= $(this).parent().parent()[0].childNodes[0].children[0].textContent;
    location.href='funciones.php?numeroSemana='+$numeroSemana;
    });

  $contenedorSemanas.on("click",".botonVerde",function(event){
    event.preventDefault();        
    $numeroSemana= $(this).parent().parent()[0].childNodes[0].children[0].textContent;
    location.href='funciesSala.php?numeroSemana='+$numeroSemana;
    });

$contenedorSemanas.on("click",".botonRojo",function(event){
    event.preventDefault();        
    $numeroSemana= $(this).parent().parent()[0].childNodes[0].children[0].textContent;
    
    
     var cerrarSemana =  $.ajax({
            url: URI.CERRAR,
            async: false,
            type: 'POST',
            data: {                    
                    numeroSemana:$numeroSemana                    
              },
            dataType: 'json',
        });
        cerrarSemana.done(function(response){                
        obtenerSemanas();
        });
    
    });



function obtenerFunciones(numeroSemana){
var nroFunciones ='0';
    if($tipoUsuarioLogueado==3){
    //muestro por complejo
        
     var obtenerPorComplejo = $.ajax({
            url : URI.FUNCIONESCOMPLEJO,
            method : "GET",
            async:false, 
              data: {
                  idComplejo:$idComplejoUsuario ,
                   nroSemana:numeroSemana                             
                },
            dataType : 'json',
        });

       obtenerPorComplejo.done(function(res){
            if(!res.error){	
                nroFunciones=res.data[0].cantidad;                                 
            }else{
                event.preventDefault();            

            }
        });
        obtener.fail(function(res){        
            $('#msgBoxTitulo').text('Nueva Semana');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
        
        
        
        
    }
    else if($tipoUsuarioLogueado==4){
    //muestro total de funciones        
         var obtener = $.ajax({
            url : URI.FUNCIONES,
            method : "GET",
            async:false, 
              data: {
                nroSemana:numeroSemana                             
                },
            dataType : 'json',
        });

       obtener.done(function(res){
            if(!res.error){	
                nroFunciones=res.data[0].cantidad;                                 
            }else{
                event.preventDefault();            

            }
        });
        obtener.fail(function(res){        
            $('#msgBoxTitulo').text('Nueva Semana');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        }); 
    }
  
  return nroFunciones;
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