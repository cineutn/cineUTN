CREATE TABLE `complejo` (
  `idComplejo` int(11) NOT NULL AUTO_INCREMENT,
  `idZona` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_bin NOT NULL,
  `descripcion` text COLLATE utf8_bin NOT NULL,
  `direccion` varchar(150) COLLATE utf8_bin NOT NULL,
  `imagen` varchar(250) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idComplejo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin