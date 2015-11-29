$('title').html("Reportes");

var URI = {        
 
       RECAUDACIONPELICULA : {
            url : 'actions/actionTabla.php?action=getRecaudacionPelicula',
            columns : [
                {   "data": "Titulo",
                    "render" : function(data, type, full, meta){
                        return data.toUpperCase();
                    }   
                 },
                {   "data": "Formato" },
                {   "data": "Estreno" },
                {   "data": "Baja" },
                {   "data": "Recaudado" },
                {   "data": "Espectadores" }
                 
            ]
         }
    };
    var URISELECTED=[];
    var table;
    
    $(document).ready(function() {
       
          
        URISELECTED.url=URI.RECAUDACIONPELICULA.url+"&fInicio=2015-08-27&fFin=2015-11-29";
        URISELECTED.columns=URI.RECAUDACIONPELICULA.columns;
        
        URISELECTED.columns.forEach(function(e){
            $("#grid-basic thead tr").append(
                $('<th/>').append(e.data)
            );
 
        });
        
         table = $("#grid-basic")
             .DataTable({
                "ajax": URISELECTED.url,
                "columns": URISELECTED.columns,
                "language": {
                    "url": "assets/Spanish.json"
                    }
                })
             .on('xhr.dt', function ( e, settings, json, xhr ) {
                     //aca agrego los botones de fomra dinamica               
             
                    /*if($('#btnAgregar').attr('id')!='btnAgregar'){
                        $('#grid-basic_wrapper .col-sm-12').prepend('<div id="btnAgregar" class="pull-right addPersonal"><span class="glyphicon glyphicon-plus"></span>    </div>');  
                    }*/
             
                    //aca bindeo las funciones a los botones    
                    /*$('#grid-basic_wrapper .col-sm-12').on('click','.addPersonal',function(event){
                        event.stopPropagation();
                        
                        $('#perfil').val('3');
                        
                        $('#modalSignup').modal('show');
                        $('#modalSignup .modal-body .alert-success').remove();
                         $('#modalSignup form input.form-control').val('')
                        
                    });*/
                    
                    
                } );
            
         
        
    } );
   