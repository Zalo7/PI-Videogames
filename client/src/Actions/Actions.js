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

export function getGenre() {
  //NWY
  return async function (dispatch) {
    var info = await axios("http://localhost:3001/genre", {});
    return dispatch({ type: "GET_GENRES", payload: info.data });
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/newVideogame",
      payload
    );
    console.log(response);
    return response;
  };
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

export function getNameVideogames(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames?search={game}" + payload
      );
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
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

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genre");
    console.log("este es el get", getGenres);
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
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
