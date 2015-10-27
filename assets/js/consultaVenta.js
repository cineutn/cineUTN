(function($){
      
    var URI = {
        GETVENTA : 'actions/actionVenta.php?action=obtener'
    };
   
    $divContenedorVenta = $('#contenedorVenta');
    $divContenedor = $('#contenedorQR');
    $codigoVenta = $('#codigo');
    $complejo = $('#complejo');
    $sala = $('#sala');
    $pelicula = $('#pelicula');
    $fecha = $('#fecha');
    $horario = $('#horario');
    $entradas = $('#entradas');
    $precioTotal = $('#precioTotal');
    $inputCodigo = $("#ventaCodigo");
    $inputIdVenta = $("#idVenta");

    $btnBuscar = $("#btnBuscarVenta");


    $btnBuscar.on("click", function(){
        var codigo;

        codigo = $inputCodigo.val();

        if ($.trim((codigo)) == ""){
            alert("Debe ingresar un codigo.");
        }else{

            $codigoVenta.text(codigo);

            updateQrCode();
            obtenerVenta();
            $miCanvas = $divContenedor.children('canvas');
        }
       
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

        $divContenedor.html("");
        $divContenedor.qrcode(options);
    };

    function obtenerVenta(){

        var codigo;

        codigo =  $codigoVenta.text();

        var obtener = $.ajax({
            url : URI.GETVENTA,
            method : "GET",
            dataType : 'json',
            data: {codigo:codigo}
        });

         obtener.done(function(res){
            if(!res.error){
                $inputIdVenta.val(res.data[0].idVenta);
                $complejo.text(res.data[0].Complejo);
                $sala.text(res.data[0].Sala);
                $pelicula.text(res.data[0].pelicula);
                $fecha.text(res.data[0].Fecha);
                $horario.text(res.data[0].horario);
                $entradas.text('');
                $precioTotal.text(res.data[0].precioTotal);
            }else{
                event.preventDefault();
                alert("El Codigo ingresado es incorrecto. ");
            }
        });

    };

})(jQuery)