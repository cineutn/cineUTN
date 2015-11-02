(function($){
  
  var URI = {
        SEND : 'actions/actionMail.php?action=recover',
        GET : 'actions/actionMail.php?action=obtener',
    };

  function sendPassword(){
    
    var obtener = $.ajax({
        url : URI.FUNCION,
        method : "GET",
        data: {idFuncion:$funcionDetalleID},
        dataType : 'json',
    });        
    
  }
  
  getCategorias();
  
})(jQuery);