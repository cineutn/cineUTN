(function($){
    var URI = {        
        PELICULA : 'actions/actionPeliculas.php?action=obtenerPeliculaById',
        PELICULAFUNCION : 'actions/actionPeliculas.php?action=obtenerPeliculaFuncionById'
    }; 
    var datosFunciones;
    
    $( document ).ready(function(){  
            otenerPeliculabyID();   
            otenerPeliculaFuncionbyID();
            $('#tree').treeview({data: getTree(datosFunciones)});
        
    });
    

    //funciones
    function otenerPeliculabyID(){
       
        var obtener = $.ajax({
            url : URI.PELICULA,
            method : "GET",
            dataType : 'json',
            data  :   {
                'id' :  $('#idPelicula').val()
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
        debugger;
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
               anteriorComplejo='';
                var tem=[];
                
               $.each(res.data, function(i, item) {
                   formato=item.subtitulada=='1' ? 'Subtitulada' : '';
                   
                   
                   debugger;
                   //si es el mismo complejo
                   if(item.nombreComplejo==anteriorComplejo){
                       //si es el mismo dia
                        if(tem.slice(-1)[0].dias.slice(-1)[0].dia==item.dia){
                            //si es el mismo formato
                            if(tem.slice(-1)[0].dias.slice(-1)[0].formatos.slice(-1)[0].formato==item.formato + ' ' + formato){
                                tem.slice(-1)[0].dias.slice(-1)[0].formatos.slice(-1)[0].horarios.push(item.horario);
                            }else{
                            //distinto formato
                                tem.slice(-1)[0].dias.slice(-1)[0].formatos.push(
                                    {
                                        formato : item.formato + ' ' + formato, 
                                        horarios : [item.horario]
                                                                            
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
                                        horarios : [item.horario]
                                                                            
                                    }]
                           
                                }
                            
                            );
                        
                        }
                       
                   
                   }else{
                        debugger;
                       anteriorComplejo=item.nombreComplejo;
                       
                       
                       tem.push({
                            complejo :item.nombreComplejo,
                            dias  : [{
                                dia : item.dia,
                                formatos : [{
                                    formato : item.formato + ' ' + formato, 
                                    horarios : [item.horario]
                                                                            
                                    }]
                           
                                }]
                       });
                   
                   }
                   /*
                    dia: "Lunes 21"
                    formato: "2D"
                    horario: "14:30"
                    idComplejo: "1"
                    idTipoFuncion: "1"
                    nombreComplejo: "UTN Avellaneda"
                    subtitulada: "1"
                   */
                   
                   
                   
                });
                
               datosFunciones=tem; 
                
            }else{
                
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText);
        });
    
    }
    function getTree(datosFunciones) {
      // Some logic to retrieve, or generate tree structure
        
        var arbolFunciones= [];
        
        while(tem.length>0){
            complejo=datosFunciones.shift();
            ramaArbol={
                text:complejo.complejo,
                nodes:[]
            }
            while(complejo.dias.length>0){
                diaFuncion=complejo.dias.shift();
                ramaArbol.nodes.push(
                    {
                        text:diaFuncion.dia,
                        nodes:[]
                    });
                while(diaFuncion.formatos>0){
                //quedo aca
                }
                
            }
        
        
        }
        
        var tree = [
              {
                text: "UTN Avellaneda",
                nodes: [
                  {
                    text: "Lunes",
                    nodes: [
                      {
                        text: "2D",
                        nodes: [
                            {
                                text: "15:15 HS"
                            },
                            {
                                text: "17:00 HS"
                            },
                            {
                                text: "19:10 HS",
                            }
                        ]
                      },
                      {
                        text: "3D"
                      }
                    ]
                  },
                  {
                    text: "Martes"
                  }
                ]
              },
              {
                text: "UTN Medrano",
                nodes: [
                  {
                    text: "Lunes",
                    nodes: [
                      {
                        text: "2D",
                        node: [
                            {
                                text: "15:15 HS"
                            }
                        ]
                      },
                      {
                        text: "3D"
                      }
                    ]
                  },
                  {
                    text: "Martes"
                  }
                ]
              },
              {
                text: "UTN Lugano",
                nodes: [
                  {
                    text: "Lunes",
                    nodes: [
                      {
                        text: "2D",
                        nodes: [
                            {
                                text: "15:15 HS"
                            }
                        ]
                      },
                      {
                        text: "3D"
                      }
                    ]
                  },
                  {
                    text: "Martes"
                  }
                ]
              },
              {
                text: "UTN otra",
                nodes: [
                  {
                    text: "Lunes",
                    nodes: [
                      {
                        text: "2D",
                        node: [
                            {
                                text: "15:15 HS"
                            }
                        ]
                      },
                      {
                        text: "3D"
                      }
                    ]
                  },
                  {
                    text: "Martes"
                  }
                ]  
              },
              {
                text: "UTN otra mas",
                nodes: [
                  {
                    text: "Lunes",
                    nodes: [
                      {
                        text: "2D",
                        node: [
                            {
                                text: "15:15 HS"
                            }
                        ]
                      },
                      {
                        text: "3D"
                      }
                    ]
                  },
                  {
                    text: "Martes"
                  }
                ]  
              }
            ];
        
          return tree;
    }

})(jQuery)
