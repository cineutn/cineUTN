var URI = {        

        USUARIOS : {
            url : 'actions/actionTabla.php?action=getUsuarios',
            columns : [
                {   "data": "id",
                    "visible": false    
                },
                {   "data": "nombre" },
                {   "data": "apellido" },
                {   "data": "dni" },
                {   
                    "data": "Fecha de nacimiento"
                },
                {   "data": "email" },
                {   "data": "usuario" },
                {   "data": "pass" },
                {   "data": "Total Compras" },
                {   "data": "Total Reservas vencidas"
                },
                {   "data": "bloqueado",
                    "render" : function(data, type, full, meta){
                        var boton = "<button id='btn"+full.id+"' newState='1' type=button class='btn'>Bloquear</button>";
                        if(data==1){
                            boton="<button id='btn"+full.id+"' newState='0' type=button class='btn'>Desbloquear</button>"
                        }
                        
                        return boton;
                    }
                },
                {   "data":"Fecha Ultima Funcion"}
                 
            ]
         },
        CAMBIAESTADO : 'actions/actionTabla.php?action=setState'
    };
    var URISELECTED=[];
    var table;
    
    $(document).ready(function() {
        
        URISELECTED.url=URI.USUARIOS.url;
        URISELECTED.columns=URI.USUARIOS.columns;
        
        URI.USUARIOS.columns.forEach(function(e){
            $("#grid-basic thead tr").append(
                $('<th/>').append(e.data)
            );
 
        });
         table = $("#grid-basic").DataTable({
            "ajax": URISELECTED.url,
            "columns": URISELECTED.columns,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
              "scrollX": true
        });
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