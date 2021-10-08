import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        console.log('este es el get', getVideogames)
        return dispatch({
        type: 'GET_VIDEOGAMES',
        payload: json.data
        })
    }
}

export function filterVideogamesByStatus(payload) {
    return {
        type: 'FILTER_BY_VALUE',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}