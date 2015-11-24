<?php
require("connection.php");

class Tabla
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    } 
	
    public function getUsuarios(){
        $query = "SELECT idUsuario id , nombre, apellido, dni, fechaNacimiento as 'Fecha de nacimiento', email, usuario, contraseña as pass, sum(case when lower(tipoVenta)<>'reserva' then 1 else 0 end) as 'Total Compras',sum(case when lower(tipoVenta)='reserva' and b.fechaFuncion< DATE_FORMAT(NOW(), '%Y-%m-%d')  then 1 else 0 end) as 'Total Reservas vencidas',bloqueado ,max(fechaFuncion) 'Fecha Ultima Funcion'
FROM  usuario a
left join (
	
	select distinct b.idVenta,b.tipoVenta, idCliente,g.fecha as fechaFuncion
	from venta b
	inner join ventadetalle c on b.idVenta=c.idVenta
	inner join sala_funcion d on d.idSalaFuncion=c.idSalaFuncion
	inner join funcionhorario f on f.idFuncionDetalle=d.idFuncionDetalle
	inner join semana g on g.idSemana=f.idSemana

	) b on a.idUsuario=b.idCliente
where tipousuario=1
group by id  , nombre, apellido, dni, fechaNacimiento , email, usuario, contraseña, telefono,bloqueado
order by 'Total Reservas vencidas' desc,'Total Compras' desc";  
        
        
        
       
        $usuarios = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $usuarios[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $usuarios;
    
    }

    public function getPersonal($idComplejo){
          
           $complejo = $this->connection->real_escape_string($idComplejo['idComplejo']);
          
        $query = "SELECT idUsuario id , nombre Nombre, apellido Apellido, dni DNI, email Mail, usuario User, contraseña as Pass,telefono as Telefono, sum(case when lower(tipoVenta)<>'reserva' then 1 else 0 end) as 'Total Ventas',borrado as Borrado,fechaBaja as 'Fecha Modificacion',NULL as Edicion
                    FROM  usuario a
                    left join venta b on a.idUsuario = b.idCliente
                    where tipousuario = 2 
                    and a.idComplejo=$complejo
                    group by id  , nombre, apellido, dni,  email, usuario, contraseña, telefono,borrado,fechaBaja";         

        $usuarios = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $usuarios[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $usuarios;
    
    }
    public function getAdmins(){  
          
        $query = "SELECT idUsuario id , a.nombre Nombre, apellido Apellido, dni DNI, email Mail, usuario User, contraseña as Pass,telefono as Telefono,b.nombre as Complejo,a.idComplejo,borrado as Borrado,fechaBaja as 'Fecha Modificacion',NULL as Edicion
                    FROM  usuario a
                    inner join complejo b on a.idComplejo=b.idComplejo
                    where tipousuario=3";  
        
        $usuarios = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $usuarios[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $usuarios;
    
    }
    
    
    public function setState($state){
        
        $id = $this->connection->real_escape_string($state['id']);
        $state = $this->connection->real_escape_string($state['state']);
       
        $query = "update usuario set bloqueado=$state where idUsuario=$id";  
       
       // echo $query;
    //    return false;
        
        $usuarios = array();
        
        try{
            if( $this->connection->query($query) ){
                return true;   
            }
            else{
                return false;
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $usuarios;
    
    }

    public function deletePersonal($state){
        
        $id = $this->connection->real_escape_string($state['id']);
          
        $query = "update usuario set borrado=borrado ^ 1 ,fechaBaja=now()  where idUsuario=$id";  
         
        $usuarios = array();
        
        try{
            if( $this->connection->query($query) ){
                return true;   
            }
            else{
                return false;
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $usuarios;
    
    }
    
   
    
    
}