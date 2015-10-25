 var URI = {        
        ADD : 'actions/actionAltaSala.php?action=nueva',
        SALAS: 'actions/actionAltaSala.php?action=obtener',	
    };

$salaNueva =$("#rowSala");
$contenedorSalas =$("#salas");
$btnAltaModificacion =$(".botonVerde");
$nombreSala =$("#nombreSala");
$fila =$("#fila");
$columna =$("#columna");


$(document ).ready(function(){	   
        obtenerSalas();
    });

$("#btnAddRow" ).click(function() {
 console.log('click');
    $salaNueva.removeClass("rowHide"); 
    $fila.attr('maxlength',2);
    $columna.attr('maxlength',2);          
});

 $btnAltaModificacion.on("click",function(){
     bValidar="false";
     bValidar = validarDatos();      
      if (bValidar){          
           var addSala =  $.ajax({
                url: URI.ADD,
                type: 'POST',
                data: {
                        idSala:0,
						nombreSala:$nombreSala.val(),
				        filas:$fila.val(),				        
						columnas:$columna.val()
				  },
                dataType: 'json',
               
            })
            addSala.done(function(response){	
                console.log(response);
                $salaNueva.addClass("rowHide");                
                obtenerSalas();
            }); 
      } 
 });

function obtenerSalas(){       
    var obtener = $.ajax({
        url : URI.SALAS,
        method : "GET",
        dataType : 'json',
    });

    obtener.done(function(res){
        if(!res.error){				            
            $row='';
            $contenedorSalas.html("");
            
            res.data.forEach(function(item){                
                $row=$row +
                '<tr><td><input type="hidden" id="idSala" value='+item.idSala+' ></input><span>'+item.descripcion+'</span></td>'+
                '<td><span>'+item.fila+'</span></td>'+
                '<td><span>'+item.columna+'</span></td>'+
                '<td><button type="button" class="btn btn-default btn-circle botonRojo"><i class="glyphicon glyphicon-remove textoBoton"></i></button></button></td>'+
                '<td><button  class="botonAzul" type="button"><i class="glyphicon glyphicon-pencil textoBoton"></i></button></td></tr>';                
            });
            $contenedorSalas.append($row);
        }else{
            event.preventDefault();
            alert(res.mensaje);
        }
    });

    obtener.fail(function(res){
        alert(res.responseText)
    });

};

  $contenedorSalas.on("click",".botonRojo",function(event){
        event.preventDefault();
        
        $idSala =$(this).parent().parent()[0].childNodes[0].children[0].value;
        $nombreSala =$(this).parent().parent()[0].childNodes[0].children[1].outerText;
        console.log($idSala +',  '+  $nombreSala); 
      
      
    
        $("#myModal").show();
      
      
       $("#myModal").on("show", function() {    // wire up the OK button to dismiss the modal when shown
        $("#myModal a.btn").on("click", function(e) {
            console.log("button pressed");   // just as an example...
            $("#myModal").modal('hide');     // dismiss the dialog
        });
    });
    $("#myModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
        $("#myModal a.btn").off("click");
    });
    
    $("#myModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
        $("#myModal").remove();
    });
    
    $("#myModal").modal({                    // wire up the actual modal functionality and show the dialog
      "backdrop"  : "static",
      "keyboard"  : true,
      "show"      : true                     // ensure the modal is shown immediately
    });
      
      
      
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

     