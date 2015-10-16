var URI = {        
        SALA : 'actions/actionVentaButacas.php?action=obtener',
        BUTACA :'actions/actionVentaButacas.php?action=reservar',
    };
    
    $esquemaSala=$("#esquemaSala");     
    $pathSeleccionada="assets/img/butacaSeleccionada.png";
    $pathLibre="assets/img/butacaLibre.png";
    $cantidadEntradas=3;//cambiar este parametro lo tiene que obtener de la pagina anterior
    $precioEntradas=25;//cambiar este parametro lo tiene que obtener de la pagina anterior
    $idSalaFuncion=0;
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
                    
                    $pantalla= '<tr><td></td><td colspan='+$totalcolumna+'><img style="width:100%; height:25%;" src="assets/img/SeatScreen.png" /></td><td></td></tr>';
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
        
            if($estadoButaca==='libre' && $cantidadEntradas>0){
                $(this).children('img').attr('src',$pathSeleccionada);
                $(this).children('input').attr('value','seleccionada');
                $cantidadEntradas--;
            }
            if($estadoButaca==='seleccionada'){
                $(this).children('img').attr('src',$pathLibre);
                $(this).children('input').attr('value','libre');
                $cantidadEntradas++;
            }        
        
    });

function reservarButaca(){

    var $idSalaFuncion=[];
    if($cantidadEntradas===0){
        $( ".esbirro" ).each(function() {
        if($(this).children('input').val() ==='seleccionada'){            
            $idSalaFuncion.push($(this)[0].id);
        }            
    });
    
    $.each( $idSalaFuncion, function( index, value ){
        var reservar = $.ajax({
                        url : URI.BUTACA,
                        method : "POST",
                         data: {idSalaFuncion:value},
                        dataType : 'json',
                    });        

        reservar.done(function(res){
        if(!res.error){


        }
            else{
            alert(res.error);
            };

        });
    });
    }
    else{    
        alert('Aun debe elegir '+$cantidadEntradas+' entradas');
    }
    
}



    
