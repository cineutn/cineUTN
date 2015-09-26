(function($){
 
  
     var iniciarSession = function(id){
            $.ajax({
              url: 'session.php',
              type: 'POST',
              data: {
                      'usuarioid' :  id,
                      'funcion' : 'Add'
                    }
            });
      };
        
      var borrarSession = function(id){        
          $.ajax({
            url: 'session.php',
            type: 'POST',
            data: {
                    'usuarioid' :  id,
                    'funcion' : 'Delete'
                  }
          });
      };


})(jQuery);