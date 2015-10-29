(function($){
      
    var URI = {
        GETVENTA : 'actions/actionVenta.php?action=obtener',
        EMAIL : 'actions/actionMail.php?action=enviar'
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
    

    $( document ).ready(function(){
        updateQrCode();
        obtenerVenta();
        $miCanvas = $divContenedor.children('canvas');        
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
                $complejo.text(res.data[0].Complejo);
                $sala.text(res.data[0].Sala);
                $pelicula.text(res.data[0].pelicula);
                $fecha.text(res.data[0].Fecha);
                $horario.text(res.data[0].horario);
                $entradas.text('');
                $precioTotal.text(res.data[0].precioTotal);
                 enviarEmail();
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });

    };          

    function enviarEmail(){

        var tipoUsuario = sessionStorage.getItem('tipoUsuario');

        if (tipoUsuario == "cliente" ){

            var email = $("#emailUser").val();
            var nombreCompleto = sessionStorage.getItem('nombre') + ', ' + sessionStorage.getItem('apellido');                       
            var codigoQR = $miCanvas[0].toDataURL("image/png");
            var codigo = $codigoVenta.text();
            var cine = $complejo.text();
            var sala= $sala.text();
            var pelicula= $pelicula.text();
            var fecha= $fecha.text();
            var horario= $horario.text();
            var entradas= $entradas.text();
            var pagoTotal= $precioTotal.text();

            codigoQR = codigoQR.substring(22, codigoQR.length - 1 );
            
            var obtener = $.ajax({
            url : URI.EMAIL,
            method : "POST",
            dataType : 'json',
            data:   {email:email,
                    nombreCompleto:nombreCompleto,
                    codigoQR:codigoQR,
                    codigo:codigo,
                    cine:cine,
                    sala:sala,
                    pelicula:pelicula,
                    fecha:fecha,
                    horario:horario,
                    entradas:entradas,
                    pagoTotal:pagoTotal}
            });

            obtener.done(function(res){
                if(!res.error){
                    
                }else{
                    event.preventDefault();
                    alert(res.mensaje);
                }
            });
        }

        

    };

})(jQuery)