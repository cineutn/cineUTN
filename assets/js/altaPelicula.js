(function($){
    var URI = {        
        ADD : 'actions/actionPeliculas.php?action=nueva',
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
	$btnCerrar = $(".iconCerrar");
	
	  $botonAddPelicula.on("click",function(){
        $formPelicula.removeClass("hide");
        // $nombreComplejo.val("");
        // $direccionComplejo.val("");
        // $descripcionComplejo.val("");
        // $idComplejo.val("0");
        $("#vistaPrevia").addClass('hide');
        $("#vistaPrevia").css('opacity', '0.0');
        $("#iconAvatar").removeClass("hide");
        $("#textoAvatar").removeClass("hide");

        $btnText.text("Crear");
        $iconButton.removeClass('glyphicon glyphicon-pencil');
        $iconButton.addClass('glyphicon glyphicon-plus');
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
			console.log($idPelicula.val());
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
					//obtenerComplejos();
				});

			}else{
				 alert("Debes primero dar de alta el complejo para colocarle una imagen.");
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
		    	console.log(response);  							
				alert('guardo');
            }); 		
    });

})(jQuery)