const { DB_NAME } = process.env;
const axios = require("axios");
const { connection } = require('../db.js');
const { Videogame, Genre } = connection(DB_NAME);
async function createVideogame(req, res, next) {
  let {
    id,
    name,
    description,
    releaseDate,
    rating,
    platforms,
    image,
    createInDb,
    genres,
  } = req.body;

  const createVideoGame = await Videogame.create({
    id,
    name,
    description,
    releaseDate,
    rating,
    platforms,
    image,
    createInDb,
    genres,
  });

  let genreGameDb = await Genre.findAll({
    where: { name: genres },
  });
  createVideoGame.addGenres(genreGameDb);
  res.status(200).send("Videogame created successfully");
}

// let genreDb = await Genre.findAll({
//   where: { name: genres}
//  })
//  videogameCreated.addGenre(genreDb)
//  res.send('Videogame created successfully').json(Videogame.create)
// }

//  Videogame.create(videogameCreated)
//  .then(videogameCreated => {
//    videogameCreated.addGenre(genre)
//   res.json({...videogameCreated, genre})
//  })
// .catch((error)=> next(error))

module.exports = { createVideogame };
