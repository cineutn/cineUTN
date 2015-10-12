CREATE TABLE `tarjeta` (
  `idTarjeta` int(11) NOT NULL AUTO_INCREMENT,
  `empresa` varchar(50) COLLATE utf8_bin NOT NULL,
  `cantNumeros` int(11) NOT NULL,
  `codigoSeguridad` int(11) NOT NULL,
  PRIMARY KEY (`idTarjeta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin