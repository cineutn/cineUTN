(function(){
 
    $('title').html("Bienvenido a Twitter - Inicia sesión o regístrate");

    var validarFormData = function(){
        var valid = true;
        var nombre = $("#nombre").val();
        var descripcion = $("#descripcion").val();

        if(nombre.length == 0){
            $("#nombre").closest(".form-group").addClass("has-error");
            $("#nombre").siblings(".glyphicon-remove").removeClass("hide");
            $("#nombre").siblings(".help-block").html("Completar este campo");
            valid = false;
        }

        if(descripcion.length == 0){
            $("#descripcion").closest(".form-group").addClass("has-error");
            $("#descripcion").siblings(".glyphicon-remove").removeClass("hide");
            $("#descripcion").siblings(".help-block").html("Completar este campo");
            valid = false;
        }

        return valid;
    };

    var cleanFormError = function(){
        //Quitar errores en campo nombre
        $("#nombre").closest(".form-group").removeClass("has-error");
        $("#nombre").siblings(".glyphicon-remove").addClass("hide");
        $("#nombre").siblings(".help-block").html(""); 
        //Quitar errores en campo descripcion
        $("#descripcion").closest(".form-group").removeClass("has-error");
        $("#descripcion").siblings(".glyphicon-remove").addClass("hide");
        $("#descripcion").siblings(".help-block").html("");        
    };
    
    var modalConfirm = function(callback){
        
      $("#confirm-modal").modal('show');

      $("#modal-btn-si").on("click", function(){
        callback(true);
        $("#confirm-modal").modal('hide');
      });

      $("#modal-btn-no").on("click", function(){
        callback(false);
        $("#confirm-modal").modal('hide');
      });
    };

    $("#form-categoria").on("submit", function(){
        cleanFormError();
        return validarFormData();
    });
    
    $(".btn.eliminar").on("click", function(event){
        if(event.confirmado){
            return true;
        }
        modalConfirm(function(confirm){
          if(confirm){
              $(event.target).trigger({
                type : "click",
                confirmado : true
              });
          }
        });
        return false;
    });
    
 
})();

function changeBackground(){
        
        var clase = $('#imgFondo').attr('class');
        switch(clase){
            case "fondo1":
                $('#imgFondo').removeClass('fondo1');
                $("#imgFondo").fadeOut(500);
                $("#imgFondo").fadeIn(500);               
                $('#imgFondo').addClass('fondo2');                     
                break;

            case "fondo2":
                $('#imgFondo').removeClass('fondo2');
                $("#imgFondo").fadeOut(500);
                $("#imgFondo").fadeIn(500);
                $('#imgFondo').addClass('fondo3');
                break;

            case "fondo3":
                $('#imgFondo').removeClass('fondo3');
                $("#imgFondo").fadeOut(500);
                $("#imgFondo").fadeIn(500);                
                $('#imgFondo').addClass('fondo4');                
                break;

            case "fondo4":
                $('#imgFondo').removeClass('fondo4');
                $("#imgFondo").fadeOut(500);
                $("#imgFondo").fadeIn(500);                
                $('#imgFondo').addClass('fondo5');               
                break;

            case "fondo5":
                $('#imgFondo').removeClass('fondo5');
                $("#imgFondo").fadeOut(500);
                $("#imgFondo").fadeIn(500);                                
                $('#imgFondo').addClass('fondo6');                
                break;

            case "fondo6":
                $('#imgFondo').removeClass('fondo6');
                $("#imgFondo").fadeOut(500);
                $("#imgFondo").fadeIn(500);               
                $('#imgFondo').addClass('fondo1');                
                break;

            default:
                break;
        }

    setInterval(changeBackground, 5000);
}