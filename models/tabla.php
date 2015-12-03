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
    
    public function getReporte($arr){

        $fInicio = $this->connection->real_escape_string($arr["fInicio"]);
        $fFin = $this->connection->real_escape_string($arr["fFin"]);
        $tipoReporte= $this->connection->real_escape_string($arr["tipoReporte"]);

        
        
        $query="";
        
        switch ($tipoReporte) {
            case "recaudacionXPelicula":
                $query = "select pel.titulo Titulo ,
                fm.descripcion as Formato,
                DATE_FORMAT(pel.estreno,'%d-%m-%Y') Estreno,
                DATE_FORMAT(fn.fechaBaja,'%d-%m-%Y') Baja,
                sum(vd.precio) as Recaudacion,
                count(*) Espectadores
                from pelicula pel 
                inner join formato fm on pel.idformato=fm.idformato 
                inner join funcion fn on fn.idpelicula=pel.idpelicula 
                inner join sala_funcion sf on sf.idfuncion=fn.idFuncion
                inner join ventadetalle vd on vd.idSalaFuncion=sf.idsalafuncion 
                inner join venta v on v.idventa=vd.idventa
                where v.tipoventa!='Reserva' and DATE_FORMAT(v.fecha,'%Y-%m-%d') between '$fInicio'  and '$fFin'
                group by pel.titulo ,fm.descripcion ,pel.estreno,fn.fechaBaja";
                break;
            case "recaudacionXComplejo":
                $query = "SELECT
                    C.nombre AS Complejo, 
                    SUM( VD.precio ) AS Recaudacion, 
                    COUNT( VD.idVentaDetalle ) AS CantPersona
                    FROM venta V
                    INNER JOIN ventadetalle VD ON V.idVenta = VD.idVenta
                    INNER JOIN sala_funcion SF ON VD.idSalaFuncion = SF.idSalaFuncion
                    INNER JOIN funcion F ON SF.idFuncion = F.idFuncion
                    INNER JOIN complejo C ON F.idComplejo = C.idComplejo
                    WHERE V.tipoVenta <>  'Reserva'
                    AND DATE_FORMAT(V.fecha,'%Y-%m-%d') BETWEEN '$fInicio'  and '$fFin'
                    GROUP BY C.nombre";
                break;
            case "recaudacionTotal":
                $query="
                select sum(precio) as 'Recaudacion Total', count(idVentaDetalle) as Espectadores,'$fInicio' as Desde, '$fFin' as Hasta
                from venta V
                INNER JOIN ventadetalle VD ON V.idVenta = VD.idVenta
                WHERE V.tipoVenta <>  'Reserva'
                AND DATE_FORMAT(V.fecha,'%Y-%m-%d') BETWEEN '$fInicio'  and '$fFin'
                ";
                break;
            case "topPeliculasXComplejo":
                $query="
                select pel.titulo Titulo ,
                DATE_FORMAT(pel.estreno,'%d-%m-%Y') Estreno,
                DATE_FORMAT(fn.fechaBaja,'%d-%m-%Y') Baja,
                sum(vd.precio) as Recaudacion,
                count(*) Espectadores,
                c.nombre as Complejo
                from pelicula pel 
                inner join formato fm on pel.idformato=fm.idformato 
                inner join funcion fn on fn.idpelicula=pel.idpelicula 
                INNER JOIN complejo c ON fn.idComplejo = c.idComplejo
                inner join sala_funcion sf on sf.idfuncion=fn.idFuncion
                inner join ventadetalle vd on vd.idSalaFuncion=sf.idsalafuncion 
                inner join venta v on v.idventa=vd.idventa
                where v.tipoventa!='Reserva' and DATE_FORMAT(v.fecha,'%Y-%m-%d') between '$fInicio'  and '$fFin'
                group by pel.titulo ,pel.estreno,fn.fechaBaja, c.nombre
                ";
                break;
            case "pelisMasVistasPorDia":
                $query="
                    select 
                    pel.titulo Titulo,
                    DATE_FORMAT(sm.fecha,'%d-%m-%Y') Fecha,
                    count(*) Espectadores,
                    DATE_FORMAT(pel.estreno,'%d-%m-%Y') Estreno,
                    DATE_FORMAT(fn.fechaBaja,'%d-%m-%Y') Baja             
                    
                    from pelicula pel 
                    inner join formato fm on pel.idformato=fm.idformato 
                    inner join funcion fn on fn.idpelicula=pel.idpelicula 
                    inner join funcionhorario fh on fh.idFuncion=fn.idFuncion
                    inner join semana sm on sm.idSemana=fh.idSemana
                    INNER JOIN complejo c ON fn.idComplejo = c.idComplejo
                    inner join sala_funcion sf on sf.idfuncion=fn.idFuncion
                    inner join ventadetalle vd on vd.idSalaFuncion=sf.idsalafuncion 
                    inner join venta v on v.idventa=vd.idventa
                    where v.tipoventa!='Reserva' and DATE_FORMAT(sm.fecha,'%Y-%m-%d') between '$fInicio'  and '$fFin'
                    group by pel.titulo ,pel.estreno,fn.fechaBaja, c.nombre,DATE_FORMAT(sm.fecha,'%d-%m-%Y')
                ";
                break;
        }
    
        
        
          

        $res = array();
        
        try{
            if( $result = $this->connection->query($query) ){
                while($fila = $result->fetch_assoc()){
                    $res[] = $fila;
                }
                $result->free();
            }
        }
        catch(Exception $e) {
            throw new Exception ($e->getMessage());
        }
       
        return $res;


    }
    
    
}