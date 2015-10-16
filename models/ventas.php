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
        $query = "INSERT INTO venta VALUES (
                    DEFAULT,
                    '$monto',
                    '$tipoVenta',
                    '$idVendedor',
                    '$idCliente',
                    '$fecha',
                    '$codigo')";

        if($this->connection->query($query)){
            $venta['idVenta'] = $this->connection->insert_id;
            return $venta;
        }else{
            return false;
        }
    }

}