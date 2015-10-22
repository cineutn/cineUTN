(function($){
    var URI = {        
        PELICULA : 'actions/actionPeliculas.php?action=obtenerPeliculaById',
        PELICULAFUNCION : 'actions/actionPeliculas.php?action=obtenerPeliculaFuncionById'
    }; 
    
    $( document ).ready(function(){  
            otenerPeliculabyID();   
            otenerPeliculaFuncionbyID();
            
        
    });
    

    //funciones
    function otenerPeliculabyID(){
       
        var obtener = $.ajax({
            url : URI.PELICULA,
            method : "GET",
            dataType : 'json',
            data  :   {
                'id' :  $('#idPelicula').val()
            },
            beforeSend : function(){
                $('#modalLoading').modal('show');
            }
        });
        
         obtener.done(function(res){
            if(!res.error){
                var pelicula = res.data[0];
                $('.titulo').html(pelicula.titulo);
                $('.imagenPelicula img').attr('src',pelicula.imagen);
                $('.descripcionPelicula').html(pelicula.sinopsis);
                $('.fichaTecnica p').html(
                    'Genero: '+pelicula.genero +'<br>Duración: '+ pelicula.duracion+'min <br>Actores: ' + pelicula.actores + '<br>Director: ' + pelicula.director + ' <br>Clasificación: ' + pelicula.clasificacion + '<br><br>'
                
                ); 
                $('.embed-responsive-item').attr('src',pelicula.trailer);
                
            }else{
                
                event.preventDefault();
                alert(res.mensaje);
            }
             
             
             
        });

        obtener.fail(function(res){
            alert(res.responseText);
        });
    
    };
    function otenerPeliculaFuncionbyID(){
        
        var obtener = $.ajax({
            url : URI.PELICULAFUNCION,
            method : "GET",
            dataType : 'json',
            data  :   {
                'id' :  $('#idPelicula').val()
            }
        });
        
                        
         obtener.done(function(res){
            if(!res.error){
                $('#modalLoading').modal('hide');
               anteriorComplejo='';
                var tem=[];
                
               $.each(res.data, function(i, item) {
                   formato=item.subtitulada=='1' ? 'Subtitulada' : '';           
                   
               //si es el mismo complejo
                   if(item.nombreComplejo==anteriorComplejo){
                       //si es el mismo dia
                        if(tem.slice(-1)[0].dias.slice(-1)[0].dia==item.dia){
                            //si es el mismo formato
                            if(tem.slice(-1)[0].dias.slice(-1)[0].formatos.slice(-1)[0].formato==item.formato + ' ' + formato){
                                tem.slice(-1)[0].dias.slice(-1)[0].formatos.slice(-1)[0].horarios.push(
                                    {
                                          horario:  item.horario,
                                          idFuncionDetalle:  item.idFuncionDetalle
                                    }
                                );
                            }else{
                            //distinto formato
                                tem.slice(-1)[0].dias.slice(-1)[0].formatos.push(
                                    {
                                        formato : item.formato + ' ' + formato, 
                                        horarios : [{
                                            horario:  item.horario,
                                            idFuncionDetalle:  item.idFuncionDetalle
                                            }]
                                                                            
                                    }
                                );
                            }
                                
                        }else{
                        //si es distinto dia
                            tem.dias.push(
                                {
                                    dia : item.dia,
                                    formatos : [{
                                        formato : item.formato + ' ' + formato, 
                                        horarios : [{
                                          horario:  item.horario,
                                          idFuncionDetalle:  item.idFuncionDetalle
                                            }]
                                                                            
                                    }]
                           
                                }
                            
                            );
                        
                        }
                       
                   
                   }else{
                        
                       anteriorComplejo=item.nombreComplejo;
                       
                       
                       tem.push({
                            complejo :item.nombreComplejo,
                            dias  : [{
                                dia : item.dia,
                                formatos : [{
                                    formato : item.formato + ' ' + formato, 
                                    horarios : [{
                                          horario:  item.horario,
                                          idFuncionDetalle:  item.idFuncionDetalle
                                            }]
                                                                            
                                    }]
                           
                                }]
                       });
                   
                   }
                   
                });
                
                $('#tree').treeview({
                    data: getTree(tem),
                    enableLinks :true
                
                });
                
            }else{
                
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
			$('#modalLoading .modal-body .progress' ).hide();
			$('#modalLoading .modal-body' ).append('<span>Error cargando las funciones, intente mas tarde.</span>');
			
        });
    
    }
    function getTree(datosFunciones) {
      // Some logic to retrieve, or generate tree structure
        
        var arbolCine= [];
        
        while(datosFunciones.length>0){
            complejo=datosFunciones.shift();
            nodoComplejos={
                text:complejo.complejo,
                nodes:[],
                state: {
                    
                    expanded: false
                  }
             }
            while(complejo.dias.length>0){
                diaFuncion=complejo.dias.shift();
                
                nodoFuncion=
                    {
                        text:diaFuncion.dia,
                        nodes:[]
                    };
                while(diaFuncion.formatos.length>0){
                //quedo aca
                    formato=diaFuncion.formatos.shift();
                    nodoFormato={
                        text:formato.formato,
                        nodes:[]
                        
                    };
                    while(formato.horarios.length>0){
                            temHorario=formato.horarios.shift();
                        nodoFormato.nodes.push({
                            text : temHorario.horario,
                            href: "paginaCompra.php?idFuncionDetalle="+temHorario.idFuncionDetalle,
                        });
                    }
                     nodoFuncion.nodes.push(nodoFormato);          
                }
                nodoComplejos.nodes.push(nodoFuncion);
            }
        arbolCine.push(nodoComplejos);
        
        }
        
        
        
          return arbolCine;
    }
    
    
    $('body').on("click","a[href*='paginaCompra']",function(e){
        $idUsuario =   sessionStorage.getItem('idUser');

        if ($idUsuario > 0 ){
            

        }else{
            e.preventDefault();
            $('#modalLogin').modal('show');
            
            
        } 
        
    })
    
   

})(jQuery)
