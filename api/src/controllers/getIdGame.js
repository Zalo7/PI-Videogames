const { DB_NAME } = process.env;
const axios = require("axios");
const { connection } = require('../db.js');
const { Videogame, Genre } = connection(DB_NAME);
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
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
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

module.exports = { getVideogameById };
