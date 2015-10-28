(function($){
      
    var URI = {
        COMPLEJOS : 'actions/actionComplejos.php?action=obtener',
        PELICULASCARTELERA : 'actions/actionPeliculas.php?action=obtenerCartelera',
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
                    
                    url=URI.PELICULASXCOMPLEJO;
                    data.idComplejo=$( "#cmbComplejos option:selected" ).val();
                    $('#cmbPeliculas').prepend($('<option/>',{value:-1,selected:''}).html('Cargando...'));
                    break;
                case 'cmbPeliculas':
                    url=URI.DIASPELICULA;
                    data.idComplejo=$( "#cmbComplejos option:selected" ).val();
                    data.idPelicula=$( "#cmbPeliculas option:selected" ).val();
                    break;
                case 'cmbDias':
                    url=URI.HORARIOSDIAPELICULA;
                    data.idComplejo=$( "#cmbComplejos option:selected" ).val();
                    data.idPelicula=$( "#cmbPeliculas option:selected" ).val();
                    data.idDia=$( "#cmbDias option:selected" ).val();
                    break;
                case 'cmbHorarios':
                    //si cambia el combo horarios, habilito boton
                    data.idComplejo=$( "#cmbComplejos option:selected" ).val();
                    data.idPelicula=$( "#cmbPeliculas option:selected" ).val();
                    data.idDia=$( "#cmbDias option:selected" ).val();
                    data.idHorario=$( "#cmbHorarios option:selected" ).val();
                    break;    
            }
             var obtener = $.ajax({
                url : url,
                method : "GET",
                dataType : 'json',
                data : data
             });
            obtener.done(function(resultado){
                if(!resultado.error){
                    switch(e.currentTarget.id) {
                        case 'cmbComplejos':
                            $('#cmbPeliculas option:selected').remove();
                            resultado.data.forEach(function(item){
                                 $('#cmbPeliculas').append(
                                    $('<option/>',{
                                        value   :   item.idFuncion
                                    }).append(item.titulo)
                                );
                            
                            });
                            
                           
                            
                            
                            
                            //cargo combo de peliculas
                            //$('#cmbPeliculas').
                            break;
                        case 'cmbPeliculas':
                           
                            break;
                        case 'cmbDias':
                            
                            break;
                        case 'cmbHorarios':
                            
                            break;    
                    }   
                    
                    
                    
                    
                }else{
                    
                    alert("error obnteniendo los datos");
                }     
            });
            
         });   
        
        
        
        
    });

    function obtenerComplejos()
    {   
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
                res.data.forEach(function(item){
                    $complejos = $complejos + '<option value="'+item.idComplejo+'">'+item.nombre+'</option>';
                });
                //lo agrego al listado
                $cmbComplejos.append($complejos);
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });
               
    };
    //obtiene peliculas y completa la cartelera
    function otenerPeliculasCartelera(){
       
        var obtener = $.ajax({
            url : URI.PELICULASCARTELERA,
            method : "GET",
            dataType : 'json',
        });
        
         obtener.done(function(res){
            if(!res.error){

                //Itero sobre la lista
                res.data.forEach(function(item){
                   
                    var peliculaCartelera = 
                        $('<a/>',   {
                            'href'   :  'compraDesdeMosaico.php?idPelicula='+ item.idPelicula
                        }).append(
                            $('<img/>', {
                                'class' :   'pelicula',
                                'id'    :   'pelicula' + item.idPelicula,
                                'src'   :   item.imagen,
                                'data-toggle':  "tooltipCartelera",
                                'title' :   item.titulo
                            })
                        
                        );
                    
                        
                    
                    $('#contenedorPeliculas').append(peliculaCartelera);
                });
                //inicializo tooltips de peliulas
                 $('[data-toggle="tooltipCartelera"]').tooltip();
                
                
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText);
        });
    
    };
    
    
    
    
    
})(jQuery)