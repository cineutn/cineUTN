<?php
require("connection.php");

class Ventas
{
    private $connection;
    
    public function __construct(){
        $this->connection = ConnectionCine::getInstance();
    }   

    public function createVenta($venta){
        $id = $this->connection->real_escape_string($venta['idVenta']);
        $monto = $this->connection->real_escape_string($venta['monto']);
        $tipoVenta = $this->connection->real_escape_string($venta['tipoVenta']);
        $idVendedor = $this->connection->real_escape_string($venta['idVendedor']);
        $idCliente = $this->connection->real_escape_string($venta['idCliente']);
        $fecha = $this->connection->real_escape_string($venta['fecha']);
        $codigo = $this->connection->real_escape_string($venta['codigo']);

        $butacas = $this->connection->real_escape_string($venta['butacas']);
        $preciosEntradas = $this->connection->real_escape_string($venta['preciosEntradas']);

        try {
            
             $query = "INSERT INTO venta VALUES (
                    DEFAULT,
                    '$monto',
                    '$tipoVenta',
                    '$idVendedor',
                    '$idCliente',
                    '$fecha',
                    '$codigo')";
        
        //$this->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);

        if($this->connection->query($query)){
            $venta['idVenta'] = $this->connection->insert_id;

            $idVenta = $venta['idVenta'];

            $arrayButacas = explode(",", $butacas);

            for ($i = 0; $i <= count($arrayButacas) -1; $i++) {
                
                $idButaca = $arrayButacas[$i];

                $precio = 50;

                $query2 = "INSERT INTO ventaDetalle VALUES (
                    DEFAULT,
                    '$idVenta',
                    '$idButaca',
                    '$precio')";
                
                $this->connection->query($query);
                    
            }

            //$this->commit();
            return $venta;
        }else{
            return false;
        }
        } catch (Exception $e) {
            //$this->rollback();
        }

       
    }

    public function getVenta($codigo){

        $query = "SELECT V.codigo, C.nombre AS Complejo, P.titulo AS pelicula, S.descripcion AS Sala, FH.dia AS Fecha, FH.horario, V.monto AS precioTotal
                    FROM venta V
                    INNER JOIN ventadetalle VD ON V.idVenta = VD.idVenta
                    INNER JOIN sala_funcion SF ON VD.idSalaFuncion = SF.idSalaFuncion
                    INNER JOIN sala S ON S.idSala = SF.idSala
                    INNER JOIN funcion F ON F.idFuncion = SF.idFuncion
                    INNER JOIN pelicula P ON F.idPelicula = P.idPelicula
                    INNER JOIN complejo C ON C.idComplejo = F.idComplejo
                    INNER JOIN funcionhorario FH ON SF.idFuncionDetalle = FH.idFuncionDetalle
                    WHERE V.codigo =  '$codigo'";

        $venta = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $venta[] = $fila;
            }
            $result->free();
        }
        return $venta;

    }


}