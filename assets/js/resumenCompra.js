(function($){
      
   
    $divContenedor = $('#contenedorQR');
    $codigoVenta = $('#codigo');

    $( document ).ready(function(){
         updateQrCode();
    });

    function updateQrCode() {

        var codigo;

        codigo =  $codigoVenta.text();

        var options = {
            render: "canvas",
            ecLevel: "H",
            minVersion:parseInt(6,10), 
            fill: "#333333",
            background: "#ffffff",
            text: codigo,
            size: parseInt(200,10),
            radius: parseInt(50, 10) * 0.01,
            quiet: parseInt(1, 10),

        };     

        $divContenedor.qrcode(options);
    };

})(jQuery)