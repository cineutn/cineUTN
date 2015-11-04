(function($){
      
    var URI = {
        GETVENTA : 'actions/actionVenta.php?action=obtener',
        GETBUTACAS : 'actions/actionVenta.php?action=obtenerButacas'
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
    $btnImprimir = $("#btnImprimir");
    $inputVentaID = $("#ventaID");

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

    $btnImprimir.on("click", function(){
        $("#ticket").removeClass("hide");
        $("#ticket").printArea();
        $("#ticket").addClass("hide"); 
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

        limpiarDatos();
                
        var obtener = $.ajax({
            url : URI.GETVENTA,
            method : "GET",
            dataType : 'json',
            data: {codigo:codigo}
        });

         obtener.done(function(res){
            if(!res.error){
                $inputVentaID.val(res.data[0].idVenta);
                $complejo.text(res.data[0].Complejo);
                $sala.text(res.data[0].Sala);
                $pelicula.text(res.data[0].pelicula);
                $fecha.text(res.data[0].Fecha);
                $horario.text(res.data[0].horario);
                $entradas.text('');
                $precioTotal.text('$' + res.data[0].precioTotal);

                var numeroSala = res.data[0].Sala;
                numeroSala = numeroSala.replace("Sala ", " ");
                numeroSala = parseInt(numeroSala);

                $("#salaTicket").text(numeroSala);
                $("#salaTicket2").text(res.data[0].Sala);
                $("#diaTicket").text(res.data[0].Fecha);
                $("#horaTicket").text(res.data[0].horario);
                $("#peliculaTicket").text(res.data[0].pelicula);
                obtenerButacas();
            }else{
                event.preventDefault();
                alert("El Codigo ingresado es incorrecto. ");
            }
        });
    };

    function obtenerButacas(){

        var idVenta;

        idVenta =  $inputVentaID.val();

        var obtenerButacas = $.ajax({
            url : URI.GETBUTACAS,
            method : "GET",
            dataType : 'json',
            async:false,
            data: {idVenta:idVenta}
        });

        obtenerButacas.done(function(res){
            if(!res.error){
                var butacas = "(";

                res.data.forEach(function(item){
                    butacas = butacas + " " + item.butaca + " ";                    
                });

                butacas = butacas + " )";
                $entradas.text(butacas);
                $("#butacasTicket").text(butacas);
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });
    };

    function limpiarDatos(){
        $inputVentaID.val("");
        $complejo.text("");
        $sala.text("");
        $pelicula.text("");
        $fecha.text("");
        $horario.text("");
        $entradas.text("");
        $precioTotal.text("");
        $entradas.text("");

        $("#salaTicket").text("");
        $("#salaTicket2").text("");
        $("#diaTicket").text("");
        $("#horaTicket").text("");
        $("#peliculaTicket").text("");
        $("#butacasTicket").text("");
    };

})(jQuery)