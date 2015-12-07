
$('title').html("Salas");

 var URI = {        
        ADD : 'actions/actionAltaSala.php?action=nueva',
        SALAS: 'actions/actionAltaSala.php?action=obtener',	
        ELIMINAR: 'actions/actionAltaSala.php?action=eliminar',	        	
        DIAGRAMAR: 'actions/actionEsquemaSala.php?action=nuevaDetalle',	
        ELIMINARDIAGRAMA: 'actions/actionEsquemaSala.php?action=eliminar',
        VALIDAR: 'actions/actionAltaSala.php?action=validar'
    };

$salaNueva =$("#rowSala");
$contenedorSalas =$("#salas");
$btnAltaModificacion =$(".botonVerde");
$nombreSala =$("#nombreSala");
$fila =$("#fila");
$columna =$("#columna");
$tablaSala= $("#tablaSala");
$idComplejoUsuario = sessionStorage.getItem('idcomplejo');
$nombres=[''];

$(document ).ready(function(){	   
        obtenerSalas();   
    });

$("#btnAddRow" ).click(function() { 
    $salaNueva.removeClass("rowHide"); 
    $fila.attr('maxlength',2);
    $columna.attr('maxlength',2);
    $("#nombreSala").val("");
    $("#fila").val("");
    $("#columna").val("");
});

$tablaSala.on("click",".botonNegro",function(event){
    event.preventDefault();    
    $salaNueva.addClass("rowHide");   
});

$btnAltaModificacion.on("click",function(){
    $('#modalLoading').modal('show');
     bValidar="false";
     $nombreSala =$("#nombreSala");
     $fila =$("#fila");
     $columna =$("#columna");
   
     bValidar = validarDatos();      
      if (bValidar){          
           var addSala =  $.ajax({
                url: URI.ADD,
                type: 'POST',
                async: false,
                data: {
                        idSala:0,
						nombreSala:$nombreSala.val(),
				        filas:$fila.val(),				        
						columnas:$columna.val(),
                        idComplejo:$idComplejoUsuario
				  },
                dataType: 'json',
               
            })
            addSala.done(function(response){	                
                diagramarSalaDetalle($fila.val(),$columna.val(),response.data.idSala)
                $salaNueva.addClass("rowHide");
                $('#modalLoading').modal('hide');
                obtenerSalas();
            }); 
      } 
    $('#modalLoading').modal('hide');
 });

function obtenerSalas(){   
    $contenedorSalas.html("");
    var obtener = $.ajax({
        url : URI.SALAS,
        method : "GET",
         data: { idComplejo:$idComplejoUsuario },
        dataType : 'json',
    });

    obtener.done(function(res){
        if(!res.error){				            
            $row='';
            $contenedorSalas.html("");            
            res.data.forEach(function(item){  
                //lo paso a mayusculas
                $nombres.push(item.descripcion.toUpperCase().trim());
                $row=$row +
                '<tr><td><input type="hidden" id="idSala" value='+item.idSala+' ></input><span>'+item.descripcion+'</span></td>'+
                '<td><span>'+item.filas+'</span></td>'+
                '<td><span>'+item.columnas+'</span></td>'+
                '<td><button type="button" class="btn btn-default btn-circle botonRojo"><i class="glyphicon glyphicon-remove textoBoton"></i></button></td>'+
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

//eliminar sala
  $contenedorSalas.on("click",".botonRojo",function(event){
        event.preventDefault();        
        $idSala =$(this).parent().parent()[0].childNodes[0].children[0].value;
        $nombreSala =$(this).parent().parent()[0].childNodes[0].children[1].outerText;
        $("#idSalaEliminar").val($idSala); 
      validarFuncionesExistntes($idSala);       
    });

function validarFuncionesExistntes($idSala){    
      var validar =  $.ajax({
                url: URI.VALIDAR,
                type: 'POST',                
                data: {
                        idSala:$idSala
				  },
                dataType: 'json',               
            })
            validar.done(function(response){	               
                if(response.data.cant>0){
                //no se puede eliminar noEliminarSala
                    $('#noEliminarSala').modal('show');
                }
                else{
                $('#modalEliminarSala').modal('show');
                }
            });
};


 $("#elinarSala").click(function() {       
       var eliminarSala =  $.ajax({
                url: URI.ELIMINAR,
                type: 'POST',
                async: false,
                data: {
                        idSala:$("#idSalaEliminar").val()
				  },
                dataType: 'json',
               
            })
            eliminarSala.done(function(response){	
                eliminarDetalleSala($("#idSalaEliminar").val());
                obtenerSalas();
            });  
        $("#nombreSala").val("");
        $("#fila").val("");
        $("#columna").val("");
        $('#modalEliminarSala').modal('hide');
        
    });

//diagramar sala
$contenedorSalas.on("click",".botonAzul",function(event){
        event.preventDefault();        
        $idSala =$(this).parent().parent()[0].childNodes[0].children[0].value;
        $nombreSala =$(this).parent().parent()[0].childNodes[0].children[1].outerText;
    validarDiagrama($idSala);
    
    
        
    });

function validarDiagrama($idSala){
    
      var validar =  $.ajax({
                url: URI.VALIDAR,
                type: 'POST',                
                data: {
                        idSala:$idSala
				  },
                dataType: 'json',               
            })
            validar.done(function(response){	
               
                if(response.data.cant>0){
                //no se puede diagramar noEliminarSala
                    $('#noDiagramarSala').modal('show');
                }
                else{
                    location.href='esquemaSala.php?idSala='+$idSala;
                }
            });
};

//guarda la sala en sala detalle
function diagramarSalaDetalle(cantidadFilas,cantidadColumnas,id){     
    var tope = 65+ parseInt(cantidadFilas);
    var consulta='INSERT INTO saladetalle(IdSalaDetalle,idSala,fila,columna,habilitada) VALUES';
    var condicion='';
    for(var j=65;j< tope;j++){
        for(var i=1;i<=cantidadColumnas;i++){
   
            condicion =condicion+ "(DEFAULT,"+id+",'"+String.fromCharCode(j)+"',"+i+",1),";                               
        }
    }
    condicion=condicion.substring(0,condicion.length - 1);
    
    consulta=consulta+condicion +";";    
       var addSalaDetalle =  $.ajax({
                url: URI.DIAGRAMAR,
                type: 'POST',
                data: {
                        query:consulta
                },
                dataType: 'json',

            })
            addSalaDetalle.done(function(response){	 
               
            });    
};

//elimina el detalle de la sala, tabla salaDetalle
function eliminarDetalleSala(idSala){
         var eliminarSalaDetalle =  $.ajax({
                url: URI.ELIMINARDIAGRAMA,
                type: 'POST',
                data: {
                        idSala:idSala
				  },
                dataType: 'json',
               
            })
            eliminarSalaDetalle.done(function(response){	                
            });
}


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
     if($nombreSala.val().length>0){          
      if($.inArray($nombreSala.val().toUpperCase().trim(),$nombres)!== -1){
          
          $nombreSala.closest(".form-group").addClass("has-error");          
          $nombreSala.siblings(".help-block").html("Nombre de sala ya existente");
          bRetorno = false;      
      }
     
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

     