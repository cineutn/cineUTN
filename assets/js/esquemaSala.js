 var URI = {        
        SALA: 'actions/actionAltaSala.php?action=obtenerUna',	        
    };
    
    $idSala = $("#idSala").val();
    $cantidadFilas =0;
    $cantidadColumnas =0;
    $esquemaSala =$("#esquemaSala");
    $pathSeleccionada="assets/img/butacaOcupada.png";
    $pathLibre="assets/img/butacaLibre.png";


$(document ).ready(function(){	      
        
    //caso de no se haya guardado la sala aun
    obtenerSala();
    
    });

function obtenerSala(){    
  var obtener = $.ajax({
            url : URI.SALA,
            method : "GET",
             data: {idSala:$idSala},
            dataType : 'json',
        });   
     obtener.done(function(res){
         if(!res.error){  
            $cantidadFilas=res.data.filas;
            $cantidadColumnas=res.data.columnas;           
            graficarSalaVacia($cantidadFilas,$cantidadColumnas);
         }else{
             alert(res.mensaje);
         }

         });
    obtener.fail(function(res){
        alert(res.responseText)
        });

}

function graficarSalaVacia(fil,col){
    $esquemaSala.html("");
    $fila='';
   
    var tope = 65+ parseInt(fil); 
    for(var j=65;j<= tope;j++){                 
        $fila =$fila+'<tr><td>'+  String.fromCharCode(j)+'</td>';
        for(var i=0;i<col;i++){
            $fila = $fila +'<td class="esbirro centrar"><input type="hidden" value="libre"><img src="assets/img/butacaLibre.png" /></td>';    
        }
        $fila =$fila +'<td class="centrar">'+ String.fromCharCode(j)+'</td></tr>';
    }
     $fila =$fila +'<tr><td></td>';
    for(var i=1;i<=col;i++){
     $fila =$fila +'<td class="centrar">'+i+'</td>';
    
    }
    $fila =$fila +'<td></td></tr>';
    $esquemaSala.append($fila);
    
}

$esquemaSala.on("click",".esbirro",function(){      
    event.stopPropagation();
//    $idButaca = $(this)[0].id;         
    $estadoButaca = $(this).children('input').val(); 
    console.log($estadoButaca);
        if($estadoButaca==='libre'){
            $(this).children('img').attr('src',$pathSeleccionada);
            $(this).children('input').attr('value','seleccionada');
        }
        if($estadoButaca==='seleccionada'){
            $(this).children('img').attr('src',$pathLibre);
            $(this).children('input').attr('value','libre');           

        }
});

$("#btnGuardarSala").click(function(){

     $("td").each(function() {
        console.log($(this).children('input').val());
     });
});