var URI = {        
 
    
        PERSONAL : {
            url : 'actions/actionTabla.php?action=getPersonal',
            columns : [
                {   "data": "id"   
                },
                {   "data": "Nombre" },
                {   "data": "Apellido" },
                {   "data": "DNI" },
                {   "data": "Mail" },
                {   "data": "User" },
                {   "data": "Pass" },
                {   "data": "Total Ventas" },
                {   "data": "Borrado"},
                {   "data": "Fecha Modificacion"},
                {   "data": "Edicion",
                    "render" : function(data, type, full, meta){
                       var boton = '';
                       
                            boton='<span  class="glyphicon glyphicon-pencil lapiz"></span><span id="btn'+full.id+'" class="glyphicon glyphicon-remove cruz"></span>'
                        
                        
                        return boton;
                    }
                }
                 
            ]
         },
        DELETE : 'actions/actionTabla.php?action=deletePersonal'
    };
    var URISELECTED=[];
    var table;
    
    $(document).ready(function() {
        
        URISELECTED.url=URI.PERSONAL.url+"&idComplejo="+sessionStorage.idcomplejo;
        URISELECTED.columns=URI.PERSONAL.columns;
        
        URI.PERSONAL.columns.forEach(function(e){
            $("#grid-basic thead tr").append(
                $('<th/>').append(e.data)
            );
 
        });
        
         table = $("#grid-basic")
             .DataTable({
                "ajax": URISELECTED.url,
                "columns": URISELECTED.columns,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                })
             .on('xhr.dt', function ( e, settings, json, xhr ) {
                    $('#grid-basic_wrapper .col-sm-12').prepend('<div id="btnAgregar" class="pull-right addPersonal"><span class="glyphicon glyphicon-plus"></span>    </div>');
                    $('#grid-basic_wrapper .col-sm-12').on('click','.addPersonal',function(event){
                        event.stopPropagation();
                        
                        $('#perfil').val('2');
                        $('#complejo').val(sessionStorage.idcomplejo);
                        $('#modalSignup').modal('show');
                       
                        
                    });
                    
                    
                } );
        
        
        $('#grid-basic_wrapper .col-sm-12').prepend('<button class="btn btn-default" type="submit">Agregar</button>');
        $('body').on('click','.lapiz',function(event){
            event.stopPropagation();

            alert("editar");

        });
        $('body').on('click','.cruz',function(event){
            event.stopPropagation();

            data = {
                id : event.toElement.id.replace('btn','')
            }


            cambiarEstadoUsuario(data);

        });
        
         
        
    } );
   
    function cambiarEstadoUsuario(data){
        $.ajax({
            url : URI.DELETE,
            method : "GET",
            dataType : 'json',
            data : data,
            success : function(){
                
                table.ajax.reload();
            
            },
            error: function(result) {
                    alert("Error cambiando el estado");
                }
        });
    
    }