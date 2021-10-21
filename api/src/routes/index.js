const { Router } = require('express');
const  getApiInfo100  = require('./Games.js');
const  createVideogame  = require('./Games.js')
const  getVideogameById  = require('./Games.js')
const getGenre = require('./Genres.js')
const getNamesGames = require('./Games')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', getApiInfo100)
router.use('/newVideogame', createVideogame)
router.use('/juego', getVideogameById)
router.use('/genre', getGenre)
router.use('/name', getNamesGames)

module.exports = router;
