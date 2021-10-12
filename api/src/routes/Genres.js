const { Router } = require('express');
const { getGenre } = require('../controllers/getGames');
const router = Router();
const { Genres } = require('../models/Genre.js')


router.get('/', getGenre )


module.exports = router;