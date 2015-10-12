CREATE TABLE `pelicula` (
  `idPelicula` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) COLLATE utf8_bin NOT NULL,
  `duracion` int(11) NOT NULL,
  `clasificacion` varchar(3) COLLATE utf8_bin NOT NULL,
  `genero` varchar(50) COLLATE utf8_bin NOT NULL,
  `estreno` datetime NOT NULL,
  `fechaBaja` datetime NOT NULL,
  `fechaAlta` datetime NOT NULL,
  `sinopsis` text COLLATE utf8_bin NOT NULL,
  `imagen` varchar(250) COLLATE utf8_bin NOT NULL,
  `trailer` varchar(250) COLLATE utf8_bin NOT NULL,
  `actores` varchar(150) COLLATE utf8_bin NOT NULL,
  `director` varchar(150) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idPelicula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin