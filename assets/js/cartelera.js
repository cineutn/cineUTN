(function($){

    $('title').html("Cartelera");

    var URI = {        
        PELICULAS : 'actions/actionPeliculas.php?action=obtenerCarteleraComplejo',
        COMPLEJOS : 'actions/actionComplejos.php?action=obtener'    
    };
	
    $cmbComplejo = $("#cmbComplejo");
    $btnBuscarCartelera = $("#btnBuscarCartelera");
	
	$contenedorPeliculas = $("#contenedorPeliculas");
	    
    $( document ).ready(function(){	   
        obtenerComplejos();
        obtenerPeliculas();                
    });
    
    $btnBuscarCartelera.on("click", function(){
        obtenerPeliculas();
    });

    function obtenerComplejos(){
       
        var obtener = $.ajax({
            url : URI.COMPLEJOS,
            method : "GET",
            dataType : 'json',
            async:false
        });
       
        obtener.done(function(res){
            if(!res.error){
                $complejos = '';
                //Borro el listado actual
                $cmbComplejo.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){
                    $complejos = $complejos + '<option value="'+item.idComplejo+'">'+item.nombre+'</option>';
                });
                //lo agrego al listado
                $cmbComplejo.append($complejos);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('Cartelera');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('Cartelera');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });               
    };       
   
	function obtenerPeliculas(){
        $id = $cmbComplejo.val();

		var obtener = $.ajax({
			url : URI.PELICULAS,
			method : "GET",
			dataType : 'json',
            data:{idComplejo:$id}
		});
		   
		obtener.done(function(res){
			if(!res.error){				
                $peliculas = '';
                
                var nombre = '';
                var formato = '';
                var idioma = '';
                var lenguaje = '';
                var dias = '';
                var horarios = '';

                $contenedorPeliculas.html("");
                for (var iPelicula = 0; iPelicula <= res.data.length -1 ; iPelicula++) {
                    var nombrePelicula;
                    var bUltimo = false;
                    var bAgregar = false;

                    if (iPelicula == 0){
                        nombre = res.data[iPelicula].titulo;
                        formato = res.data[iPelicula].formato;
                        idioma = res.data[iPelicula].subtitulada;                        
                    }else if(iPelicula == res.data.length -1){
                        bUltimo = true;
                    }

                    if (nombre == res.data[iPelicula].titulo && formato == res.data[iPelicula].formato && idioma == res.data[iPelicula].subtitulada){
                        if(dias.indexOf(res.data[iPelicula].dia) == -1){
                            dias = dias + res.data[iPelicula].dia + ' - ';
                        }
                        if(horarios.indexOf(res.data[iPelicula].horario) == -1){
                            horarios = horarios + res.data[iPelicula].horario + ' - ';
                        }                       
                    }else{
                        bAgregar = true;
                    }

                    if (bAgregar){

                        if (res.data[iPelicula-1].formato == "3D"){
                            nombrePelicula = res.data[iPelicula-1].titulo + " - 3D";
                        }else{
                            nombrePelicula = res.data[iPelicula-1].titulo;
                        }

                        if (res.data[iPelicula-1].subtitulada == "1"){
                            lenguaje = "Subtitulada";
                            nombrePelicula = nombrePelicula + " (Subt)";
                        }else{
                            nombrePelicula = nombrePelicula + " (Cast)";
                            lenguaje = "Castellano";
                        }
                        
                        if(dias.endsWith(' - ')){
                            dias = dias.substring(0,dias.length -3);
                        }

                        if(horarios.endsWith(' - ')){
                            horarios = horarios.substring(0,horarios.length -3);
                        }

                        $peliculas=$peliculas+                    
                        '<div class="app">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>'+   
                            '<div class="col-xs-9 col-sm-9 col-md-4 col-lg-4 uploadImagen">'+
                                '<div class="avatar">'+
                                    '<div class="avatar-content">'+
                                        '<img src="'+res.data[iPelicula-1].imagen+'" id="vistaPrevia" class="imagen-avatar ">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-xs-12 col-sm-9 col-md-8 col-lg-6 datos">'+                            
                                '<div class="form-group">'+
                                    '<h2 id="tituloPelicula">'+nombrePelicula+'</h2>'+
                                '</div>'+                            
                                '<table class="table">'+
                                '<tr><td style="width:25%"><span>Dias: </span></td><td class="datosTabla"><label>'+dias+'</label></td></tr>'+
                                '<tr><td><span>Horarios: </span></td><td class="datosTabla"><label>'+horarios+'<label></td></tr>'+
                                '<tr><td><span>Idioma: </span></td><td class="datosTabla"><label>'+lenguaje+'</label></td></tr>'+                           
                                '</table>'+
                            '</div>'+                            
                        '</div>';

                        dias = res.data[iPelicula].dia + ' - ';                      
                        horarios = res.data[iPelicula].horario + ' - ';                       

                        nombre = res.data[iPelicula].titulo;
                        formato = res.data[iPelicula].formato;
                        idioma = res.data[iPelicula].subtitulada;
                    }
                     
                    if (bUltimo){

                        if (dias.length == 0 ){
                            dias = dias + res.data[iPelicula].dia;
                        }

                        if (horarios.length == 0 ){
                            horarios = horarios + res.data[iPelicula].horario;
                        }

                        if (res.data[iPelicula-1].formato == "3D"){
                            nombrePelicula = res.data[iPelicula].titulo + " - 3D";
                        }else{
                            nombrePelicula = res.data[iPelicula].titulo;
                        }

                        if (res.data[iPelicula-1].subtitulada == "1"){
                            lenguaje = "Subtitulada";
                            nombrePelicula = nombrePelicula + " (Subt)";
                        }else{
                            nombrePelicula = nombrePelicula + " (Cast)";
                            lenguaje = "Castellano";
                        }
                        
                        if(dias.endsWith(' - ')){
                            dias = dias.substring(0,dias.length -3);
                        }

                        if(horarios.endsWith(' - ')){
                            horarios = horarios.substring(0,horarios.length -3);
                        }

                        $peliculas=$peliculas+                    
                        '<div class="app">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>'+   
                            '<div class="col-xs-9 col-sm-9 col-md-4 col-lg-4 uploadImagen">'+
                                '<div class="avatar">'+
                                    '<div class="avatar-content">'+
                                        '<img src="'+res.data[iPelicula].imagen+'" id="vistaPrevia" class="imagen-avatar ">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-xs-12 col-sm-9 col-md-8 col-lg-6 datos">'+                            
                                '<div class="form-group">'+
                                    '<h2 id="tituloPelicula">'+nombrePelicula+'</h2>'+
                                '</div>'+                            
                                '<table class="table">'+
                                '<tr><td style="width:25%"><span>Dias: </span></td><td class="datosTabla"><label>'+dias+'</label></td></tr>'+
                                '<tr><td><span>Horarios: </span></td><td class="datosTabla"><label>'+horarios+'<label></td></tr>'+
                                '<tr><td><span>Idioma: </span></td><td class="datosTabla"><label>'+lenguaje+'</label></td></tr>'+                           
                                '</table>'+
                            '</div>'+                            
                        '</div>';                       
                       
                        dias = '';
                        horarios = '';
                    
                        nombre = res.data[iPelicula].titulo;
                        formato = res.data[iPelicula].formato;
                        idioma = res.data[iPelicula].subtitulada;
                    }
                };
               
                $contenedorPeliculas.append($peliculas);
			}else{
				event.preventDefault();
				//alert(res.mensaje);
                $('#msgBoxTitulo').text('Peliculas');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
			}
		});

		obtener.fail(function(res){
			//alert(res.responseText);
            $('#msgBoxTitulo').text('Peliculas');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
		});			   
	};       
   
})(jQuery)