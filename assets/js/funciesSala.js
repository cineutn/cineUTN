 var URI = {        
        FUNCIONES : 'actions/actionFunciones.php?action=funcionesPorSala',    
    };

$funcionesSemana =$("#funcionesSemana");

$(document ).ready(function(){	   
        obtenerFunciones();
    });


function obtenerFunciones(){   
   
    var obtener = $.ajax({
        url : URI.FUNCIONES,
        method : "GET",
        data: {
                numeroSemana:$("#nroSemana").val()
				  },
        dataType : 'json',
    });

    obtener.done(function(res){
        if(!res.error){				            
            $row='';
            $salaActual='';
            $i=0;
            $salaIteracion='';
            res.data.forEach(function(sala){                
                $salaActual=sala.Sala;
                if($salaActual!=$salaIteracion){
                    //dibujo el titulo de la sala
                    console.log('h2 '+ $salaActual);
                    $row=$row+'<h3>Sala: '+$salaActual+'</h3><br/>';
                if($salaActual!=$salaIteracion){
                    //comienza tabla
                    $row=$row+'<table class="table table-condensed"><thead><tr><th>Titulo</th><th>Formato</th><th>Dia</th><th>Horario</th><th>Estado</th></tr></thead><tbody>';
                res.data.forEach(function(datosSala){
                    if($salaActual==datosSala.Sala){
                        //dibujo row de tabla                                           
                        $salaIteracion=datosSala.Sala;
                        console.log(datosSala.fechaBaja);
                        $activa =(datosSala.fechaBaja!='0000-00-00 00:00:00')?'Inactiva':'Activa';
                        $idioma= (datosSala.subtitulada==1)?'Subtitulada':'Castellano';
                        $row=$row+'<tr><td>'+datosSala.titulo+'</td><td>'+datosSala.descripcion+' '+$idioma+'</td><td>'+datosSala.dia+'</td><td>'+datosSala.horario+'</td><td>'+$activa+'</td></tr>';
                    }                    
                    }); 
                    //cierro tabla
                     $row=$row+'</tbody></table>';
                }
                
                }
            });
            $funcionesSemana.append($row);
           
        }else{
            event.preventDefault();
            alert(res.mensaje);
        }
    });

    obtener.fail(function(res){
        alert(res.responseText)
    });
};

$("#btnVolver").click(function() { 
   location.href='semanaNueva.php';
});