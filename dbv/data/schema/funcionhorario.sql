CREATE TABLE `funcionhorario` (
  `idFuncionDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `idFuncion` int(11) NOT NULL,
  `dia` varchar(9) COLLATE utf8_bin NOT NULL,
  `horario` varchar(5) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idFuncionDetalle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin