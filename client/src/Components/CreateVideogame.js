import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'

function validate(input) { //NWY
    let errors= {};
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
    } else if (!input.nickname) {
        errors.nickname = 'Nickname debe ser completado';
    }
    return errors;
};


export default function CreateVideogame() {
    const distpach = useDispatch()
    const genres = useSelector((state) => state.genres)
    const history = useHistory
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        platforms: "",
        image: "",
        createInDb: "",
        genres: []
    })
    useEffect(() => {
    dispatch(getGenre());
}, []);


function handleChange(e) {
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }));
    console.log(input)
}

// function handleCheck(e) {
//     if (e.target.checked) {
//         setInput({
//             ...input,
//             status: e.target.value
//         })
//     }
// }

function handleDelete(e) { //NWY
    setInput({
        ...input,
        genres: input.genres.filter( g => g !== el)
    })
}

function handleSelect(e) {
    setInput({
        ...input,
        genres: [...input.genres, e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault();
    console.log(input)
    dispatch(postVideogame(input))
    alert('Videojuego creado!')
    setInput({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        platforms: "",
        image: "",
        createInDb: "",
        genres: []
    })
    history.push('/home')
}

return (
    <div>
    <Link to= '/home'><button>Volver</button></Link>
    <h1>Crea tu videojuego!</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
        <div>
            <label>Nombre:</label>
            <input
            type="text"
            value={input.name}
            name= "name"
            onChange={(e) => handleChange(e)}
            />
            {errors.name && (
                <p className='error'> {errors.name} </p>
            )}
        </div>
        <div>
            <label>Description:</label>
            <input 
            type='text'
            value={input.description}
            name='description'
            onChange={(e) => handleChange(e)}
            />
        </div>
        <div>
            <label>Release Date:</label>
            <input
            type='text'
            value={input.releaseDate}
            name='releaseDate'
            onChange={(e) => handleChange(e)}
            />
        </div>
        <div>
            <label>Rating:</label>
            <input
            type='text'
            value={input.rating}
            name='rating'
            onChange={(e) => handleChange(e)}
            />
        </div>
        <div>
            <label>Platforms:</label>
            <input
            type='text'
            value={input.platforms}
            name='platforms'
            onChange={(e) => handleChange(e)}
            />
        </div>
        <div>
            <label>Image:</label>
            <input
            type='text'
            value={input.image}
            name='image'
            onChange={(e) => handleChange(e)}
            />
        </div>
       <select onChange={(e) => handleSelect(e)}>?
           {genres.map((g) => {
               <option value ={g.name}> {g.name} </option>
           })}
       </select>
<ul><li>{input.genres.map(el => el + " ,")}</li></ul>
<button type='submit'>Crear Videojuego</button>
    </form>
    {input.genres.map(el =>
    <div className='divOcc'>
     <p>{el}</p>
     <button className='botonX' onClick={()=> handleDelete(el)}>x</button>
    </div>
    )}
    </div>
)
}