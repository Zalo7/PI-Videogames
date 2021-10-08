const { Router } = require('express');
const gameList = require('./Games')
const createVideogame = require('./Games')
const getVideogameById = require('./Games')
const getGenre = require('./Genres')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', gameList)
router.use('/newVideogame', createVideogame)
router.use('/', getVideogameById)
router.use('/genre', getGenre)

module.exports = router;
