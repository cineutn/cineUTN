CREATE TABLE `ventadetalle` (
  `idVentaDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `idVenta` int(11) NOT NULL,
  `monto` double NOT NULL,
  `tipoVenta` varchar(50) COLLATE utf8_bin NOT NULL,
  `idVendedor` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  PRIMARY KEY (`idVentaDetalle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin