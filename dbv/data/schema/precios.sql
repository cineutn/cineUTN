CREATE TABLE `precios` (
  `idPrecio` int(11) NOT NULL AUTO_INCREMENT,
  `idFormato` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_bin NOT NULL,
  `valor` int(11) NOT NULL,
  PRIMARY KEY (`idPrecio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin