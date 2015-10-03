(function($){
      
    var URI = {
        COMPLEJOS : 'actions/actionComplejos.php?action=obtener'
    };

    $cmbComplejos = $("#cmbComplejos");

    $( document ).ready(function(){
          obtenerComplejos();
    });

    function obtenerComplejos()
    {   
        var obtener = $.ajax({
            url : URI.COMPLEJOS,
            method : "GET",
            dataType : 'json',
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
    
    
    
})(jQuery)