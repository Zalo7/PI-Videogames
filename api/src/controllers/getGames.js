const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const keyId = 'https://api.rawg.io/api/games?key=621e1885219145a89116d1b93ec70920'

const gameList = async (req, res) => {
    try {
        const dataKey = await axios.get(keyId)
    const dataInfo =  dataKey.data.results.map(el => {
        let game =  {
        id: el.id,
        description: el.description,
        name: el.name,
        releaseDate: el.release,
        image: el.background_image,
        rating: el.rating,
        genre: el.genres.map(el => el.name),
        platforms: el.platforms.map(el => el.platform.name),
    }
    return game
    })
return res.json(dataInfo);
} catch(error) { 
    console.log('404' + error)
}
    }
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
module.exports =  { gameList };
