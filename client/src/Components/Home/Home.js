import React from 'react';
import SearchBar from '../SearchBar';
//importo los hooks que voy a usar de react
import { useState, useEffect } from 'react';
//importo los hooks de react-redux (npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
//importo las actiones que me interesa usar en este componente
import { getVideogames, filterVideogamesByStatus, filterCreated, orderByName  } from '../../Actions/Actions';
import { Link } from 'react-router-dom';
//importo los componentes que voy a usar
import Card from '../Card'
import Paginado from '../Paginado';
//COMIENZA EL COMPONENTE
export default function Home() {

  const dispatch = useDispatch()
  const allVideogames = useSelector ((state) => state.videogames)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1) 
  const [videogamesPerPage, setVideogamesPerPage] = useState(15) 
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

  function handleSort(e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value))
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`)
  }

 return (
     <div>
<Link to= '/videogame'> Crear Videojuego </Link>
<h1>Welcome to Videogames</h1>
<button onClick={e=> {handleClick(e)}}>
    Reload all the videogames
</button>
<div>
    <select onChange={e => handleSort(e)}>
        <option value= 'asc'>Ascendente</option>
        <option value= 'desc'>Descendente</option>
    </select>
    <select onChange={e => handleFilterStatus(e)}>
        <option value='All'> Genres </option> 
    </select>
    <select  onChange={e => handleFilterCreated(e)}>  
        <option value='All'>Todos</option>
        <option value='created'>Creados</option>
        <option value='api'>Existentes</option>
        </select>
    <Paginado
    videogamesPerPage= {videogamesPerPage}
    allVideogames={allVideogames.length}
    paginado = {paginado}
    />
    <SearchBar/>
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