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
	$imagenPelicula =$("#imagenPelicula");
	$trailerPelicula =$("#trailerPelicula");	
	$actoresPelicula =$("#actoresPelicula");	
	$directorPelicula =$("#directorPelicula");	
	$fechaEstrenoPelicula =$("#fechaEstrenoPelicula");
	$botonAddPelicula = $("#btnAdd");
    $btnAltaModificacion = $("#btnAltaModificacion");	
	$form =  $('#uploadForm');
	$formPelicula=$("#form-nuevaPelicula");
	$btnText =$("#btnText");
	$btnCerrar = $("#iconCerrar");
	$contenedorPeliculas=$("#contenedorPeliculas");
	
	   $( document ).ready(function(){	   
        obtenerPeliculas();
    });
	
	
	
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
	
	  $btnCerrar.on("click",function(){
        $formPelicula.addClass("hide");   
    });
	
	
	
	$('input[type=file]').on('change', prepareUpload);
    $form.on('submit', uploadFiles);
	
	 function prepareUpload(event){				
			files = event.target.files;						
		 };
	
	    function uploadFiles(event){			
			event.stopPropagation();
			event.preventDefault();			
			id = $idPelicula.val();
			 if (id > 0 ){
				var data = new FormData();
		   
				$.each(files, function(key, value){
					data.append(key, value);
				});
				

				var uploadImage =  $.ajax({
					url: URI.UPLOAD + "&idPelicula=" + id,
					type: 'POST',
					data: data,
					cache: false,
					dataType: 'json',
					processData: false,
					contentType: false
				})

				uploadImage.done(function(response){
					alert(response.mensaje);
				});

				uploadImage.always(function(response){
					$form-nuevaPelicula.addClass("hide");					
				});

			}else{
				 alert("Debes primero dar de alta la pelicula para colocarle una imagen.");
			}        
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
			$imagen =$imagenPelicula.val();
			$trailer =$trailerPelicula.val();
			$actores =$actoresPelicula.val();
			$director =$directorPelicula.val();
			$fechaEstreno = $fechaEstrenoPelicula.val();	
	
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
				        imagenPelicula:$imagen,
				        trailerPelicula:$trailer,
						actoresPelicula:$actores,
						directorPelicula:$director,
						fechaEstrenoPelicula:$fechaEstreno
				  },
                dataType: 'json',
               
            })
            addPelicula.done(function(response){		    	 	
                $formPelicula.addClass("hide");
                obtenerPeliculas();
            }); 		
    });

})(jQuery)

