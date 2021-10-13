const { Router } = require('express');
const { getGenre } = require('../controllers/getGames');
const router = Router();

router.get('/genre', getGenre )


module.exports = router;