(function($){
  
  var URI = {
        TARJETAS : 'actions/actionTarjetas.php?action=obtener',
        DATOSTARJETA :  'actions/actionTarjetas.php?action=obtenerDatos',
        FUNCION : 'actions/actionPeliculaCompra.php?action=obtener',
        VENDER : 'actions/actionVenta.php?action=vender',
        DETALLEVENTA : 'actions/actionVenta.php?action=venderDetalle',
        BUTACA : 'actions/actionVentaButacas.php?action=butaca',
        UPDATEBUTACA : 'actions/actionVentaButacas.php?action=reservar',
        DETALLEPRECIO: 'actions/actionPrecios.php?action=detalle',
        BLOQUEO: 'actions/actions.php?action=obtenerBloqueo'
    };

  $imagenPelicula  = $("#imagenPelicula");
  $cmbTarjetas = $("#comboTarjetas");
  $rbCompra = $("#rbCompra");
  $rbReserva = $("#rbReserva");
  $inputNombre = $("#nombreTitular");
  $inputEmail = $("#emailCliente");
  $cmbMes = $("#cmbMes");
  $cmbAño = $("#cmbAño");
  $numeroTarjeta = $("#numeroTarjeta");
  $codigoSeguridad =  $("#codigoSeguridad");
  $btnComprar = $("#btnComprar");
  $cantidadEntradas = $("#cantidadEntradas");
  $butacas = $("#butacas");
  $precioTotal = $("#precioTotal");

  $divMedioPago = $("#divMedioPago");
  $divNumeroTarjeta = $("#divNumeroTarjeta");
  $divCodigoSeguridad = $("#divCodigoSeguridad");
  $divFechaVencimiento = $("#divFechaVencimiento");
  $divTipoPago = $("#divTipoPago");

  $frmResumenCompra = $("#formCodigo");

  $( document ).ready(function(){
        obtenerDetalleFuncion();
        obtenerEntradas();
        obtenerButacas();
        cargarComboAño();
        obtenerTarjetas();
        $rbCompra.prop("checked", true);

        $nombreCompleto = sessionStorage.getItem('nombre') + ' ' + sessionStorage.getItem('apellido');
        $email = sessionStorage.getItem('email');
        var tipoUsuario =  sessionStorage.getItem('tipoUsuario');

        if (tipoUsuario == "cliente"){
          $divTipoPago.addClass("hide");
        }

        if ($nombreCompleto == 'null null'){
          $nombreCompleto ='';
        }

        $inputNombre.val($nombreCompleto);
        $inputEmail.val($email);
  });

  function obtenerButacas(){

    var idButacas = sessionStorage.getItem('butacas');
    var arrayButacas = idButacas.split(",");
    var butacas = '';

    for (var i = 0; i < arrayButacas.length ; i++) {
        var idButaca = parseInt(arrayButacas[i]);

          var obtenerButaca = $.ajax({
              url : URI.BUTACA,
              async: false,
              method : "GET",
              data: {idSalaFuncion:idButaca},
              dataType : 'json',
          });

          obtenerButaca.done(function(res){
            if(!res.error){   
              butacas = butacas + ' ' + res.data[0].butaca;
                
            }else{                
              //alert(res.mensaje);
              $('#msgBoxTitulo').text('UTN Cine');
              $('#msgBoxMensaje').text(res.mensaje);
              $('#modalMsgBox').modal('show');
            }
          });

    };

    $butacas.text(butacas);  
  };

  function obtenerEntradas(){

    var cantidadEntradas = sessionStorage.getItem('cantidadEntradas');
    var arrayEntradas = cantidadEntradas.split(",");
    var entradas = '';

    var idPrecios = sessionStorage.getItem('idPreciosGrilla');
    var arrayPrecios = idPrecios.split(",");

    var preciosEntradas = sessionStorage.getItem('preciosEntradas');
    preciosEntradas = preciosEntradas.replace("$","");
    var arrayPreciosEntradas = preciosEntradas.split(",");
    var precioTotal = '0';

    for (var i = 0; i < arrayEntradas.length ; i++) {
        var idPrecio = parseInt(arrayPrecios[i]);
        var cantidad = parseInt(arrayEntradas[i]);
        var monto =  parseInt(arrayPreciosEntradas[i]);

        precioTotal = parseInt(precioTotal) + (parseInt(monto) * parseInt(cantidad));

        if (cantidad > 0) {

            var obtenerDetalle = $.ajax({
              url : URI.DETALLEPRECIO,
              async: false,
              method : "GET",
              data: {idPrecio:idPrecio},
              dataType : 'json',
          });

          obtenerDetalle.done(function(res){
            if(!res.error){   
              entradas = entradas + ' ' + cantidad + ' X ' + res.data[0].detalle + '<br>';
                
            }else{                
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }

          });

        }
          
    };

    $("#montoTotal").text('$' + precioTotal);
    $precioTotal.text(precioTotal);
    $cantidadEntradas.html(entradas);  
  };

  function obtenerDetalleFuncion(){   

        $funcionID = $("#idFuncionDetalle").val();
        var obtener = $.ajax({
            url : URI.FUNCION,
            method : "GET",
             data: {idFuncion:$funcionID},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){   
                $("#tituloPelicula").text(res.data[0].titulo+'('+res.data[0].clasificacion+')');
                $("#nombreCine").text(res.data[0].nombre);
                $("#diaFuncion").text(res.data[0].dia);
                $("#horarioFuncion").text(res.data[0].horario);
                $("#sala").text(res.data[0].sala);               
                $("#detalleCompra").text(res.data[0].titulo +' ('+res.data[0].clasificacion+')');
                $("#idTipoFuncion").val(res.data[0].idTipoFuncion);                
                $imagenPelicula.attr("src" , res.data[0].imagen);                
                               
            }else{                
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('UTN Cine');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });
  };

  function obtenerTarjetas(){
     var obtener = $.ajax({
            url : URI.TARJETAS,
            method : "GET",
            dataType : 'json' 
        });
       
        obtener.done(function(res){
            if(!res.error){
                $tarjetas = '<option value="0">Seleccioná una tarjeta</option>';
                //Borro el listado actual
                $cmbTarjetas.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){
                    $tarjetas = $tarjetas + '<option value="'+item.idTarjeta+'">'+item.empresa+'</option>';
                });
                //lo agrego al listado
                $cmbTarjetas.append($tarjetas);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });

        obtener.fail(function(res){
            //alert(res.responseText);
            $('#msgBoxTitulo').text('UTN Cine');
            $('#msgBoxMensaje').text(res.responseText);
            $('#modalMsgBox').modal('show');
        });              
  };
  
  function cargarComboAño(){
    var dfecha = new Date();
    var año = dfecha.getFullYear();

    $cmbAño.html("");

    $años = '';

    for (var iAño = año ; iAño <= año + 10 ; iAño++) {
      $años = $años + '<option value="'+iAño+'">'+iAño+'</option>';
    }; 
    
    $cmbAño.append($años);   
  };

  function setMaxLength(){
    id = $cmbTarjetas.val();

    if (id > 0){

        var obtenerDatos = $.ajax({
            url : URI.DATOSTARJETA,
            method : "GET",
            dataType : 'json',
            data : {idTarjeta:id} 
        });

        obtenerDatos.done(function(res){
            if(!res.error){              
              cantidad = parseInt(res.data[0].cantNumeros);
              codigo = parseInt(res.data[0].codigoSeguridad);
              $numeroTarjeta.attr('maxlength',cantidad);
              $codigoSeguridad.attr('maxlength',codigo);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });
    }     
  };

  function validarDatos(){
    var bRetorno = true;
    $bCompra = $rbCompra.prop("checked");
    $tipoCompra = "";
    var tipoPago = $("#comboTipo").val();

    if ($bCompra == true && tipoPago == "Tarjeta"){
      $tipoCompra = "Compra";

      var idTarjeta = $cmbTarjetas.val();
      if(idTarjeta == 0){
          $cmbTarjetas.closest(".form-group").addClass("has-error");
          $cmbTarjetas.siblings(".glyphicon-remove").removeClass("hide");
          $cmbTarjetas.siblings(".help-block").html("Debe seleccionar una tarjeta");
          bRetorno = false;
        }else{
          $cmbTarjetas.closest(".form-group").removeClass("has-error");
          $cmbTarjetas.siblings(".glyphicon-remove").addClass("hide");
          $cmbTarjetas.siblings(".help-block").html("");
          
        }

      var cantidad = $numeroTarjeta.val();
      var cantidadMax = $numeroTarjeta.attr('maxlength');
      if(cantidad.length == 0){
          $numeroTarjeta.closest(".form-group").addClass("has-error");
          $numeroTarjeta.siblings(".glyphicon-remove").removeClass("hide");
          $numeroTarjeta.siblings(".help-block").html("Debe ingresar el numero de tarjeta");
          bRetorno = false;
        }else if(cantidad.length > cantidadMax || cantidad.length < cantidadMax ){
          $numeroTarjeta.closest(".form-group").addClass("has-error");
          $numeroTarjeta.siblings(".glyphicon-remove").removeClass("hide");
          $numeroTarjeta.siblings(".help-block").html("Cantidad de digitos ingresados erroneos");
          bRetorno = false;
        }else{
          $numeroTarjeta.closest(".form-group").removeClass("has-error");
          $numeroTarjeta.siblings(".glyphicon-remove").addClass("hide");
          $numeroTarjeta.siblings(".help-block").html("");
        }

      var codigo = $codigoSeguridad.val();
      var codigoMax = $codigoSeguridad.attr('maxlength');
      if(codigo.length == 0){
          $codigoSeguridad.closest(".form-group").addClass("has-error");
          $codigoSeguridad.siblings(".glyphicon-remove").removeClass("hide");
          $codigoSeguridad.siblings(".help-block").html("Debe ingresar el codigo de seguridad");
          bRetorno = false;
        }else if(codigo.length > codigoMax || codigo.length < codigoMax){
          $codigoSeguridad.closest(".form-group").addClass("has-error");
          $codigoSeguridad.siblings(".glyphicon-remove").removeClass("hide");
          $codigoSeguridad.siblings(".help-block").html("Cantidad de digitos ingresados erroneos");
           bRetorno = false;
        }else{
          $codigoSeguridad.closest(".form-group").removeClass("has-error");
          $codigoSeguridad.siblings(".glyphicon-remove").addClass("hide");
          $codigoSeguridad.siblings(".help-block").html("");
        }

      var dfecha = new Date();
      var date = new Date(), y = parseInt($cmbAño.val()), m = parseInt($cmbMes.val());
      var lastDay = new Date(y, m , 0);

      if (dfecha > lastDay){
        $cmbAño.closest(".form-group").addClass("has-error");
        $cmbAño.siblings(".glyphicon-remove").removeClass("hide");
        $cmbAño.siblings(".help-block").html("La fecha ingresada ha caducado");
        bRetorno = false;
      }else{
        $cmbAño.closest(".form-group").removeClass("has-error");
        $cmbAño.siblings(".glyphicon-remove").addClass("hide");
        $cmbAño.siblings(".help-block").html("");
      }

    }else{
      $tipoCompra = "Reserva";

      $id = sessionStorage.getItem('idUser');

      var obtenerBloqueo = $.ajax({
            url : URI.BLOQUEO,
            method : "GET",
            dataType : 'json',
            data : {idUsuario:$id},
            async:false
        });

        obtenerBloqueo.done(function(res){
            if(!res.error){ 

              if (res.data.bloqueado == "1"){
                bRetorno = false;
                //alert("Su usuario ha sido bloqueado para la reserva de entradas");
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text('Su usuario ha sido bloqueado para la reserva de entradas');
                $('#modalMsgBox').modal('show');
              }

            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });
    }

     var mail = $inputEmail.val();
     if(mail.length == 0){
          $inputEmail.closest(".form-group").addClass("has-error");
          $inputEmail.siblings(".glyphicon-remove").removeClass("hide");
          $inputEmail.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $inputEmail.closest(".form-group").removeClass("has-error");
          $inputEmail.siblings(".glyphicon-remove").addClass("hide");
          $inputEmail.siblings(".help-block").html("");
          
        }

      var nombre = $inputNombre.val();
      if(nombre.length == 0){
          $inputNombre.closest(".form-group").addClass("has-error");
          $inputNombre.siblings(".glyphicon-remove").removeClass("hide");
          $inputNombre.siblings(".help-block").html("Debe completar este campo");
          bRetorno = false;
        }else{
          $inputNombre.closest(".form-group").removeClass("has-error");
          $inputNombre.siblings(".glyphicon-remove").addClass("hide");
          $inputNombre.siblings(".help-block").html("");
        }

    return bRetorno;
  };

  $("#comboTipo").on("change", function(){
    $bCompra = $rbCompra.prop("checked");
    var tipo = $("#comboTipo").val();

    if (tipo == "Efectivo" && $bCompra == true ){

      $divMedioPago.addClass("hide");
      $divNumeroTarjeta.addClass("hide");
      $divCodigoSeguridad.addClass("hide");
      $divFechaVencimiento.addClass("hide");

    }else if(tipo == "Tarjeta" && $bCompra == true){

      $divMedioPago.removeClass("hide");
      $divNumeroTarjeta.removeClass("hide");
      $divCodigoSeguridad.removeClass("hide");
      $divFechaVencimiento.removeClass("hide");
    }
  });

  $rbCompra.on("change", function(){
    $bCompra = $rbCompra.prop("checked");
    if ($bCompra){
      $rbReserva.prop("checked", false);

      var tipoUsuario = sessionStorage.getItem('tipoUsuario');

      if (tipoUsuario != "cliente"){
          $divTipoPago.removeClass("hide");
      }
      
      $divMedioPago.removeClass("hide");
      $divNumeroTarjeta.removeClass("hide");
      $divCodigoSeguridad.removeClass("hide");
      $divFechaVencimiento.removeClass("hide");
    }
  });

  $rbReserva.on("change", function(){
    $bReserva = $rbReserva.prop("checked");
    if ($bReserva){
      $rbCompra.prop("checked", false);
      
      $divTipoPago.addClass("hide");
      $divMedioPago.addClass("hide");
      $divNumeroTarjeta.addClass("hide");
      $divCodigoSeguridad.addClass("hide");
      $divFechaVencimiento.addClass("hide");
    }
  });
  
  $cmbTarjetas.on("change", function(){
    setMaxLength();
  });

  $numeroTarjeta.on("keypress", function(event){
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
    return true;               
    return /\d/.test(String.fromCharCode(keynum));
  });

  $codigoSeguridad.on("keypress", function(event){
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
    return true;               
    return /\d/.test(String.fromCharCode(keynum));
  });

  $btnComprar.on("click", function(){
     
       
      bValidar = false;

      bValidar = validarDatos(); 
      if (bValidar){

        $bCompra = $rbCompra.prop("checked");
        
        perfil = sessionStorage.getItem('tipoUsuario');

        if (perfil == "cliente"){
          idCliente = sessionStorage.getItem('idUser');
          idVendedor = 0;

          if ($bCompra){
            tipoCompra = "CompraWeb";
          }else{
            tipoCompra = "Reserva";
          }

        }else{
          idCliente = 0;
          idVendedor = sessionStorage.getItem('idUser');

          if ($bCompra){
            tipoCompra = "Compra";
          }else{
            tipoCompra = "Reserva";
          }
        }

        var fecha = returnFormatfecha();

        monto = parseFloat($("#precioTotal").text());
        codigo = rand_code();

        var email;

        email = $inputEmail.val();
        
        $("#codigoVenta").val(codigo);
        $("#mailVenta").val(email);

        var comprar = $.ajax({
            url : URI.VENDER,
            method : "POST",
            dataType : 'json',
            
            data: {
                    idVenta:0,
                    monto:monto,
                    tipoVenta:tipoCompra,
                    idVendedor:idVendedor,
                    idCliente:idCliente,
                    fecha:fecha,
                    codigo:codigo
                  },
            beforeSend : function(){
              $('#tituloLoading').text('Realizando Operación, por favor espere un momento...');
              $('#modalLoading').modal('show');                
            }
           
        });
       
        comprar.done(function(res){
            
            if(!res.error){
              var idVenta;
              idVenta = res.data.idVenta;
              crearDetalleVenta(idVenta);
            }else{
                event.preventDefault();
                //alert(res.mensaje);
                $('#modalLoading').modal('hide');
                $('#msgBoxTitulo').text('UTN Cine');
                $('#msgBoxMensaje').text(res.mensaje);
                $('#modalMsgBox').modal('show');
            }
        });  

      }  
  });
  
  function obtenerArrayPrecios(){
    var sRetorno = "";
    var preciosEntradas = sessionStorage.getItem('preciosEntradas');
    var arrayPrecios = preciosEntradas.split(",");

    var cantidadEntadas = sessionStorage.getItem('cantidadEntradas');
    var arrayCantidad = cantidadEntadas.split(",");

    for (var i = 0; i < arrayCantidad.length ; i++) {
        var cantidad = parseInt(arrayCantidad[i]);

        if (cantidad > 0){
            for (var j = 0; j < cantidad ; j++) {
                  var precio;

                  precio = parseInt(arrayPrecios[i].replace("$",""));

                  sRetorno = sRetorno + ";" + precio;
            };
        }

    };

    if(sRetorno.startsWith(";")){
      sRetorno = sRetorno.substring(1,sRetorno.length);
    }

    return sRetorno;
  };

  function crearDetalleVenta(idVenta){
    var sMensaje = " ";
    var ventaId = idVenta;
    
    var butacas = sessionStorage.getItem('butacas');
    var arrayButacas = butacas.split(",");
    
    var precios = obtenerArrayPrecios();
    var arrayPrecios = precios.split(";");
    
    for (var i = 0; i < arrayButacas.length ; i++) {
        var idButaca;
        var precio;

        idButaca = parseInt(arrayButacas[i]);
        precio = parseInt(arrayPrecios[i]);

        var crearDetalle = $.ajax({
            url : URI.DETALLEVENTA,
            method : "POST",
            dataType : 'json',
            
            data: {
                    idVenta:ventaId,
                    idButaca:idButaca,
                    precio:precio
                  } 
        });
       
        crearDetalle.done(function(res){
            if(!res.error){
                actualizarButaca(idButaca);
            }else{
                $('#modalLoading').modal('hide');
                sMensaje = res.mensaje;
            }
        });

    };

    if (sMensaje == " " ){
      $frmResumenCompra.submit();
    }else{
      //alert(sMensaje);
      $('#msgBoxTitulo').text('UTN Cine');
      $('#msgBoxMensaje').text(sMensaje);
      $('#modalMsgBox').modal('show');
    }

  };

  function actualizarButaca(idButaca){

    var updateButaca = $.ajax({
        url : URI.UPDATEBUTACA,
       
        method : "POST",
        data: {idSalaFuncion:idButaca,
               hanilitada:2},
        dataType : 'json'
    });

    updateButaca.done(function(res){
        $('#modalLoading').modal('hide');
        if(!res.error){   
                          
        }else{                
            //alert(res.mensaje);
            $('#msgBoxTitulo').text('UTN Cine');
            $('#msgBoxMensaje').text(res.mensaje);
            $('#modalMsgBox').modal('show');
        }
    });
  };

  function returnFormatfecha(){
    var dfecha = new Date();

    var dMes = dfecha.getMonth() + 1;
    dMes = ("0" + dMes).slice(-2);
    var dDia = dfecha.getDate();
    dDia = ("0" + dDia).slice(-2);
    var dHora = dfecha.getHours();
    dHora = ("0" + dHora).slice(-2);
    var dMinutos = dfecha.getMinutes();
    dMinutos = ("0" + dMinutos).slice(-2);
    var dSegundos = dfecha.getSeconds();
    dSegundos = ("0" + dSegundos).slice(-2);
    var dFechaEnvio = dfecha.getFullYear() +'-'+  dMes +'-'+ dDia + ' ' + dHora + ':' + dMinutos + ':' + dSegundos;
      
    return dFechaEnvio;
  };

  function rand_code(){
    caracteres = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    longitud = 10;
    code = "";

    for (x=0; x < longitud; x++){
      rand = Math.floor(Math.random()*caracteres.length);      
      code += caracteres.substr(rand, 1);
    }
    return code;
  }

})(jQuery);