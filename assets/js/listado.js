(function($){
  
  var URI = {};
  URI.GET_CATAGORIAS = "categorias.php";
  
  var getCategorias= function(){
    
    $.ajax({
      url: URI.GET_CATAGORIAS,
      metod : 'GET',
      dataType: 'html'
    }).done(function(res){
      
      $("#listadocategoria tbody").html(res);
    });
    
  }
  
  getCategorias();
  
})(jQuery);