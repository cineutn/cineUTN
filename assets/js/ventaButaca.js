(function($){
var URI = {        
        SALA : 'actions/actionVentaButacas.php?action=obtener',
        BUTACA :'actions/actionVentaButacas.php?action=reservar',
    };
    
    $esquemaSala=$("#esquemaSala");     
    $pathSeleccionada="assets/img/butacaSeleccionada.png";

    $(document ).ready(function(){	   
        obtenerDetalleSala();  
    });
	
    function obtenerDetalleSala()
    {   
         //$id = $idFuncion.val();
        $funcionID=1;//cambiarrrrr hay que pasarle el id de la funcion elegida en la pantalla anterior
        var obtener = $.ajax({
            url : URI.SALA,
            method : "GET",
             data: {idFuncion:$funcionID},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){		
                
                $esquemaSala.html("");     
                $fila=''; 
                $filaActual='';
                
                if(res.data[0].fila>0){
                    
                    $filaActual=res.data[0].fila;
                    $totalcolumna=0;
                    $fila ='<tr><td>'+$filaActual+'</td>';
                    
                    res.data.forEach(function(item){                 
                        if($filaActual===item.fila)
                        {
                            $fila=$fila + '<td id="'+item.idSalaFuncion+'" class="esbirro">'+traerButaca(item.habilitada)+'</td>';
                            $totalcolumna=item.columna;
                        }
                        else{
                        
                            $fila= $fila+'<td >'+$filaActual+'</td></tr>'+
                            '<td>'+item.fila+'</td><td id="'+item.idSalaFuncion+'" class="esbirro">'+traerButaca(item.habilitada)+'</td>';
                            $filaActual=item.fila;
                            
                        }
                    });
                    $fila =$fila +('<td>'+$filaActual+'</td></tr><tr><td></td>');
                    for(i=1;i<=$totalcolumna;i++){
                        $fila =$fila +('<td>'+i+'</td>');                    
                    }
                    $fila =$fila +('</tr>');
                    
                    $pantalla= '<tr><td colspan="'+$totalcolumna+'"><img style="width:100%; " src="assets/img/SeatScreen.png" /></td></tr>';
                    $pantalla=$pantalla+ $fila;
                    $esquemaSala.append($pantalla);
                }
                else{
                alert('No hay sala');
                }

                
                
            }else{
                
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });
    };     

    function traerButaca(item){
        $imagen='';        
        if(item==0){
            $imagen='<span class="oculta" ><img src="assets/img/butacaLibre.png" /></span>';
        }
        if(item==1){
            $imagen='<input type="hidden" value="libre"><img src="assets/img/butacaLibre.png" />';        
        }
        if(item==2){
            $imagen='<input type="hidden" value="ocupada"><img src="assets/img/butacaOcupada.png" />';        
        }
        return $imagen;
    } 

    $("#esquemaSala").on("click",".esbirro",function(){   
        event.stopPropagation();
       $idButaca = $(this)[0].id; 
        $estadoButaca = $(this).children('input').val();
         $(this).children('img').attr('src',$pathSeleccionada);
        console.log($pathSeleccionada);
        
          
    });

function reservarButaca(){

    
 var reservar = $.ajax({
                url : URI.BUTACA,
                method : "POST",
                 data: {idSalaFuncion:item},
                dataType : 'json',
            });        

            reservar.done(function(res){
            if(!res.error){
                
                
            }
                else{
                alert(res.error);
                };
          
            });
}
})(jQuery)    
    
