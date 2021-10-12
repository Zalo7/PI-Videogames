const initialState = {
  videogames: [],
  allVideogames: [],
  game: [],
  detail: [],
  genres: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "GET_GAME":
      return {
        ...state,
        game: state.allVideogames.filter((e) => e.name.includes(action.payload)),
      };
    case "SET_GAME":
      return {
        ...state,
        game: action.payload,
      };
      case "POST_VIDEOGAME":
      return {
        ...state
      };
      case 'GET_GENRES':
        return {
          ...state,
          genres: action.payload
        }
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
            });
      return {
        ...state,
        videogames: sortedArr,
      };
    case "FILTER_BY_STATUS":
      const allVideogames = state.allVideogames;
      const statusFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((el) => el.status === action.payload);
      return {
        ...state,
        videogames: statusFiltered,
      };
    case "FILTER_CREATED":
      const allVideogames2 = state.allVideogames;
      const createdFilter =
        action.payload === "created"
          ? state.allVideogames.filter((el) => el.createdInDb)
          : state.allVideogames.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogame:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };
      case 'GET_DETAILS':
        return {
          ...state,
          detail: action.payload
        }
    default:
      return state;
  }
}

export default rootReducer;
