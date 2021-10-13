const { Router } = require("express");
const axios = require("axios");
const { DB_NAME, API_KEY } = process.env;
// const keyId = "https://api.rawg.io/api/games?key=621e1885219145a89116d1b93ec70920";
const keyId = '621e1885219145a89116d1b93ec70920'
  const { connection } = require('../db.js');
  const { Videogame, Genre } = connection(DB_NAME);
 
  const getApiInfo100= async (_req, res) => {
    let gg = []

  let games = await axios.get(`https://api.rawg.io/api/games?key=${keyId}`)

  let gamesPageTwo = await axios.get(`https://api.rawg.io/api/games?key=${keyId}&page=2`)

  let gamesPageThree = await axios.get(`https://api.rawg.io/api/games?key=${keyId}&page=3`)

  let gamesPageFour = await axios.get(`https://api.rawg.io/api/games?key=${keyId}&page=4`)

  let gamesPageFive = await axios.get(`https://api.rawg.io/api/games?key=${keyId}&page=5`)

  let resultsGames = games.data.results;
  let resultsPageTwo = gamesPageTwo.data.results;
  let resultsPageThree = gamesPageThree.data.results;
  let resultsPageFour = gamesPageFour.data.results;
  let resultsPageFive = gamesPageFive.data.results;
  
   gg = resultsGames.concat(resultsPageTwo, resultsPageThree, resultsPageFour, resultsPageFive)
  
  // games.concat(resultsPageTwo).concat(resultsPageThree).concat(resultsPageFour).concat(resultsPageFive)
  // allPages = [...resultsGames, ...resultsPageTwo, ...resultsPageThree, ...resultsPageFour, ...resultsPageFive]
  res.send(gg)
  }
  //  gg =  gg.map(e =>{
  //     return{
  //         id: e.id,
  //         name: e.name,
  //         image: e.background_image,
  //         genres: e.genres.map(e =>e.name),
  //         rating: e.rating,
  //         platforms: e.platforms.map(e => e.platform.name),
  //         releaseDate: e.released
  //  }})
  // }
    

// }catch(error) {
//   console.log(error)
// }
// finally {
//   return gg
//  }
// };

    /// GET VIDEOGAMES 20-100
// const gameList = async (req, res) => {
//   try {
//     const dataKey = await axios.get(keyId);
//     const dataInfo = dataKey.data.results.map((el) => {
//       let game = {
//         id: el.id,
//         description: el.description,
//         name: el.name,
//         releaseDate: el.release,
//         image: el.background_image,
//         rating: el.rating,
//         genre: el.genres.map((el) => el.name),
//         platforms: el.platforms.map((el) => el.platform.name),
//       };
//       return game;
//     });
//     return res.json(dataInfo);
//   } catch (error) {
//     console.log("404" + error);
//   }
// };

/// GET GENRES
const  getGenre =  async (_req, res) =>  {
  const getGenres = await axios.get(`https://api.rawg.io/api/genres?key=${keyId}`).catch((error) => {
    return res.status(500).send(error);
  });
    let genres = await getGenres.data.results.map(el => el.name );
    console.log(genres) 
    for(let item of genres) {
      await Genre.create({name: item})
    }
  res.json(genres)
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

module.exports = { getApiInfo100, getGenre, getVideogameById, getNamesGames };
