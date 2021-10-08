import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, filterVideogamesByStatus, filterCreated  } from '../../Actions/Actions';
import { Link } from 'react-router-dom';
import Card from '../Card'
import Paginado from '../Paginado';

export default function Home() {

  const dispatch = useDispatch()
  const allVideogames = useSelector ((state) => state.videogames)
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(10)
  const indexOfLastVideogame = currentPage * videogamesPerPage // 15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }

  useEffect (()=>{
      dispatch(getVideogames());
  },[dispatch])

  function handleClick(e){
      e.preventDefault();
      dispatch(getVideogames());
  }

  function handleFilterStatus(e) {
      dispatch(filterVideogamesByStatus(e.target.value))
  }

  function handleFilterCreated(e) {
      dispatch(filterCreated(e.target.value))
  } 

 return (
     <div>
<Link to= '/videogame'> Crear Videojuego </Link>
<h1>Welcome to Videogames</h1>
<button onClick={e=> {handleClick(e)}}>
    Reload all the videogames
</button>
<div>
    <select>
        <option value= 'asc'>Ascendente</option>
        <option value= 'desc'>Descendente</option>
    </select>
    <select onChange={e => handleFilterStatus(e)}>
        <option value='All'> Genres... </option>
    </select>
    <select  onChange={e => handleFilterStatus(e)}> 
        <option value='All'>Todos</option>
        <option value='created'>Creados</option>
        <option value='api'>Existentes</option>
        </select>
    <Paginado
    videogamesPerPage= {videogamesPerPage}
    allVideogames={allVideogames.length}
    paginado = {paginado}
    />
    {currentVideogames?.map((c, index) =>{
        return(
            <div key={index}>
                <Link to={'/home/' + c.id}>
                    <Card name={c.name} image={c.image} genre={c.genre} />
                </Link>
            </div>
        )
    })
}
</div>
     </div>
 )

}