(function($){
    var URI = {        
        ADD : 'actions/actionPeliculas.php?action=nueva',
		PELICULAS : 'actions/actionPeliculas.php?action=obtener',
        UPLOAD: 'actions/actionPeliculas.php?action=subir',
    };
	
	$idPelicula =$("#idPelicula");
	$tituloPelicula =$("#tituloPelicula");
	$duracionPelicula =$("#duracionPelicula");
	$clasificacionPelicula =$("#clasificacionPelicula");
	$generoPelicula =$("#generoPelicula");		
	$sinopsisPelicula =$("#sinopsisPelicula");
	$trailerPelicula =$("#trailerPelicula");	
	$actoresPelicula =$("#actoresPelicula");	
	$directorPelicula =$("#directorPelicula");	
	$fechaEstrenoPelicula =$("#fechaEstrenoPelicula");
	$botonAddPelicula = $("#btnAdd");
    $btnAltaModificacion = $("#btnAltaModificacion");	
	//$form =  $('#uploadForm');
	$formPelicula=$("#form-nuevaPelicula");
	$btnText =$("#btnText");
	$btnCerrar = $("#iconCerrar");
	$contenedorPeliculas=$("#contenedorPeliculas");
	
    $( document ).ready(function(){	   
        obtenerPeliculas();
        $botonAddPelicula.on("click",function(){
           $formPelicula.removeClass("hide");          
           $("#idPelicula").val("0");
           $("#tituloPelicula").val("");
           $("#duracionPelicula").val("");
           $("#clasificacionPelicula").val("");
           $("#generoPelicula").val("");		
           $("#sinopsisPelicula").val("");
           $("#imagenPelicula").val("");
           $("#trailerPelicula").val("");	
           $("#actoresPelicula").val("");	
           $("#directorPelicula").val("");	
           $("#fechaEstrenoPelicula").val("");

            $("#vistaPrevia").addClass('hide');
            $("#vistaPrevia").css('opacity', '0.0');
            $("#iconAvatar").removeClass("hide");
            $("#textoAvatar").removeClass("hide");

            $btnText.text("Crear");
        
        });
        $("#archivos_subidos").on('click', '.eliminar_archivo', function() {
            var archivo = $(this).parents('.row').eq(0).find('span').text();
            archivo = $.trim(archivo);
            eliminarArchivos(archivo);
        });
    });
	
    function subirArchivos() {
         
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var output = d.getFullYear() + '-' +
            (month<10 ? '0' : '') + month + '-' +
            (day<10 ? '0' : '') + day;
         
        $("#nombreImagen").val($("#nombre_archivo").val() + "_" + output+"." + $('#archivo').val().split('.').pop()); 
         
        $("#archivo").upload('utils/subir_archivo.php',
        {
            nombre_archivo: $("#nombre_archivo").val()
        },
        function(respuesta) {
            //Subida finalizada.
            $("#barra_de_progreso").val(0);
            if (respuesta === 1) {
                mostrarRespuesta('El archivo ha sido subido correctamente.', true);
                $("#nombre_archivo, #archivo").val('');
            } else {
                mostrarRespuesta('El archivo NO se ha podido subir.', false);
            }
            mostrarArchivos();
        }, function(progreso, valor) {
            //Barra de progreso.
            $("#barra_de_progreso").val(valor);
        });
    }
	function mostrarRespuesta(mensaje, ok){
                $("#respuesta").removeClass('alert-success').removeClass('alert-danger').html(mensaje);
                if(ok){
                    $("#respuesta").addClass('alert-success');
                }else{
                    $("#respuesta").addClass('alert-danger');
                }
            }
	
    function mostrarArchivos() {
                $.ajax({
                    url: 'utils/mostrar_archivos.php',
                    dataType: 'JSON',
                   success: function(respuesta) {
                        if (respuesta) {
                            var html = '';
                            for (var i = 0; i < respuesta.length; i++) {
                                if (respuesta[i] != undefined && respuesta[i] ==$("#nombreImagen").val()) {
                                    html += '<div class="row"> <span class="col-lg-6"> ' + respuesta[i] + ' </span> <div class="col-lg-2"> <a class="eliminar_archivo btn btn-danger" href="javascript:void(0);"> Eliminar </a> </div> </div> <hr />';
                                }
                            }
                            $("#archivos_subidos").html(html);
                        }
                    }
                });
            }
    function eliminarArchivos(archivo) {
                $.ajax({
                    url: 'utils/eliminar_archivo.php',
                    type: 'POST',
                    timeout: 10000,
                    data: {archivo: archivo},
                    error: function() {
                        mostrarRespuesta('Error al intentar eliminar el archivo.', false);
                    },
                    success: function(respuesta) {
                        if (respuesta == 1) {
                            mostrarRespuesta('El archivo ha sido eliminado.', true);
                        } else {
                            mostrarRespuesta('Error al intentar eliminar el archivo.', false);                            
                        }
                        mostrarArchivos();
                    }
                });
            }
   
    
	
	$btnCerrar.on("click",function(){
        $formPelicula.addClass("hide");   
    });
	
	
	
	$('input[type=file]').on('change', prepareUpload);
   // $form.on('submit', uploadFiles);
	
	 function prepareUpload(event){				
			files = event.target.files;						
		 };
	
	
		
		
		 var input = document.querySelector("input[type=file]"),
		 img = document.querySelector("#vistaPrevia");

		 input.addEventListener("change", function(){
			var file = this.files[0],
				reader = new FileReader();
						
			reader.addEventListener("load", function(e){
				if (img.style.opacity == 0){
					$("#vistaPrevia").removeClass('hide');
					$("#iconAvatar").addClass("hide");
					$("#textoAvatar").addClass("hide");
					img.src = e.target.result;
					img.style.opacity = 1;
				}
				else{
					img.style.opacity = 0;
					setTimeout(function(){
						$("#vistaPrevia").removeClass('hide');
						$("#iconAvatar").addClass("hide");
						$("#textoAvatar").addClass("hide");
						img.src = e.target.result;
						img.style.opacity = 1;
					}, 2250);
				}
			}, false);
					  
		 	reader.readAsDataURL(file);
		 }, false);
	
    $('#boton_subir').on('click',subirArchivos);
	
	
	
	
	   function obtenerPeliculas()
		{   
			var obtener = $.ajax({
				url : URI.PELICULAS,
				method : "GET",
				dataType : 'json',
			});
		   
			obtener.done(function(res){
				if(!res.error){				
                    $peliculas = '';
                    $contenedorPeliculas.html("");
                    res.data.forEach(function(item){
                        $peliculas=$peliculas+                    
                        '<div class="app"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>'+	
                        '<div class="col-xs-9 col-sm-9 col-md-4 col-lg-4 uploadImagen">'+
                        '<div class="avatar"><div class="avatar-content"><img src="assets/img/persona.png" id="vistaPrevia" class="imagen-avatar ">'+
                        '</div></div></div>'+
                        '<div class="col-xs-12 col-sm-9 col-md-8 col-lg-6 datos"><span id="idPelicula" class="hide">'+item.idPelicula+'</span>'+
                        '<div class="form-group"><h2 id="tituloPelicula">'+item.titulo+'</h2>'+
                        '</div><div class="form-group"><label id="lblSinopsisPelicula">'+item.sinopsis+'</label></div>'+
                        '<table class="table"><span>Ficha técnica </span>'+
                        '<tr><td style="width:25%"><span>Genero: </span></td><td><label id="lblGeneroPelicula">'+item.actores+'</label></td></tr>'+
                        '<tr><td><span>Duracion: </span></td><td><label id="lblDuracionPelicula">'+item.duracion+'<label></td></tr>'+
                        '<tr><td><span>Actores: </span></td><td><label id="lblActoresPelicula">'+item.actores+'</label></td></tr>'+
                        '<tr><td><span>Director: </span></td><td><label id="lblDirector">'+item.director+'</label></td></tr>'+
                        '<tr><td><span>Clasificación: </span></td><td><label id="lblDirectorPelicula">'+item.clasificacion+'</label></td></tr>'+
                        '<tr><td><span>Fecha de Estreno: </span></td><td><label id="lblFechaEstrenoPelicula">'+item.estreno+'</label></td></tr>'+
                        '</table></div>'+                            
                        '<div class="col-xs-12 col-sm-9 col-md-8 col-lg-1"><div class="pull-right lapiz"><span class="glyphicon glyphicon-pencil"></span>'+
                        '</div></div></div>';
                    });
                    $contenedorPeliculas.append($peliculas);
				}else{
					event.preventDefault();
					alert(res.mensaje);
				}
			});

			obtener.fail(function(res){
				alert(res.responseText)
			});
				   
		};    
    
    $contenedorPeliculas.on("click",".lapiz",function(event){
        event.preventDefault();
        $formPelicula.removeClass("hide");  

        $divPadre = $(this).closest('.app');
        $peliculaID =  $divPadre.children('#idPelicula').text();
        console.log($peliculaID);
        $peliculaTitulo =  $divPadre.children('.datos').children('#tituloPelicula').text();
        console.log($peliculaTitulo);
      
    });
	
	
    $btnAltaModificacion.on("click",function(){
			$id=$idPelicula.val();
			$titulo =$tituloPelicula.val();
			$duracion =$duracionPelicula.val();
			$clasificacion =$clasificacionPelicula.val();
			$genero =$generoPelicula.val();						
			$sinopsis =$sinopsisPelicula.val();
			$trailer =$trailerPelicula.val();
			$actores =$actoresPelicula.val();
			$director =$directorPelicula.val();
			$fechaEstreno = $fechaEstrenoPelicula.val();
            $urlimagen =  "assets/img/peliculas/" + $("#nombreImagen").val();
	
	 var addPelicula =  $.ajax({
                url: URI.ADD,
                type: 'POST',
                data: {
						idPelicula:$id,
				        tituloPelicula:$titulo,
				        duracionPelicula:$duracion,
				        clasificacionPelicula:$clasificacion,
				        generoPelicula:$genero,				        
				        sinopsisPelicula:$sinopsis,
				        trailerPelicula:$trailer,
						actoresPelicula:$actores,
						directorPelicula:$director,
						fechaEstrenoPelicula:$fechaEstreno,
                        urlimagen   :   $urlimagen
				  },
                dataType: 'json',
               
            })
            addPelicula.done(function(response){		    	 	
                $formPelicula.addClass("hide");
                obtenerPeliculas();
            }); 		
    });

})(jQuery)

