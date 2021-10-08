const { Router } = require('express');
const { getGenre } = require('../controllers/getGenre');
const router = Router();

router.get('/genre', getGenre)


module.exports = router;