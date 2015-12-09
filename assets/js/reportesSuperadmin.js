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
        $('#fechaDesde').val('2015-08-27');
        $('#fechaHasta').val('2015-11-29');
        $('#menuReportes .dropdown-menu a').on('click',function(e){
            llamaReporte(e);
        
        });     
    } );

function llamaReporte(e){
   
    
    switch(e.delegateTarget.id) {
        case "recaudacionXPelicula":
             URISELECTED.url=URI.RECAUDACIONPELICULA.url+"&fInicio="+$('#fechaDesde').val()+"&fFin=2015-11-29";
             URISELECTED.columns=URI.RECAUDACIONPELICULA.columns;
            armaTabla();
            
            break;
    }
    

}
function armaTabla(){
    $("#grid-basic thead tr th").remove();
    
    if(table){
         table.destroy();
    }
   
    
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
                        
                    //aca bindeo las funciones a los botones    
                    
                    
                    
                } );


}
   