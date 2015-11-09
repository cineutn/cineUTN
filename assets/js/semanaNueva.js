
$('title').html("Funciones");

 var URI = {        
        SEMANAS : 'actions/actionsemanaNueva.php?action=obtenerNumerosemanas',       
        ULTIMA:'actions/actionsemanaNueva.php?action=obtenerUltima',
        ADD : 'actions/actionsemanaNueva.php?action=nueva',       
    };

$contenedorSemana =$("#tablaSemana");
$btnAddRow=$("#btnAddRow");
$contenedorSemanas=$("#contenedorSemanas");

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
                '<tr id="rowSala"><td class="form-group"><span>'+item.numeroSemana+'</span></td><td class="form-group"><span>0</span></td>'+
                '<td><button  class="botonAzul" type="button"><i class="glyphicon glyphicon-pencil textoBoton"></i></button></td></tr>';      
            });
            $contenedorSemana.append($row);
        }else{
            event.preventDefault();
            //alert(res.mensaje);
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
            //cambiar a que solo traiga un row
            res.data.forEach(function(item){             
                ultimaFecha=item.fecha;
                ultimaSemana=item.numeroSemana;
            });                
            generarSemana(ultimaFecha,ultimaSemana);
        }else{
            event.preventDefault();
            //alert(res.mensaje);
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
});

function generarSemana(ultimaFecha,ultimaSemana){
    ultimaSemana=parseInt(ultimaSemana);
    ultimaSemana=ultimaSemana+1;    
   
    for(var i=1;i<=7;i++){

        var addSemana =  $.ajax({
            url: URI.ADD,
            async: false,
            type: 'POST',
            data: {
                    fecha:ultimaFecha,
                    numeroSemana:ultimaSemana,
                    dias:i
              },
            dataType: 'json',
        });

        addSemana.done(function(response){                
        
        });
        
        addSemana.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('Nueva Semana');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });

    }
    obtenerSemanas();
}  

  $contenedorSemanas.on("click",".botonAzul",function(event){
    event.preventDefault();        
    $numeroSemana= $(this).parent().parent()[0].childNodes[0].children[0].textContent;
    location.href='funciones.php?numeroSemana='+$numeroSemana;
    });
