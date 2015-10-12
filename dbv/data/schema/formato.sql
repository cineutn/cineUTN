CREATE TABLE `formato` (
  `idFormato` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoFuncion` int(11) NOT NULL,
  `descripcion` varchar(7) COLLATE utf8_bin NOT NULL,
  `subtitulada` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idFormato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin