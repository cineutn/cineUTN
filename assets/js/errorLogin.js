(function($){
 
 	$('title').html("Iniciar sesión en Twitter");

    $cerrarMensaje = $("#mensajeClose");
  
    $cerrarMensaje.on("click",function(event){
    	event.preventDefault();
    	$mensaje =  $(".message");
    	$mensaje.hide();
    });
  

})(jQuery);