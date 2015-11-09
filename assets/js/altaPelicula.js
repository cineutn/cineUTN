(function($){

    $('title').html("Peliculas");

    var URI = {        
        ADD : 'actions/actionPeliculas.php?action=nueva',
		PELICULAS : 'actions/actionPeliculas.php?action=obtener',
        UPLOAD: 'actions/actionPeliculas.php?action=subir',
        REMOVE: 'actions/actionPeliculas.php?action=eliminar',
        UPDATE: 'actions/actionPeliculas.php?action=modificar',
        GETFORMATOS : 'actions/actionPeliculas.php?action=obtenerFormatos',
        VALIDAR : 'actions/actionPeliculas.php?action=validar'
    };
	
    $txtPelicula = $("#txtPelicula");
    $btnBuscarPelicula = $("#btnBuscarPelicula");

	$idPelicula = $("#idPelicula");
	$tituloPelicula = $("#tituloPelicula");
	$duracionPelicula = $("#duracionPelicula");
	$clasificacionPelicula = $("#clasificacionPelicula");
	$generoPelicula = $("#generoPelicula");		
	$sinopsisPelicula = $("#sinopsisPelicula");
	$trailerPelicula = $("#trailerPelicula");	
	$actoresPelicula = $("#actoresPelicula");	
	$directorPelicula = $("#directorPelicula");	
	$fechaEstrenoPelicula = $("#fechaEstrenoPelicula");
	$botonAddPelicula = $("#btnAdd");
    $btnAltaModificacion = $("#btnAltaModificacion");	
	//$form =  $('#uploadForm');
	$formPelicula = $("#form-nuevaPelicula");
	$btnText = $("#btnText");
	$btnCerrar = $("#iconCerrar");
	$contenedorPeliculas = $("#contenedorPeliculas");
	
    $cmbFormatos = $("#cmbFormato");

    $( document ).ready(function(){	   
        obtenerPeliculas();
        obtenerFormatos();
        $("#archivos_subidos").on('click', '.eliminar_archivo', function() {
            var archivo = $(this).parents('.row').eq(0).find('span').text();
            archivo = $.trim(archivo);
            eliminarArchivos(archivo);
        });
    });

    function obtenerFormatos(){   
       var obtener = $.ajax({
            url : URI.GETFORMATOS,
            method : "GET",
            dataType : 'json',
        });
       
        obtener.done(function(res){
            if(!res.error){
                $formatos = '<option value="0">Seleccione un formato</option>';
                //Borro el listado actual
                $cmbFormatos.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){
                    var lenguaje;
                    if (item.subtitulada == "1"){
                        lenguaje = "Subtitulada";
                    }else{
                        lenguaje = "Castellano";
                    }

                    $formatos = $formatos + '<option value="'+item.idFormato+'">'+item.descripcion+ ' ' + lenguaje + '</option>';
                });
                //lo agrego al listado
                $cmbFormatos.append($formatos);
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });         
    };

    $btnBuscarPelicula.on("click", function(){

        var nombre = $txtPelicula.val();
   
        if(nombre == ""){
            $( "div.app").css( "display", "block" );
        }else{
            $( "div.app").css( "display", "none" );
            
            //esta funcion permite buscar elementos con mayusculas.
            jQuery.expr[':'].contains = function(a, i, m) {
                return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
            };

            $( "div.app:contains('"+ nombre +"')" ).css( "display", "block" );
        }
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
	
	function obtenerPeliculas(){
        
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

                    var formato;

                    if (item.subtitulada == "1"){
                        formato = item.descripcion + " Subtitulada";
                    }else{
                        formato = item.descripcion + " Castellano";
                    }

                    var formattedDate = new Date(item.estreno);
                    var dia = formattedDate.getDate();
                    dia = dia = ("0" + dia).slice(-2);

                    var mes =  formattedDate.getMonth();
                    mes += 1;  // JavaScript months are 0-11
                    mes = ("0" + mes).slice(-2);

                    var year = formattedDate.getFullYear();

                    var fechaEstreno = year + "-" + mes + "-" + dia;

                    $peliculas=$peliculas+                    
                    '<div class="app">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>'+	
                        '<div class="col-xs-9 col-sm-9 col-md-4 col-lg-4 uploadImagen">'+
                            '<div class="avatar">'+
                                '<div class="avatar-content">'+
                                    '<img src="'+item.imagen+'" id="vistaPrevia" class="imagen-avatar ">'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-9 col-md-8 col-lg-6 datos">'+
                            '<span id="idPelicula" class="hide">'+item.idPelicula+'</span>'+
                            '<div class="form-group">'+
                                '<h2 id="tituloPelicula">'+item.titulo+'</h2>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label id="lblSinopsisPelicula">'+item.sinopsis+'</label>'+
                            '</div>'+
                            '<table class="table"><span>Ficha técnica </span>'+
                            '<tr><td style="width:25%"><span>Genero: </span></td><td class="datosTabla"><label id="lblGeneroPelicula">'+item.genero+'</label></td></tr>'+
                            '<tr><td><span>Duracion: </span></td><td class="datosTabla"><label id="lblDuracionPelicula">'+item.duracion+'<label></td></tr>'+
                            '<tr><td><span>Actores: </span></td><td class="datosTabla"><label id="lblActoresPelicula">'+item.actores+'</label></td></tr>'+
                            '<tr><td><span>Director: </span></td><td class="datosTabla"><label id="lblDirector">'+item.director+'</label></td></tr>'+
                            '<tr><td><span>Clasificación: </span></td><td class="datosTabla"><label id="lblClasificacion">'+item.clasificacion+'</label></td></tr>'+
                            '<tr><td><span>Fecha de Estreno: </span></td><td class="datosTabla"><label id="lblFechaEstrenoPelicula">'+fechaEstreno+'</label></td></tr>'+
                            '<tr><td><span>Trailer: </span></td><td class="datosTabla"><label id="lblTrailerPelicula">'+item.trailer+'</label></td></tr>'+
                            '<tr><td><span>Formato: </span></td><td class="datosTabla"><label id="lblFormatoPelicula">'+formato+'</label></td></tr>'+
                            '</table>'+
                        '</div>'+                            
                        '<div class="col-xs-12 col-sm-9 col-md-8 col-lg-1">'+
                            '<div class="pull-right lapiz">'+
                                '<span class="glyphicon glyphicon-pencil"></span>'+
                            '</div>'+
                            '<div class="pull-right cruz">'+
                                '<span class="glyphicon glyphicon-remove"></span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
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
       $("#cmbFormato").val("0");

        $("#vistaPrevia").addClass('hide');
        $("#vistaPrevia").css('opacity', '0.0');
        $("#iconAvatar").removeClass("hide");
        $("#textoAvatar").removeClass("hide");

        $btnText.text("Crear");
        $("#iconButton").addClass('glyphicon-plus');
        $("#iconButton").removeClass('glyphicon-pencil');
    });

    $contenedorPeliculas.on("click",".lapiz",function(event){
        event.preventDefault();
        $formPelicula.removeClass("hide");  

        $divPadre = $(this).closest('.app');
        $peliculaID =  $divPadre.children('.datos').children('#idPelicula').text();        
        $peliculaTitulo =  $divPadre.children('.datos').children('.form-group').children('#tituloPelicula').text();
        $peliculaSinopsis = $divPadre.children('.datos').children('.form-group').children('#lblSinopsisPelicula').text();
        $pathImagen = $divPadre.children('.uploadImagen').children('.avatar').children('.avatar-content').children('#vistaPrevia').attr('src');;
        
        $tablaBody = $divPadre.children('.datos').children('table').children('tbody');
        $peliculaGenero = $tablaBody.children('tr').children('.datosTabla').children('#lblGeneroPelicula').text();
        $peliculaDuracion = $tablaBody.children('tr').children('.datosTabla').children('#lblDuracionPelicula').text();
        $peliculaActores = $tablaBody.children('tr').children('.datosTabla').children('#lblActoresPelicula').text();
        $peliculaDirector = $tablaBody.children('tr').children('.datosTabla').children('#lblDirector').text();
        $peliculaClasificacion = $tablaBody.children('tr').children('.datosTabla').children('#lblClasificacion').text();
        $peliculaFechaEstreno = $tablaBody.children('tr').children('.datosTabla').children('#lblFechaEstrenoPelicula').text();
        $peliculaTrailer = $tablaBody.children('tr').children('.datosTabla').children('#lblTrailerPelicula').text();
        $peliculaFormato = $tablaBody.children('tr').children('.datosTabla').children('#lblFormatoPelicula').text();

        $("#idPelicula").val($peliculaID);
        $("#tituloPelicula").val($peliculaTitulo);
        $("#duracionPelicula").val($peliculaDuracion);
        $("#clasificacionPelicula").val($peliculaClasificacion);
        $("#generoPelicula").val($peliculaGenero);        
        $("#sinopsisPelicula").val($peliculaSinopsis);
        $("#trailerPelicula").val($peliculaTrailer);   
        $("#actoresPelicula").val($peliculaActores);   
        $("#directorPelicula").val($peliculaDirector);
        $("#imagenPelicula").val($pathImagen);
        $("#fechaEstrenoPelicula").val($peliculaFechaEstreno);

        $nombreImagen = $pathImagen.replace("assets/img/peliculas/", " ");
        $nombreImagen = $nombreImagen.trim();

        $("#nombreImagen").val($nombreImagen);        
        
        var formato = $("#cmbFormato option:contains('"+$peliculaFormato+"')").val();
      
        $("#cmbFormato").val(formato);

        $("#vistaPrevia").removeClass('hide');
        $("#vistaPrevia").attr('src',$pathImagen);
        $("#vistaPrevia").css('opacity', '1.0');
        $("#iconAvatar").addClass("hide");
        $("#textoAvatar").addClass("hide");

        $btnText.text("Modificar");
        $("#iconButton").removeClass('glyphicon-plus');
        $("#iconButton").addClass('glyphicon-pencil');

        validarPelicula()
    });
	
    $contenedorPeliculas.on("click",".cruz",function(event){
        event.preventDefault();
        
        if(confirm("¿Desea eliminar la Pelicula seleccionada?")){
            $divPadre = $(this).closest('.app');
            $peliculaID =  $divPadre.children('.datos').children('#idPelicula').text();
           
            var deletePelicula =  $.ajax({
                url: URI.REMOVE,
                type: 'POST',
                data: {idPelicula:$peliculaID},
                dataType: 'json'
            })

            deletePelicula.done(function(response){
                $formPelicula.addClass("hide");
                obtenerPeliculas();
            });

        }
        else{
            return false;
        }
    });
	
    $btnAltaModificacion.on("click",function(){

		$id = $idPelicula.val();
		$titulo = $tituloPelicula.val();
		$duracion = $duracionPelicula.val();
		$clasificacion = $clasificacionPelicula.val();
		$genero = $generoPelicula.val();						
		$sinopsis = $sinopsisPelicula.val();
		$trailer = $trailerPelicula.val();
		$actores = $actoresPelicula.val();
		$director = $directorPelicula.val();
		$fechaEstreno = $fechaEstrenoPelicula.val();
        $urlimagen =  "assets/img/peliculas/" + $("#nombreImagen").val();
	    $idFormato = $("#cmbFormato").val();

        var bValidar;

        bValidar = validarPelicula();

        if (bValidar){

            if ($id == "0"){
        	    var addPelicula =  $.ajax({
                        url: URI.ADD,
                        type: 'POST',
                        data:{
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
                                urlimagen:$urlimagen,
                                idFormato:$idFormato
        				    },
                        dataType: 'json'
                    });

                    addPelicula.done(function(response){		    	 	
                       if(!response.error){               
                            $formPelicula.addClass("hide");
                            $("#respuesta").removeClass('alert-success');
                            $("#respuesta").html("");
                            obtenerPeliculas();
                        }else{
                            alert(response.mensaje);
                        }
                    });
            }else{

                var updatePelicula =  $.ajax({
                        url: URI.UPDATE,
                        type: 'POST',
                        data:{
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
                                urlimagen:$urlimagen,
                                idFormato:$idFormato
                            },
                        dataType: 'json'
                    });

                    updatePelicula.done(function(response){
                        if(!response.error){               
                            $formPelicula.addClass("hide");
                            $("#respuesta").removeClass('alert-success');
                            $("#respuesta").html("");
                            obtenerPeliculas();
                        }else{
                            alert(response.mensaje);
                        }
                    });
            }
        }
    });
    
    function validarPelicula(){
        var bRetorno = true;

        $id = $idPelicula.val();
        $idFormato = $("#cmbFormato").val();
        
        $titulo = $tituloPelicula.val();
        if($titulo.length == 0){
          $tituloPelicula.closest(".form-group").addClass("has-error");
          $tituloPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $tituloPelicula.siblings(".help-block").html("Debe ingresar un titulo para la pelicula");
          bRetorno = false;
        }else{

            var validar =  $.ajax({
                    url: URI.VALIDAR,
                    type: 'GET',
                    data: {idPelicula:$id,
                           tituloPelicula:$titulo,
                           idFormato:$idFormato},
                    dataType: 'json',
                    async: false
                   
                })

                validar.done(function(response){
                     if(response.error){
                        $tituloPelicula.closest(".form-group").addClass("has-error");
                        $tituloPelicula.siblings(".glyphicon-remove").removeClass("hide");
                        $tituloPelicula.siblings(".help-block").html(response.mensaje);
                        bRetorno = false;
                    }else{
                        $tituloPelicula.closest(".form-group").removeClass("has-error");
                        $tituloPelicula.siblings(".glyphicon-remove").addClass("hide");
                        $tituloPelicula.siblings(".help-block").html(""); 
                    }

                });          
        }

        $duracion = parseInt($duracionPelicula.val());
        if($duracion <= 0 ){
            $duracionPelicula.closest(".col-lg-12").addClass("has-error");
            $duracionPelicula.siblings(".glyphicon-remove").removeClass("hide");
            $duracionPelicula.siblings(".help-block").html("La duración no puede ser inferior o igual a 0");
            bRetorno = false;
        }else if(isNaN($duracion)){
            $duracionPelicula.closest(".col-lg-12").addClass("has-error");
            $duracionPelicula.siblings(".glyphicon-remove").removeClass("hide");
            $duracionPelicula.siblings(".help-block").html("La duración ingresada no es correcta");
            bRetorno = false;
        }else{
            $duracionPelicula.closest(".col-lg-12").removeClass("has-error");
            $duracionPelicula.siblings(".glyphicon-remove").addClass("hide");
            $duracionPelicula.siblings(".help-block").html("");
        }

        $clasificacion = $clasificacionPelicula.val();
        if($clasificacion.length == 0){
          $clasificacionPelicula.closest(".col-lg-12").addClass("has-error");
          $clasificacionPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $clasificacionPelicula.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $clasificacionPelicula.closest(".col-lg-12").removeClass("has-error");
          $clasificacionPelicula.siblings(".glyphicon-remove").addClass("hide");
          $clasificacionPelicula.siblings(".help-block").html("");          
        }

        $genero = $generoPelicula.val();
        if($genero.length == 0){
          $generoPelicula.closest(".col-lg-12").addClass("has-error");
          $generoPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $generoPelicula.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $generoPelicula.closest(".col-lg-12").removeClass("has-error");
          $generoPelicula.siblings(".glyphicon-remove").addClass("hide");
          $generoPelicula.siblings(".help-block").html("");          
        }

        $sinopsis = $sinopsisPelicula.val();
        if($sinopsis.length == 0){
          $sinopsisPelicula.closest(".form-group").addClass("has-error");
          $sinopsisPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $sinopsisPelicula.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $sinopsisPelicula.closest(".form-group").removeClass("has-error");
          $sinopsisPelicula.siblings(".glyphicon-remove").addClass("hide");
          $sinopsisPelicula.siblings(".help-block").html("");          
        }

        $trailer = $trailerPelicula.val();
        if($trailer.length == 0){
          $trailerPelicula.closest(".col-lg-12").addClass("has-error");
          $trailerPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $trailerPelicula.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $trailerPelicula.closest(".col-lg-12").removeClass("has-error");
          $trailerPelicula.siblings(".glyphicon-remove").addClass("hide");
          $trailerPelicula.siblings(".help-block").html("");          
        }

        $actores = $actoresPelicula.val();
        if($actores.length == 0){
          $actoresPelicula.closest(".col-lg-12").addClass("has-error");
          $actoresPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $actoresPelicula.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $actoresPelicula.closest(".col-lg-12").removeClass("has-error");
          $actoresPelicula.siblings(".glyphicon-remove").addClass("hide");
          $actoresPelicula.siblings(".help-block").html("");          
        }

        $director = $directorPelicula.val();
        if($director.length == 0){
          $directorPelicula.closest(".col-lg-12").addClass("has-error");
          $directorPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $directorPelicula.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $directorPelicula.closest(".col-lg-12").removeClass("has-error");
          $directorPelicula.siblings(".glyphicon-remove").addClass("hide");
          $directorPelicula.siblings(".help-block").html("");          
        }

        $fechaEstreno = $fechaEstrenoPelicula.val();
        if($fechaEstreno.length == 0){
          $fechaEstrenoPelicula.closest(".col-lg-12").addClass("has-error");
          $fechaEstrenoPelicula.siblings(".glyphicon-remove").removeClass("hide");
          $fechaEstrenoPelicula.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $fechaEstrenoPelicula.closest(".col-lg-12").removeClass("has-error");
          $fechaEstrenoPelicula.siblings(".glyphicon-remove").addClass("hide");
          $fechaEstrenoPelicula.siblings(".help-block").html("");          
        }

        $idFormato = $("#cmbFormato").val();
        if($idFormato == 0){
          $("#cmbFormato").closest(".col-lg-12").addClass("has-error");
          $("#cmbFormato").siblings(".glyphicon-remove").removeClass("hide");
          $("#cmbFormato").siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $("#cmbFormato").closest(".col-lg-12").removeClass("has-error");
          $("#cmbFormato").siblings(".glyphicon-remove").addClass("hide");
          $("#cmbFormato").siblings(".help-block").html("");          
        }

        return bRetorno;
    };

})(jQuery)

