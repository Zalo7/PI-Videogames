import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getGame, getNameVideogames, setGame } from '../Actions/Actions';
import '../Components/Home/Home.css';

export default function SearchBar() { //NWY
    const dispatch = useDispatch()
    const game = useSelector( state => state.game)


function handleInputChange(e) {
    e.preventDefault()
    setGame(e.target.value)
    console.log(game)
}

function handleSubmit(e) {
    e.preventDefault()
    dispatch(getGame(game))
}

return(
    <div className='SearchBar'>
        <input
        type = 'text'
        placeholder = 'Buscar...'
        onChange = {(e) => handleInputChange(e)}
        />
        <button onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
)
}