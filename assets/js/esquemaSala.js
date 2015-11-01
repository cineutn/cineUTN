 var URI = {        
        SALA: 'actions/actionEsquemaSala.php?action=obtener',	        
    };
    
    $idSala = $("#idSala").val();
    $cantidadFilas =0;
    $cantidadColumnas =0;
    $esquemaSala =$("#esquemaSala");
    $pathSeleccionada="assets/img/butacaOcupada.png";
    $pathLibre="assets/img/butacaLibre.png";


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
             console.log(res);
            
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
                alert('No hay sala');
                }
              }
         }else{
             alert(res.mensaje);
         }

         });
    obtener.fail(function(res){
        alert(res.responseText)
        });
}


    function traerButaca(estado,id){
        $imagen='';        
       
        if(estado==0){
            $imagen='<input type="hidden" value="libre"><img src="assets/img/butacaLibre.png" />';        
        }
        if(estado==2){
            $imagen='<input type="hidden" value="ocupada"><img src="assets/img/butacaOcupada.png" />';        
        }
    
        return $imagen;
    } 

$esquemaSala.on("click",".esbirro",function(){      
    event.stopPropagation();
//    $idButaca = $(this)[0].id;         
    $estadoButaca = $(this).children('input').val(); 
    console.log($estadoButaca);
        if($estadoButaca==='libre'){
            $(this).children('img').attr('src',$pathSeleccionada);
            $(this).children('input').attr('value','seleccionada');
        }
        if($estadoButaca==='seleccionada'){
            $(this).children('img').attr('src',$pathLibre);
            $(this).children('input').attr('value','libre');           

        }
});

$("#btnGuardarSala").click(function(){

     $("td").each(function() {
        console.log($(this).children('input').val());
     });
});