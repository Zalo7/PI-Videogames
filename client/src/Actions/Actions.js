import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    console.log("este es el get", getVideogames);
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function() {
    try {
     let response = await axios.post("http://localhost:3001/newVideogame",payload);
    return response;
  } catch (err) {
    return {
      error: 'Cant Create Videogame',
      theError: err
    }
   }
  }
}

export function setGame(payload) {
  return {
    type: "SET_GAME",
    payload,
  };
}

export function getGame(payload) {
  return {
    type: "GET_GAME",
    payload,
  };
}

export function filterVideogamesByStatus(payload) {
  return {
    type: "FILTER_BY_VALUE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function getNameVideogames(name) {
  return async function(dispatch) {
      try {
          let response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
          return dispatch({
              type: 'GET_NAME_VIDEOGAME',
              payload: response.data
          })
      } catch (err) {
          return {
              error: "Can't Get Videogames Names",
              theError: err
          }
      }
  }
};

export function getGenres() {
  return async function (dispatch) {
    try {
    let json = await axios.get(`http://localhost:3001/genre/genre`);
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  } catch(error){
    console.log(error)
  }
 }
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("https://api.rawg.io/api/games/?key=621e1885219145a89116d1b93ec70920" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
