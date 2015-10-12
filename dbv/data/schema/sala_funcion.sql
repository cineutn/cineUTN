CREATE TABLE `sala_funcion` (
  `idSalaFuncion` int(11) NOT NULL,
  `idFuncion` int(11) NOT NULL,
  `columna` int(11) NOT NULL,
  `fila` int(11) NOT NULL,
  `habilitada` tinyint(1) NOT NULL,
  `idSala` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1