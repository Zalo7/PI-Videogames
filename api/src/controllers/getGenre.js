const { Genres } = require('../models/Genre.js')
const axios = require("axios");
const { API_KEY } = process.env;

async function getGenre(req, res) {
    let allGenres = [];
    
    try {
        const getGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) //https://api.rawg.io/api/genres?key=${API_KEY}
        let genres = getGenres.data.results.map(el => el.name);
        genres.forEach(el => {
            Genres.findOrCreate({
                where: {
                    name: el
                }
            })
        })
    } catch(err) {
        allGenres = { 
            error: 'Cant fetch genres', 
            originalError: err
         }
    } finally{
        return allGenres;
    }
}

module.exports = { getGenre };
