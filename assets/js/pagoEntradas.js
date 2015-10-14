(function($){
  
  var URI = {
        TARJETAS : 'actions/actionTarjetas.php?action=obtener',
        DATOSTARJETA :  'actions/actionTarjetas.php?action=obtenerDatos',
        FUNCION : 'actions/actionPeliculaCompra.php?action=obtener',
        VENDER : 'actions/actionVenta.php?action=vender'
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

  $divMedioPago = $("#divMedioPago");
  $divNumeroTarjeta = $("#divNumeroTarjeta");
  $divCodigoSeguridad = $("#divCodigoSeguridad");
  $divFechaVencimiento = $("#divFechaVencimiento");


  $( document ).ready(function(){
        obtenerDetalleFuncion();
        cargarComboAño();
        obtenerTarjetas();
        $rbCompra.prop("checked", true);

        $nombreCompleto = sessionStorage.getItem('nombre') + ' ' + sessionStorage.getItem('apellido');
        $email = sessionStorage.getItem('email');

        if ($nombreCompleto == 'null null'){
          $nombreCompleto ='';
        }

        $inputNombre.val($nombreCompleto);
        $inputEmail.val($email);
  });

   function obtenerDetalleFuncion()
    {   
        //$id = $idFuncion.val();
        $funcionID=1;//cambiarrrrr hay que pasarle el id de la funcion elegida en la pantalla anterior
        var obtener = $.ajax({
            url : URI.FUNCION,
            method : "GET",
             data: {idFuncion:$funcionID},
            dataType : 'json',
        });        

        obtener.done(function(res){
            if(!res.error){   
                $("#tituloPelicula").text(res.data[0].titulo+'('+res.data[0].clasificacion+')');
                $("#complejo").text(res.data[0].nombre);
                $("#diaFuncion").text(res.data[0].dia);
                $("#horarioFuncion").text(res.data[0].horario);
                $("#sala").text(res.data[0].sala);               
                $("#detalleCompra").text(res.data[0].titulo+' '+res.data[0].idioma+' ('+res.data[0].clasificacion+')');                
                $("#idTipoFuncion").val(res.data[0].idTipoFuncion);                
                $imagenPelicula.attr("src" , res.data[0].imagen);                
                               
            }else{
                
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });

    };


  function obtenerTarjetas()
  {
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
                alert(res.mensaje);
            }
        });

        obtener.fail(function(res){
            alert(res.responseText)
        });
               
    };
  
  function cargarComboAño()
  {
    var dfecha = new Date();
    var año = dfecha.getFullYear();

    $cmbAño.html("");

    $años = '';

    for (var iAño = año ; iAño <= año + 10 ; iAño++) {
      $años = $años + '<option value="'+iAño+'">'+iAño+'</option>';
    }; 
    
    $cmbAño.append($años);   
  };

  function setMaxLength()
  {
    id = $cmbTarjetas.val();

    if (id > 0)
    {
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
                alert(res.mensaje);
            }
        });
    }
     
  };

  function validarDatos()
  {
    bRetorno = true;
    $bCompra = $rbCompra.prop("checked");
    $tipoCompra = "";

    if ($bCompra){
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
      }else{
        $cmbAño.closest(".form-group").removeClass("has-error");
        $cmbAño.siblings(".glyphicon-remove").addClass("hide");
        $cmbAño.siblings(".help-block").html("");
      }

    }else{
      $tipoCompra = "Reserva";

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

  $rbCompra.on("change", function(){
    $bCompra = $rbCompra.prop("checked");
    if ($bCompra){
      $rbReserva.prop("checked", false);

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

        if ($bCompra){
          tipoCompra = "Compra";
        }else{
          tipoCompra = "Reserva";
        }

        perfil = sessionStorage.getItem('tipoUsuario');

        if (perfil == "cliente"){
          idCliente = sessionStorage.getItem('idUser');
          idVendedor = 0;
        }else{
          idCliente = 0;
          idVendedor = sessionStorage.getItem('idUser');
        }

        monto = parseFloat($("#precioTotal").text());
        
        var comprar = $.ajax({
            url : URI.VENDER,
            method : "POST",
            dataType : 'json',
            data: {
                    idVenta:0,
                    monto:monto,
                    tipoVenta:tipoCompra,
                    idVendedor:idVendedor,
                    idCliente:idCliente
                  } 
        });
       
        comprar.done(function(res){
            if(!res.error){
                alert(res.mensaje);
            }else{
                event.preventDefault();
                alert(res.mensaje);
            }
        });  

      } 
        
  });
})(jQuery);