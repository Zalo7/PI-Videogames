const { Router } = require('express');
const { getApiInfo100 } = require('../controllers/getGames');
const { getVideogameById } = require('../controllers/getGames');
const { getNamesGames } = require('../controllers/getGames');
const { createVideogame } = require('../controllers/postGame');
const router = Router();


router.get('/', getApiInfo100);
router.get('/:id', getVideogameById)
router.get('/', getNamesGames) //name
router.post('/', createVideogame)

module.exports = router;