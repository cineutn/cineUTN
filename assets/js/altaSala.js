 var URI = {        
        ADD : 'actions/actionAltaSala.php?action=nueva',		
    };

$salaNueva =$("#rowSala");
$btnAltaModificacion =$(".botonVerde");
$nombreSala =$("#nombreSala");
$fila =$("#fila");
$columna =$("#columna");


$("#btnAddRow" ).click(function() {
 
    $salaNueva.removeClass("rowHide"); 
    $fila.attr('maxlength',2);
    $columna.attr('maxlength',2);    
    /*$rowSala='';
    $rowSala=$rowSala +
    '<tr><td><input name="nombreSala" id="nombreSala" placeholder="nombre sala" type="text" class="form-control"></td>'+
    '<td><input name="fila" id="fila" placeholder="fila" type="text" class="form-control"></td>'+
    '<td><input name="columna" id="columna" placeholder="columna" type="text" class="form-control"></td>'+
    '<td><button type="button" class="btn btn-default btn-circle botonVerde"><i class="glyphicon glyphicon-ok textoBoton"></i></button></button></td>'+
    '<td><button  class="botonAzul" type="button"><i class="glyphicon glyphicon-pencil textoBoton"></i></button></td></tr>';
    $sala.append($rowSala);*/
});

 $btnAltaModificacion.on("click",function(){
     bValidar="false";
     bValidar = validarDatos();      
      if (bValidar){
          console.log('inserto '+$nombreSala.val() +','+ $fila.val() +','+$columna.val() );
           var addSala =  $.ajax({
                url: URI.ADD,
                type: 'POST',
                data: {
						nombreSala:$nombreSala.val(),
				        filas:$fila.val(),				        
						columnas:$columna.val()
				  },
                dataType: 'json',
               
            })
            addSala.done(function(response){	
                console.log(response);
                //$formPelicula.addClass("hide");
                //obtenerPeliculas();
            }); 
          
          
      
      }
 
 });


 function validarDatos(){
     var bRetorno = true;
     
     if($nombreSala.val().length == 0){
          $nombreSala.closest(".form-group").addClass("has-error");          
          $nombreSala.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $nombreSala.closest(".form-group").removeClass("has-error");          
          $nombreSala.siblings(".help-block").html("");
        }
     
     if($fila.val().length==0){
          $fila.closest(".form-group").addClass("has-error");          
          $fila.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;     
     }else{
         $fila.closest(".form-group").removeClass("has-error");          
         $fila.siblings(".help-block").html("");    
     }    
     
    if($columna.val().length==0){
          $columna.closest(".form-group").addClass("has-error");          
          $columna.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;     
     }else{
         $columna.closest(".form-group").removeClass("has-error");          
         $columna.siblings(".help-block").html("");    
     }  
     
     return bRetorno;
 }

  $fila.on("keypress", function(event){
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
    return true;               
    return /\d/.test(String.fromCharCode(keynum));
  });

 $columna.on("keypress", function(event){
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
    return true;               
    return /\d/.test(String.fromCharCode(keynum));
  });

