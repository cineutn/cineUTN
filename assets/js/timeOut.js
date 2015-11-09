(function($){
      
    var URI = {
       UPDATEBUTACA : 'actions/actionVentaButacas.php?action=reservar'
    };

    $btnVolver = $("#btnVolver");

    $( document ).ready(function(){
        actualizarButacas();
    });

    function actualizarButacas(){
        var butacas = sessionStorage.getItem('butacas');

        if (butacas != null){

            var arrayButacas = butacas.split(",");
        
            if (arrayButacas.length > 0 ){

                for (var i = 0; i < arrayButacas.length ; i++) {
                    var idButaca;
                    
                    idButaca = parseInt(arrayButacas[i]);

                    var updateButaca = $.ajax({
                        url : URI.UPDATEBUTACA,
                        async: false,
                        method : "POST",
                        data: {idSalaFuncion:idButaca,
                               hanilitada:1},
                        dataType : 'json'
                    });

                    updateButaca.done(function(res){
                        if(!res.error){   
                            sessionStorage.removeItem("butacas");
                            sessionStorage.removeItem("cantidadEntradas");       
                        }else{                
                            alert(res.mensaje);
                        }
                    });

                };
            }
        }    
    };

    $btnVolver.on("click", function(){
        window.location.href = "index.php";       
    });

})(jQuery)