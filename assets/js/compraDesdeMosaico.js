(function($){
    var URI = {        
        PELICULA : 'actions/actionPeliculas.php?action=obtenerPeliculaById',		
    }; 
    
    $( document ).ready(function(){  
            otenerPeliculabyID();   
        
            $('#tree').treeview({data: getTree()});
        
    });
    

    //funciones
    function otenerPeliculabyID(){
       
        var obtener = $.ajax({
            url : URI.PELICULA,
            method : "GET",
            dataType : 'json',
            data  :   {
                'id' : '1'
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
    function getTree() {
      // Some logic to retrieve, or generate tree structure
        
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
