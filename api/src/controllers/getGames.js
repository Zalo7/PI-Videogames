const { Router } = require("express");
const axios = require("axios");
const { DB_NAME, API_KEY, API_URL } = process.env;
const keyId = "https://api.rawg.io/api/games?key=621e1885219145a89116d1b93ec70920";
const { Genres } = connection(DB_NAME);
const { Videogame, Genre } = connection(DB_NAME);
const { connection } = require('../db.js');

    const pag1 = await axios.get(response.data.next);
    const resultPag1 = pag1.data.results;

    const pag2 = await axios.get(pag1.data.next);
    const resultPag2 = pag2.data.results;

    const pag3 = await axios.get(pag2.data.next);
    const resultPag3 = pag3.data.results;

    const pag4 = await axios.get(pag3.data.next);
    const resultPag4 = pag4.data.results;

    const allPages = [...resultResponse, ...resultPag1, ...resultPag2, ...resultPag3, ...resultPag4,];

    const getDBVideoGames = async () => {
    return await Videogame.findAll({
        include: {
        model: Genre,
        attributes: ["name"],
        through: {
           attributes: [],
        },
        },
    });
    };


    /// GET VIDEOGAMES 20-100
const gameList = async (req, res) => {
  try {
    const dataKey = await axios.get(keyId);
    const dataInfo = dataKey.data.results.map((el) => {
      let game = {
        id: el.id,
        description: el.description,
        name: el.name,
        releaseDate: el.release,
        image: el.background_image,
        rating: el.rating,
        genre: el.genres.map((el) => el.name),
        platforms: el.platforms.map((el) => el.platform.name),
      };
      return game;
    });
    return res.json(dataInfo);
  } catch (error) {
    console.log("404" + error);
  }
};

/// GET GENRES
const getGenre =  async () =>  {
  let allGenres = [];
  try {
    const getGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genres = getGenres.data.results.map((el) => el.name);
    genres.forEach((el) => {
      Genres.findOrCreate({
        where: {
          name: el,
        },
      });
    });
  } catch (err) {
    allGenres = {
      error: "Cant fetch genres",
      originalError: err,
    };
  } finally {
    return allGenres;
  }
}

/// GET ID
async function getVideogameById(req, res, next) {
  const { API_KEY } = process.env;

  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return await Videogame.findOne({
        where: {
          id: id,
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
    } else {
      //API
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      return {
        id: response.data.id,
        description: response.data.description,
        name: response.data.name,
        releaseDate: response.data.releaseDate,
        image: response.data.image,
        rating: response.data.rating,
        genre: response.data.genres,
        platforms: response.data.platforms
      };
    }
  } catch (error) {
    next(error);
  }
}
/// GET NAMES GAMES
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

module.exports = { gameList, getGenre, getVideogameById, getNamesGames };
