const initialState = {
  videogames: [],
  allVideogames: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
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
          ? state.allVideogames.filter(el => el.createdInDb)
          : state.allVideogames.filter(el => !el.createdInDb);
         return{
             ...state,
             videogame: action.payload === 'All' ? state.allVideogames : createdFilter
         }
    default:
      return state;
  }
}

export default rootReducer;
