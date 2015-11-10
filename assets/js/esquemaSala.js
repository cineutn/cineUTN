$('title').html("Diagramar Sala");

 var URI = {        
        SALA: 'actions/actionEsquemaSala.php?action=obtener',	        
        EDITAR: 'actions/actionEsquemaSala.php?action=editar',
    };
    
    $idSala = $("#idSala").val();
    $cantidadFilas =0;
    $cantidadColumnas =0;
    $esquemaSala =$("#esquemaSala");
    $pathSeleccionada="assets/img/butacaOcupada.png";
    $pathLibre="assets/img/butacaLibre.png";
    $idButacaOcupadaInicial=[];


$(document ).ready(function(){	      
    obtenerSala(); 
    });

function obtenerSala(){    
  var obtener = $.ajax({
            url : URI.SALA,
            method : "GET",
             data: {idSala:$idSala},
            dataType : 'json',
        });   
     obtener.done(function(res){
         if(!res.error){     
              if(!res.error){
                $esquemaSala.html("");     
                $fila=''; 
                $filaActual='';
                if(res.data[0].fila!=null){
                    $filaActual=res.data[0].fila;
                    $totalcolumna=0;                 
                    $fila ='<tr><td class="centrar">'+$filaActual+'</td>';                    
                    res.data.forEach(function(item){                         
                        if($filaActual===item.fila)
                        {
                            $fila=$fila + '<td id="'+item.IdSalaDetalle+'" class="centrar esbirro">'+traerButaca(item.habilitada,item.IdSalaDetalle)+'</td>';
                            $totalcolumna=item.columna;
                        }
                        else{
                        
                            $fila= $fila+'<td>'+$filaActual+'</td></tr>'+
                            '<td>'+item.fila+'</td><td id="'+item.IdSalaDetalle+'" class="centrar esbirro">'+traerButaca(item.habilitada,item.IdSalaDetalle)+'</td>';
                            $filaActual=item.fila;                            
                        }
                    });
                    $fila =$fila +('<td>'+$filaActual+'</td></tr><tr><td></td>');
                    for(i=1;i<=$totalcolumna;i++){
                        $fila =$fila +('<td  class="centrar">'+i+'</td>');                    
                    }
                    $fila =$fila +('</tr>');                    
                    $pantalla= '<tr><td></td><td colspan='+$totalcolumna+'><img style="width:100%; height:25%;" src="assets/img/SeatScreen.png" /></td><td></td></tr>';
                    $pantalla=$pantalla+ $fila;
                    $esquemaSala.append($pantalla);                    
                }else{
                    //alert('No hay sala');
                    $('#msgBoxTitulo').text('Esquema Sala');
                    $('#msgBoxMensaje').text('No hay Sala. ');
                    $('#modalMsgBox').modal('show');
                }
              }
         }else{
            //alert(res.mensaje);
            $('#msgBoxTitulo').text('Esquema Sala');
            $('#msgBoxMensaje').text(res.mensaje);
            $('#modalMsgBox').modal('show');
         }

         });
    obtener.fail(function(res){
        //alert(res.responseText);
        $('#msgBoxTitulo').text('Esquema Sala');
        $('#msgBoxMensaje').text(res.responseText);
        $('#modalMsgBox').modal('show');
    });
}


    function traerButaca(estado,id){
        $imagen='';        
       
        if(estado==1){
            $imagen='<input type="hidden" value="libre"><img src="assets/img/butacaLibre.png" />';        
        }
        if(estado==0){
            $imagen='<input type="hidden" value="ocupada"><img src="assets/img/butacaOcupada.png" />'; 
            //guardo el esado inicial de las butacas seleccionadas
            $idButacaOcupadaInicial.push(id);
        }
    
        return $imagen;
    } 

$esquemaSala.on("click",".esbirro",function(){      
    event.stopPropagation();      
    $estadoButaca = $(this).children('input').val();   
        if($estadoButaca==='libre'){
            $(this).children('img').attr('src',$pathSeleccionada);
            $(this).children('input').attr('value','ocupada');
        }
        if($estadoButaca==='ocupada'){
            $(this).children('img').attr('src',$pathLibre);
            $(this).children('input').attr('value','libre');
        }
});

$("#btnGuardarSala").click(function(){
    $idButacaOcupadaFinal=[];    
    $error=false;
   $(".esbirro" ).each(function() {
        if($(this).children('input').val() ==='ocupada'){            
           $idButacaOcupadaFinal.push($(this)[0].id);            
          //si la butaca no esta en las seleccionadas inicilamente le cambio el estado a seleccionada
          if($.inArray($(this)[0].id,$idButacaOcupadaInicial)==-1){          
              var editarEstado = $.ajax({
                                url : URI.EDITAR,
                                method : "POST",
                                async: false,
                                 data: {
                                     idSalaDetalle:$(this)[0].id,
                                     habilitada:0
                                 },
                                dataType : 'json',
                            });        

                editarEstado.done(function(res){
                    if(res.error){     
                        $error=true;
                        //alert(res.mensaje);
                        $('#msgBoxTitulo').text('Esquema Sala');
                        $('#msgBoxMensaje').text(res.mensaje);
                        $('#modalMsgBox').modal('show');
                    }
                });
              
          }
        }                       
    });
    
    //si la butaca se deselecciono, le cambio el estado
    $.each($idButacaOcupadaInicial, function( index, value ){  
        if($.inArray(value,$idButacaOcupadaFinal)==-1){
             var editarEstado = $.ajax({
                            url : URI.EDITAR,
                            method : "POST",
                            async: false,
                             data: {
                                 idSalaDetalle:value,
                                 habilitada:1
                             },
                            dataType : 'json',
                        });        

            editarEstado.done(function(res){
                if(res.error){         
                    $error=true;
                    //alert(res.mensaje);
                    $('#msgBoxTitulo').text('Esquema Sala');
                    $('#msgBoxMensaje').text(res.mensaje);
                    $('#modalMsgBox').modal('show');
                };
            });

        }
    });
    
    if(!$error){
        //alert('Esquema guardado!');
        $('#msgBoxTitulo').text('Esquema Sala');
        $('#msgBoxMensaje').text('Esquema Guardado. ');
        $('#modalMsgBox').modal('show');
      location.href='altaSala.php';
    
    }
    
});