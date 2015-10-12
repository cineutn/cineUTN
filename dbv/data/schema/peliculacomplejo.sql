CREATE TABLE `peliculacomplejo` (
  `peliculaComplejoId` int(11) NOT NULL AUTO_INCREMENT,
  `idPelicula` int(11) NOT NULL,
  `idComplejo` int(11) NOT NULL,
  PRIMARY KEY (`peliculaComplejoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin