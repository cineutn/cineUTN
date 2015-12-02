$('title').html("Reportes");

    var URI = {        
       url : 'actions/actionTabla.php?action=getReporte',
       RECAUDACIONPELICULA : {
            columns : [
                {   "data": "Titulo",
                    "render" : function(data, type, full, meta){
                        return data.toUpperCase();
                    }   
                 },
                {   "data": "Formato" },
                {   "data": "Estreno" },
                {   "data": "Baja" },
                {   "data": "Recaudacion"},
                {   "data": "Espectadores" }
                 
            ]
         },
        RECAUDACIONCOMPLEJO : {
            columns : [
                {   "data": "Complejo"},
                {   "data": "Recaudacion"},
                {   "data": "CantPersona" }
                 
            ]
        
        }
    };
    var URISELECTED=[];
    var table;
    
    $(document).ready(function() {
        $('#fechaDesde').val(obtenerFechaSemanaAnterior());
        $('#fechaHasta').val(obtenerFechaActual());
        

        $('#menuReportes .dropdown-menu a').on('click',function(e){
            llamaReporte(e);
        
        });     
    } );

function llamaReporte(e){
   if($('#fechaDesde').val()>$('#fechaHasta').val()){
        alert("La 'fecha desde' debe ser menor o igual a la 'fecha hasta'");
       
       
       
   }else{
        
       URISELECTED.url=URI.url+"&fInicio="+$('#fechaDesde').val()+"&fFin="+$('#fechaHasta').val()+"&tipoReporte="+e.delegateTarget.id;
       
        switch(e.delegateTarget.id) {
            case "recaudacionXPelicula":
                URISELECTED.columns=URI.RECAUDACIONPELICULA.columns;
                break;
            case "recaudacionXComplejo":
                URISELECTED.columns=URI.RECAUDACIONCOMPLEJO.columns;
                break;
                
        }
        armaTabla();
   }
}
function armaTabla(){
    
    
    if(table){
         table.destroy();
         $("#grid-basic thead tr th").remove();
         $("#grid-basic tbody").remove();
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
function obtenerFechaActual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;

}
function obtenerFechaSemanaAnterior(){
    var today = new Date();
    
    
    var semanaAnterior=new Date(today.getTime() - (24*60*60*1000)*7);
    
    var dd = semanaAnterior.getDate();
    var mm = semanaAnterior.getMonth()+1; //January is 0!
    var yyyy = semanaAnterior.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;

}   