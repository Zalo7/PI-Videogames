const { Router } = require('express');
const { gameList } = require('../controllers/getGames');
const { getVideogameById } = require('../controllers/getGames');
const { getNamesGames } = require('../controllers/getGames');
const { createVideogame } = require('../controllers/postGame');
const router = Router();


router.get('/', gameList);
router.get('/:id', getVideogameById)
router.get('/', getNamesGames) //name
router.post('/', createVideogame)

module.exports = router;