(function($){
      
    var URI = {
        COMPLEJOS : 'actions/actionComplejos.php?action=obtener',
        PELICULASCARTELERA : 'actions/actionPeliculas.php?action=obtenerCartelera',
        PELICULASCARTELERACOMPLEJO : 'actions/actionPeliculas.php?action=obtenerCarteleraByID',
        PELICULASXCOMPLEJO : 'actions/actionPeliculas.php?action=obtenerPeliculaxComplejo',
        DIASPELICULA : 'actions/actionPeliculas.php?action=obtenerDiasxPeliculaxComplejo',
        HORARIOSDIAPELICULA : 'actions/actionPeliculas.php?action=obtenerHorariosxPeliculaxComplejo'
        
    };

    $cmbComplejos = $("#cmbComplejos");

    $cmbComplejos = $("#cmbComplejos");
    $( document ).ready(function(){
            obtenerComplejos();
            otenerPeliculasCartelera();
        
            
        
        //bindeos
        $('#contenedorPeliculas').on('click','[href*="compraDesdeMosaico"]',function(e){
                $idUsuario =   sessionStorage.getItem('idUser');

                if ($idUsuario > 0 ){
                    

                }else{
                     
                    e.preventDefault();
                    $('#modalLogin').modal('show');

                } 

            });
        
        $('.menuFiltros .form-control').change(function(e){
            var url='';
            data={};
            
            switch(e.currentTarget.id) {
                case 'cmbComplejos':
                    limpiaCombos('cmbComplejos');
                    url=URI.PELICULASXCOMPLEJO;
                    data.idComplejo=$( "#cmbComplejos option:selected" ).val();
                    $('#cmbPeliculas').prepend($('<option/>',{value:-1,selected:''}).html('Cargando...'));
                    
                    
                    break;
                    
                case 'cmbPeliculas':
                    limpiaCombos('cmbPeliculas');
                    url=URI.DIASPELICULA;
                    data.idComplejo=$( "#cmbComplejos option:selected" ).val();
                    data.pelicula=$( "#cmbPeliculas option:selected" ).text();
                    $('#cmbDias').prepend($('<option/>',{value:-1,selected:''}).html('Cargando...'));
                    break;
                    
                case 'cmbDias':
                    
                    limpiaCombos('cmbDias');
                    url=URI.HORARIOSDIAPELICULA;
                    data.idComplejo=$( "#cmbComplejos option:selected" ).val();
                    data.pelicula=$( "#cmbPeliculas option:selected" ).text();
                    data.dia=$('#cmbDias option:selected').text();
                    $('#cmbHorarios').prepend($('<option/>',{value:-1,selected:''}).html('Cargando...'));
                    break;
                    
                case 'cmbHorarios':
                    //si cambia el combo horarios, habilito boton
                    $('.menuFiltros button').prop('disabled',false);
                    return false;
                    break;   
            }
             var obtener = $.ajax({
                url : url,
                method : "GET",
                dataType : 'json',
                data : data
             });
            
            obtener.done(function(resultado){
                var error=0;
                if(resultado.error){
                    error=1;
                }
                    switch(e.currentTarget.id) {
                        
                        case 'cmbComplejos':
                            
                            $('#cmbPeliculas option:selected')[0].remove();
                            
                            if(error==1){
                                $('#cmbPeliculas').prepend(
                                    $('<option/>',{
                                        value   :   1,
                                        selected:''
                                    }).append("No se encontraron datos")
                                );
                                break;
                            }
                            
                            resultado.data.forEach(function(item){
                                 $('#cmbPeliculas').append(
                                    $('<option/>',{
                                        value   :   2/*item.idFuncion*/
                                    }).append(item.titulo)
                                );
                            });
                            break;
                            
                        case 'cmbPeliculas':
                           
                            $('#cmbDias option:selected')[0].remove();
                            
                            if(error==1){
                                $('#cmbDias').prepend(
                                    $('<option/>',{
                                        value   :  1,
                                        selected:''
                                    }).append("No se encontraron datos")
                                );
                                break;
                            }
                            
                            resultado.data.forEach(function(item){
                                 $('#cmbDias').append(
                                    $('<option/>',{
                                        value   :   2/*data.idFuncion*/
                                    }).append(item.dia)
                                );
                            });
                            break;
                           
                        case 'cmbDias':
                            $('#cmbHorarios option:selected')[0].remove();
                            
                            if(error==1){
                                $('#cmbHorarios').prepend(
                                    $('<option/>',{
                                        value   :   1,
                                        selected:''
                                    }).append("No se encontraron datos")
                                );
                                break;
                            }
                            
                            
                             resultado.data.forEach(function(item){
                                 $('#cmbHorarios').append(
                                    $('<option/>',{
                                        value   :   item.idFuncionDetalle
                                    }).append(item.horario)
                                );
                             });
                            
                            break;
                          
                    }   
                    
                    
                    
                    
            });
            obtener.fail(function(res){
                //alert(res.responseText);
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.responseText);
                $('#modalMsgBox').modal('show');
            });
            
         });   
        
        $('.menuFiltros button').on('click',function(){
            
            $idUsuario = sessionStorage.getItem('idUser');

                if ($idUsuario > 0 ){
                    
                    $(location).attr('href', 'paginaCompra.php?idFuncionDetalle=' + $('#cmbHorarios option:selected').val());    
                    
                }else{                                         
                    $('#modalLogin').modal('show');
                }                  
        });
        
    });

    function limpiaCombos(idComboInicioLimpieza){
        
        $('.menuFiltros button').prop('disabled',true);
        
         switch(idComboInicioLimpieza) {
                case 'cmbComplejos':
                    
                    $('#cmbPeliculas option').each(function(e,item){item.value>0 ? item.remove() :false})
                    $('#cmbDias option').each(function(e,item){item.value>0 ? item.remove() :false})
                    $('#cmbHorarios option').each(function(e,item){item.value>0 ? item.remove() :false})
                    
                    break;
                    
                case 'cmbPeliculas':
                    
                    $('#cmbDias option').each(function(e,item){item.value>0 ? item.remove() :false})
                    $('#cmbHorarios option').each(function(e,item){item.value>0 ? item.remove() :false})
                   
                    break;
                    
                case 'cmbDias':
                    
                 $('#cmbHorarios option').each(function(e,item){item.value>0 ? item.remove() :false})
                 
                    
                 break;
                    
            }
    
    }
    
    function obtenerComplejos(){
       
        var obtener = $.ajax({
            url : URI.COMPLEJOS,
            method : "GET",
            dataType : 'json'
        });
       
        obtener.done(function(res){
            if(!res.error){
                $complejos = '<option value="0">Seleccioná un complejo</option>';
                //Borro el listado actual
                $cmbComplejos.html("");
                //Itero sobre la lista
                var tipoUsuario = sessionStorage.getItem('tipoUsuario');
                var idComplejo = sessionStorage.getItem('idcomplejo');

                res.data.forEach(function(item){

                    if (tipoUsuario == "vendedor" || tipoUsuario == "administrador"){
                        if (idComplejo == item.idComplejo){
                            $complejos = $complejos + '<option value="'+item.idComplejo+'">'+item.nombre+'</option>';  
                        }
                    }else{
                        $complejos = $complejos + '<option value="'+item.idComplejo+'">'+item.nombre+'</option>';
                    }
                    
                });
                //lo agrego al listado
                $cmbComplejos.append($complejos);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('UTN Cine');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
               
    };
    //obtiene peliculas y completa la cartelera
    function otenerPeliculasCartelera(){
       
        var tipoUsuario = sessionStorage.getItem('tipoUsuario');
        var idComplejo = sessionStorage.getItem('idcomplejo');

        if (tipoUsuario == "vendedor" || tipoUsuario == "administrador"){
            var obtener = $.ajax({
                url : URI.PELICULASCARTELERACOMPLEJO,
                method : "GET",
                dataType : 'json',
                data:{idComplejo:idComplejo}
            });
        }else{           
            var obtener = $.ajax({
                url : URI.PELICULASCARTELERA,
                method : "GET",
                dataType : 'json'
            });
        }
        
         obtener.done(function(res){
            if(!res.error){

                //Itero sobre la lista
                res.data.forEach(function(item){
                   
                    var peliculaCartelera = 
                        $('<a/>',   {
                            'href'   :  'compraDesdeMosaico.php?idPelicula='+ item.titulo
                        }).append(
                            $('<img/>', {
                                'class' :   'pelicula',
                                'id'    :   'pelicula' + item.titulo,
                                'src'   :   item.imagen,
                                'data-toggle':  "tooltipCartelera",
                                'title' :   item.titulo
                            })
                        
                        );
                    
                        
                    
                    $('#contenedorPeliculas').append(peliculaCartelera);
                });
                //inicializo tooltips de peliculas
                 $('[data-toggle="tooltipCartelera"]').tooltip();
                
                
            }else{
                event.preventDefault();
                if (tipoUsuario == "vendedor" || tipoUsuario == "administrador"){
                    //alert(res.mensaje);
                    $('#msgBoxTitulo').text('UTN Cine');
                    $('#msgBoxMensaje').text('Su Complejo todavia no contiene funciones cargadas. \r Comunicarse con el administrador del sistema.');
                    $('#modalMsgBox').modal('show');
                }else{           
                    //alert(res.mensaje);
                    $('#msgBoxTitulo').text('UTN Cine');
                    $('#msgBoxMensaje').text('No se encontraron funciones cargadas, intentarlo mas tarde.');
                    $('#modalMsgBox').modal('show');
                }               
                
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('UTN Cine');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
    
    };
    
    
    
    
    
    
    
})(jQuery)