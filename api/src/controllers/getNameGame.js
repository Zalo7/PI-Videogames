const { Router } = require('express');
const axios = require("axios");

async function getNamesGames(req, res, next) {
    try {
let names = (await axios.get('https://api.rawg.io/api/games?key=621e1885219145a89116d1b93ec70920&search={game}'))
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
return res.json(videogame)

}catch(error) {
next(error)
}
}
    
module.exports = { getNamesGames };
