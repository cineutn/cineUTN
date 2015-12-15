var URI = {        
        SALA : 'actions/actionVentaButacas.php?action=obtener',
        BUTACA :'actions/actionVentaButacas.php?action=reservar',
        FUNCION : 'actions/actionPeliculaCompra.php?action=obtener'
    };
    
    $esquemaSala=$("#esquemaSala");     
    $pathSeleccionada="assets/img/butacaSeleccionada.png";
    $pathLibre="assets/img/butacaLibre.png";
    $cantidadEntradas=$('#idCantidadEntradas').val(); 
    $idFuncionDetalle=$('#idFuncionDetalle').val(); 
    $butacasSeleccionadas=0;    
    $idFuncionDetalle = $("#idFuncionDetalle").val();
    $tituloPelicula =$("#tituloPelicula");
    $complejo =$("#complejo");
    $diaFuncion =$("#diaFuncion");
    $horarioFuncion =$("#horarioFuncion");
    $sala =$("#sala");
    $imagenPelicula=$("#imagenPelicula");
    $idTipoFuncion=$("#idTipoFuncion").val();
    $precios=$("#precios");

    $(document ).ready(function(){
        
        butacas = sessionStorage.getItem('butacas'); 
        if($idFuncionDetalle!=''){
            sessionStorage.setItem('idFuncionDetalleSesion',$idFuncionDetalle); 
            if(butacas!=null){
                      
                
                var arrayButaca = butacas.split(',')

                $.each(arrayButaca, function( index, value ){

                    var reservar = $.ajax({
                                    url : URI.BUTACA,
                                    method : "POST",
                                     data: {idSalaFuncion:value,hanilitada:1},
                                    dataType : 'json',
                    });        

                    reservar.done(function(res){
                        if(!res.error){            

                        }else{
                            //alert(res.error);
                            $('#msgBoxTitulo').text('UTN Cines');
                            $('#msgBoxMensaje').text(res.error);
                            $('#modalMsgBox').modal('show');
                        }
                    });

                });
                
                
                
            }
        }
        else{
            $idFuncionDetalle= sessionStorage.getItem("idFuncionDetalleSesion");
            
            if(butacas!=null){
                var arrayButaca = butacas.split(',');     
                $butacasSeleccionadas = arrayButaca.length;        
            }
        }
        
        
        
        if($cantidadEntradas!=''){
            sessionStorage.setItem('cantidadEntradasSesion',$cantidadEntradas);
        }
        else{
            $cantidadEntradas= sessionStorage.getItem("cantidadEntradasSesion");
        }
        obtenerDetalleFuncion();
        obtenerDetalleSala();    
        
    });
	
    function obtenerDetalleFuncion(){        
        $funcionDetalleID=$idFuncionDetalle;
        var obtener = $.ajax({
            url : URI.FUNCION,
            method : "GET",
            async:false,
            data: {idFuncion:$funcionDetalleID},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){     
                $("#tituloPelicula").text(res.data[0].titulo+'('+res.data[0].clasificacion+')');
                $("#complejoNombre").text(res.data[0].nombre);
                $("#diaFuncion").text(res.data[0].dia);
                $("#horarioFuncion").text(res.data[0].horario);
                $("#sala").text(res.data[0].sala);               
                $("#compraDetalle").text(res.data[0].titulo +' ('+res.data[0].clasificacion+')');
                $("#idTipoFuncion").val(res.data[0].tipoFuncion);
                 $imagen = '<img id="imagenPelicula" src='+res.data[0].imagen+' class="img-responsive" alt="Responsive image">';                
                $imagenPelicula.append($imagen);                              
            }else{                
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cines');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('UTN Cines');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });

    };   

    function obtenerDetalleSala(){

         //$id = $idFuncion.val();
        $funcionID= $idFuncionDetalle;
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
                
                if(res.data[0].fila!=null){
                    
                    $filaActual=res.data[0].fila;
                    $totalcolumna=0;                 
                    $fila ='<tr><td>'+$filaActual+'</td>';
                    
                    res.data.forEach(function(item){                 
                        if($filaActual===item.fila)
                        {
                            $fila=$fila + '<td id="'+item.idSalaFuncion+'" class=" centrar esbirro">'+traerButaca(item.habilitada,item.idSalaFuncion)+'</td>';
                            $totalcolumna=item.columna;
                        }
                        else{
                        
                            $fila= $fila+'<td class="centrar" >'+$filaActual+'</td></tr>'+
                            '<td>'+item.fila+'</td><td id="'+item.idSalaFuncion+'" class="centrar esbirro">'+traerButaca(item.habilitada,item.idSalaFuncion)+'</td>';
                            $filaActual=item.fila;
                            
                        }
                    });                    
                    
                    $fila =$fila +('<td>'+$filaActual+'</td></tr><tr><td></td>');
                    for(i=1;i<=$totalcolumna;i++){
                        $fila =$fila +('<td class="centrar">'+i+'</td>');                    
                    }
                    $fila =$fila +('</tr>');
                    
                    $pantalla= '<tr><td></td><td colspan='+$totalcolumna+'><img style="width:100%; height:25%;" src="assets/img/SeatScreen.png" /></td><td></td></tr>';
                    $pantalla=$pantalla+ $fila;
                    $esquemaSala.append($pantalla);
               }
                else{
                    //alert('No hay sala');
                    $('#msgBoxTitulo').text('UTN Cines');
                    $('#msgBoxMensaje').text('No hay Sala.');
                    $('#modalMsgBox').modal('show');
                }
            }else{                
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cines');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('UTN Cines');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
    };     

    function traerButaca(estado,id){
        $imagen='';         
        if(estado==0){
            $imagen='<span class="oculta" ><img src="assets/img/butacaLibre.png" /></span>';
        }
        if(estado==1){
            $imagen='<input type="hidden" value="libre"><img src="assets/img/butacaLibre.png" />';        
        }
        if(estado==2){
            $imagen='<input type="hidden" value="ocupada"><img src="assets/img/butacaOcupada.png" />';        
        }
        if(estado==3){
            butacas = sessionStorage.getItem('butacas');  
            if(butacas!=null){
                var arrayButaca = butacas.split(',');                
                if(jQuery.inArray(id,arrayButaca)===-1){
                    $imagen='<input type="hidden" value="ocupada"><img src="assets/img/butacaOcupada.png" />'; 
                }
                else{
                    $imagen='<input type="hidden" value="seleccionada"><img src="assets/img/butacaSeleccionada.png" />';                                                                 
                }
            }else{
                $imagen='<input type="hidden" value="ocupada"><img src="assets/img/butacaOcupada.png" />'; 
            }                       
        }
        return $imagen;
    } 

    $("#esquemaSala").on("click",".esbirro",function(){       
        event.stopPropagation();
        $idButaca = $(this)[0].id;         
        $estadoButaca = $(this).children('input').val();        
            if($estadoButaca==='libre' && $cantidadEntradas>$butacasSeleccionadas){
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
    butacas = sessionStorage.getItem('butacas');     
    if($cantidadEntradas===$butacasSeleccionadas){
        $( ".esbirro" ).each(function() {
        if($(this).children('input').val() ==='seleccionada'){            
            $idSalaFuncion.push($(this)[0].id);            
        }            
    });        
    
    //en caso de reelejir butacas libero las butacas en sesion
    if(butacas!==null){
        var arrayButaca = butacas.split(',')
        
        $.each(arrayButaca, function( index, value ){

            var reservar = $.ajax({
                            url : URI.BUTACA,
                            method : "POST",
                             data: {idSalaFuncion:value,hanilitada:1},
                            dataType : 'json',
            });        

            reservar.done(function(res){
                if(!res.error){            
                    
                }else{
                    //alert(res.error);
                    $('#msgBoxTitulo').text('UTN Cines');
                    $('#msgBoxMensaje').text(res.error);
                    $('#modalMsgBox').modal('show');
                }
            });

        });
    } 
        
        
    //guardo las butacas seleccionadas        
    $.each($idSalaFuncion, function( index, value ){

        var reservar = $.ajax({
                        url : URI.BUTACA,
                        method : "POST",
                         data: {idSalaFuncion:value,hanilitada:3},
                        dataType : 'json',
        });        

        reservar.done(function(res){
            if(!res.error){

                sessionStorage.setItem('butacas',$idSalaFuncion);                
                location.href='pagoEntradas.php?idFuncionDetalle='+$idFuncionDetalle;               
                
            }else{
                //alert(res.error);
                $('#msgBoxTitulo').text('UTN Cines');
                $('#msgBoxMensaje').text(res.error);
                $('#modalMsgBox').modal('show');
            }
        });
        
    });
    }
    else{            
        $('#msgBoxTitulo').text('UTN Cines');
        $('#msgBoxMensaje').text('Aun debe elegir '+$cantidadEntradas+' entradas');
        $('#modalMsgBox').modal('show');
    }
    
}



    
