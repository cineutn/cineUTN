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
                {   "data": "Fecha Baja"},
                {   "data": "Edicion",
                    "render" : function(data, type, full, meta){
                       var boton = '';
                       
                            boton='<span  class="glyphicon glyphicon-pencil lapiz"></span><span class="glyphicon glyphicon-remove cruz"></span>'
                        
                        
                        return boton;
                    }
                }
                 
            ]
         },
        CAMBIAESTADO : 'actions/actionTabla.php?action=deletePersonal'
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
                    $('#grid-basic_wrapper .col-sm-12').on('click','.lapiz',function(event){
                        event.stopPropagation();
                        
                        alert("editar");
                        
                    });
                    $('#grid-basic_wrapper .col-sm-12').on('click','.cruz',function(event){
                        event.stopPropagation();
                        
                        alert("borrar");
                        
                    });
                    
                } );
        
        
        $('#grid-basic_wrapper .col-sm-12').prepend('<button class="btn btn-default" type="submit">Agregar</button>');
        
        $('body').on('click','table button',function(e){
            e.stopPropagation();
            
            data = {
                id : e.toElement.id.replace('btn',''),
                newstate : e.toElement.getAttribute('newState')
            }
            
            
            cambiarEstadoUsuario(data);
        }); 
        
    } );
   
    function cambiarEstadoUsuario(data){
        $.ajax({
            url : URI.CAMBIAESTADO,
            method : "GET",
            dataType : 'json',
            data : data,
            beforeSend : function(){
                $('#btn'+data.id).append('<i class="fa fa-spinner fa-spin"></i>');
            },
            success : function(){
                
                table.ajax.reload();
            
            },
            error: function(result) {
                    alert("Error cambiando el estado");
                }
        });
    
    }