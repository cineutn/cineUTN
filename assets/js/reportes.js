$('title').html("Reportes");

    var URI = {        
       url : 'actions/actionTabla.php?action=getReporte',
        recaudacionXPelicula : {
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
                 
            ],
            order : [[ 4, 'desc' ]]
         },
        recaudacionXComplejo : {
            columns : [
                {   "data": "Complejo"},
                {   "data": "Recaudacion"},
                {   "data": "CantPersona" }
                 
            ],
            order : [[ 1, 'desc' ]]
        
        },
        recaudacionTotal : {
            columns : [
                {   "data": "Recaudacion Total"},
                {   "data": "Espectadores"},
                {   "data": "Desde" },
                {   "data": "Hasta" }
            ],
            order : [[ 0, 'desc' ]]
        
        },
        topPeliculasXComplejo : {
            columns : [
                {   "data": "Titulo"},
                {   "data": "Estreno"},
                {   "data": "Baja" },
                {   "data": "Recaudacion" },
                {   "data": "Espectadores" },
                {   "data": "Complejo" }
            ],
            order : [[ 3, 'desc' ]]
        
        },
        topPeliculas : {
            columns : [
                {   "data": "Titulo"},
                {   "data": "Estreno"},
                {   "data": "Baja" },
                {   "data": "Recaudacion" },
                {   "data": "Espectadores" }
            ],
            order : [[ 3, 'desc' ]]
        
        },
        pelisMasVistasPorDia : {
            columns : [
                {   "data": "Titulo"},
                {   "data": "Fecha" },
                {   "data": "Espectadores" },
                {   "data": "Estreno"},
                {   "data": "Baja" }             
                
                
            ],
            order : [[ 1, 'desc' ], [ 2, 'desc' ]]
        
        },
        recaudacionVendedores : {
            columns : [
                {   "data": "Nombre",
                    "render" : function(data, type, full, meta){
                        return data.toUpperCase();
                    }   
                },
                {   "data": "Apellido",
                    "render" : function(data, type, full, meta){
                        return data.toUpperCase();
                    }   
                },
                {   "data": "Recaudacion Total"},
                {   "data": "Espectadores"},
                {   "data": "Desde" },
                {   "data": "Hasta" }
            ],
            order : [[ 2, 'desc' ]]
        
        },
    };
    var URISELECTED=[];
    var table;
    
    $(document).ready(function() {
        armaDropDown();
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
        
       URISELECTED.url=URI.url+"&fInicio="+$('#fechaDesde').val()+"&fFin="+$('#fechaHasta').val()+"&tipoReporte="+e.delegateTarget.id+"&idcomplejo="+sessionStorage.idcomplejo;
       URISELECTED.columns=eval("URI."+e.delegateTarget.id+".columns");
       URISELECTED.order=eval("URI."+e.delegateTarget.id+".order");
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
                    },
                "order": URISELECTED.order,
                buttons: [
                        'excel',
                        'print'
                    ],
                "initComplete": function(settings, json) {
                         table.buttons().container()
                            .appendTo( $('#botonesTabla a' ) );
                        $('.dt-buttons.btn-group a').addClass("btn-sm");
                    }
             
                })
            
            


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
function armaDropDown(){
    
    if(sessionStorage.tipoUsuario=="superAdministrador"){
        $('#menuReportes .dropdown-menu')
            .append($('<li/>').append($('<a/>',{'id' : 'recaudacionXPelicula'}).append('Recaudacion por Peliculas')))
            .append($('<li/>').append($('<a/>',{'id' : 'recaudacionXComplejo'}).append('Recaudacion por Complejo')))
            .append($('<li/>').append($('<a/>',{'id' : 'recaudacionTotal'}).append('Recaudacion Total')))
            .append($('<li/>').append($('<a/>',{'id' : 'topPeliculasXComplejo'}).append('Top Peliculas por complejo')))
            .append($('<li/>').append($('<a/>',{'id' : 'pelisMasVistasPorDia'}).append('Peliculas mas vistas por dia')));
    }else if(sessionStorage.tipoUsuario=="administrador"){
        $('#menuReportes .dropdown-menu')
            .append($('<li/>').append($('<a/>',{'id' : 'recaudacionXPelicula'}).append('Recaudacion por Peliculas')))
            .append($('<li/>').append($('<a/>',{'id' : 'recaudacionTotal'}).append('Recaudacion Total')))
            .append($('<li/>').append($('<a/>',{'id' : 'topPeliculas'}).append('Top Peliculas')))
            .append($('<li/>').append($('<a/>',{'id' : 'pelisMasVistasPorDia'}).append('Peliculas mas vistas por dia')))
            .append($('<li/>').append($('<a/>',{'id' : 'recaudacionVendedores'}).append('Recaudacion por vendedores')));
    }
    
            


}