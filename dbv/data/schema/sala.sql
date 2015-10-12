CREATE TABLE `sala` (
  `idSala` int(11) NOT NULL AUTO_INCREMENT,
  `fila` varchar(1) COLLATE utf8_bin NOT NULL,
  `columna` int(11) NOT NULL,
  `habilitada` tinyint(1) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idSala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin