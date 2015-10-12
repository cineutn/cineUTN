CREATE TABLE `funcion` (
  `idFuncion` int(11) NOT NULL AUTO_INCREMENT,
  `idSala` int(11) NOT NULL,
  `idPelicula` int(11) NOT NULL,
  `idIdioma` int(11) NOT NULL,
  `idTipoFuncion` int(11) NOT NULL,
  `estado` varchar(100) COLLATE utf8_bin NOT NULL,
  `fechaBaja` datetime NOT NULL,
  `fechaAlta` datetime NOT NULL,
  `idComplejo` int(11) NOT NULL,
  PRIMARY KEY (`idFuncion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin