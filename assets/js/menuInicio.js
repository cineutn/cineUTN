(function($){
 
 $('title').html("Twitter");
 
  var URI = {
        NUEVO : "actions/actionComentario.php?action=nuevo",
        ELIMINAR : "actions/actionComentario.php?action=eliminar",
        MODIFICAR : "actions/actionComentario.php?action=modificar",
        OBTENERTWEETS : "actions/actionComentario.php?action=obtener",
        OBTENERCANTIDADTWEETS : "actions/actionComentario.php?action=obtenerCantidad",
        OBTENERUSUARIO : "actions/api.php?action=obtener",
        OBTENERCANTIDADUSUARIOS : "actions/api.php?action=obtenerCantidad",
        CERRARSESION: "actions/actions.php?action=logout"
    };

    $usuarioID = $("#usuarioid").text();
    $inputTweet = $("#inputTweet");
    $formTweet = $("#form-comentario");
    $nombreUsuario = $("#nombreUsuario");
    $userName = $("#userName");
    $cantidadTweets = $("#cantidadTweets");
    $cantidadSiguiendo = $("#cantidadSiguiendo");
    $cantidadSeguidores = $("#cantidadSeguidores");
    $tweets = $("#contenedor-Tweets");
    $eliminarTweet = $("#btnEliminar");
    $btnCerrarSesion = $("#btnCerrarSesion");


    $('[data-toggle="tooltip"]').tooltip('show');

    $('#titulo').text("Twittear");   

     $( document ).ready(function(){
           var id = $usuarioID;
            obtenerUsuario(id);
            obtenerCantidadTweets();
            obtenerCantidadUsuarios();
            getTweets();
           
            $btnCerrarSesion.removeClass('hide');
      });

      $tweets.on("click",'.eliminar',function(event){
        event.preventDefault();
        var comentarioid = $(this).closest('.Tweet').children('#idTweet').val();
        var eliminar = $.ajax({
            url : URI.ELIMINAR,
            method : 'POST',
            dataType : 'json',
            data: {id:comentarioid}
        });

         eliminar.done(function(res){
            if(!res.error){           
              getTweets();
              obtenerCantidadTweets();
            }else{
                console.error("Error al obtener usuario");
            }
        }); 
    });

    function obtenerUsuario(id)
    {
         var obtener = $.ajax({
            url : URI.OBTENERUSUARIO,
            method : 'GET',
            dataType : 'json',
            data: {id:id}
        });

         obtener.done(function(res){
            if(!res.error){           
                $nombreUsuario.text(res.data.nombreCompleto);
                $userName.text('@'+res.data.userName);

                 if(res.data.imagen !== ""){

                       $("#avatar").attr("src", res.data.imagen);
                       $("#avatar").removeClass('hide');
                       $("#iconAvatar").addClass("hide");
                }

            }else{
                console.error("Error al obtener usuario");
            }
        }); 
    };

    function obtenerCantidadUsuarios()
    {
         var obtener = $.ajax({
            url : URI.OBTENERCANTIDADUSUARIOS,
            method : 'GET',
            dataType : 'json',
        });

         obtener.done(function(res){
            if(!res.error){           
                $cantidadSiguiendo.text(res.data.cantidad - 1);
                $cantidadSeguidores.text(res.data.cantidad - 1);
            }else{
                console.error("Error al obtener la cantidad de usuarios");
            }
        }); 
    };

     function obtenerCantidadTweets()
    {
         var id = $usuarioID;        
         var obtener = $.ajax({
            url : URI.OBTENERCANTIDADTWEETS,
            method : 'GET',
            dataType : 'json',
            data: {id:id}
        });

         obtener.done(function(res){
            if(!res.error){           
                $cantidadTweets.text(res.data.cantidad);
            }else{
                console.error("Error al obtener usuario");
            }
        }); 
    };

    var limpiarForm = function(){
        $("#contador").text("140");
        $formTweet.find("textarea").val("");
    };

    var getTweets = function(){
        var listado = $.ajax({
            url : URI.OBTENERTWEETS,
            method : 'GET',
            dataType : 'json'
        });
        
        listado.done(function(res){
            console.log(res);
            if(!res.error){
                //Borro el listado actual
                $tweets.html("");
                //Itero sobre la lista
                res.data.forEach(function(item){
                    var src = "assets/img/persona.png";
                    if (item.imagen !== ""){
                      src=item.imagen; 
                    }
                    var fecha = getIntervalo(item.fecha);
                    //Construyo el string HTML
                    if('@'+item.userName == $userName.text()){
                      var html = '<div class="Tweet">'+
                               '<img src="'+src+'" id="avatar-Tweet" class="avatar-Tweet">'+
                               '<span id="nombreCompleto-Tweet" class="nombreCompleto-Tweet">'+item.nombreCompleto+'</span>'+
                               '<span id="userName-Tweet" class="userName-Tweet">@'+item.userName+'</span>'+
                               '<a class="fecha-Tweet" data-toggle="tooltip" data-placement="top" title="'+item.fecha+'">'+fecha+'</a>'+
                               //'<span id="fecha-Tweet" class="fecha-Tweet">'+fecha+'</span>'+
                               '<p id="Tweet" class="comentario-Tweet">'+item.tweet+' </p>'+
                               '<input id="idTweet" class="hide" type="hidden" value="'+ item.comentarioId +'">'+
                               '<div class="btn-group">'+
                               '<button type="button" class="btn dropdown-toggle puntos" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                               '</button>'+
                               '<ul class="dropdown-menu">'+
                               '<li><a href="#" id="btnEliminar" class="eliminar">Eliminar Tweet</a></li>'+
                               '</ul>'+
                               '</div>'+
                               '</div>'
                    }else{
                      var html = '<div class="Tweet">'+
                               '<img src="'+src+'" id="avatar-Tweet" class="avatar-Tweet">'+
                               '<span id="nombreCompleto-Tweet" class="nombreCompleto-Tweet">'+item.nombreCompleto+'</span>'+
                               '<span id="userName-Tweet" class="userName-Tweet">@'+item.userName+'</span>'+
                               '<a class="fecha-Tweet" data-toggle="tooltip" data-placement="top" title="'+item.fecha+'">'+fecha+'</a>'+
                               //'<span id="fecha-Tweet" class="fecha-Tweet">'+item.fecha+'</span>'+
                               '<p id="Tweet" class="comentario-Tweet">'+item.tweet+' </p>'+
                               '<input id="idTweet" class="hide" type="hidden" value="'+ item.comentarioId +'">'+
                               '</div>'
                    }
                    
                    //lo agrego al listado
                    $tweets.append(html);
                });
            }else{
                console.error("Error al obtener listado");
            }
        });
        
        listado.fail(function(res){
           
        });
    };

    $formTweet.on("submit",function(){
      
      event.preventDefault();

      var sTweet = $inputTweet.val();
      var usuarioID =  $usuarioID;
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
      
      var nuevoTweet = $.ajax({
            url : URI.NUEVO,
            method : "POST",
            data : {
                    usuarioID:usuarioID,
                    tweet:sTweet,
                    fecha:dFechaEnvio
                   }
      });

      nuevoTweet.done(function(res){
        if(!res.error){
            getTweets();
        }else{

        }
      });

      nuevoTweet.fail(function(res){

      });

      nuevoTweet.always(function(res){
           limpiarForm();
           obtenerCantidadTweets();           
        });

    });

    $inputTweet.on("keyup",function(){
       var caracteres = parseInt($inputTweet.val().length);
       var contador = 0;

       contador = 140 - caracteres;

        $("#contador").text(contador);    
    });

    $inputTweet.on("focus",function(){
        $inputTweet.height(100);
        $("#contador").removeClass("hide");
        $("#btnTwittear").removeClass("hide");
       
    });

     $inputTweet.on("focusout",function(){
        if($inputTweet.val().length == 0){
            $inputTweet.height(40);
            $("#contador").addClass("hide");
            $("#btnTwittear").addClass("hide");
        }
       
    });

  var getIntervalo = function(fecha){
    var fechaRetorno = '';

    var date1 = new Date(fecha);
    var date2 = new Date();

    var diff = date2.getTime() - date1.getTime();

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -=  days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    var mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    var seconds = Math.floor(diff / (1000));
    diff -= seconds * (1000);


    if (days>0){
      var mes = date1.getMonth() + 1;
      var dia = date1.getDate();
     
      switch(mes) {
        case 1:
            fechaRetorno = dia + ' de Ene.';
            break;
        case 2:
            fechaRetorno = dia + ' de Feb.';
            break;
        case 3:
            fechaRetorno = dia + ' de Mar.';
            break;
        case 4:
            fechaRetorno = dia + ' de Abr.';
            break;
        case 5:
            fechaRetorno = dia + ' de May.';
            break;
        case 6:
            fechaRetorno = dia + ' de Jun.';
            break;
        case 7:
            fechaRetorno = dia + ' de Jul.';
            break;
        case 8:
            fechaRetorno = dia + ' de Ago.';
            break;
        case 9:
            fechaRetorno = dia + ' de Sep.';
            break;
        case 10:
            fechaRetorno = dia + ' de Oct.';
            break;
        case 11:
            fechaRetorno = dia + ' de Nov.';
            break;
        case 12:
            fechaRetorno = dia + ' de Dic.';
            break;    
      }

    }else if(hours>0){
      fechaRetorno = hours + ' h';
    }else{
      fechaRetorno = mins + ' min';
    }

    return fechaRetorno;
  }   

})(jQuery);