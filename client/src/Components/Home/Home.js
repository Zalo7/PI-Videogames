import React from 'react';
import SearchBar from '../SearchBar';
import './Home.css';
//importo los hooks que voy a usar de react
import { useState, useEffect } from 'react';
//importo los hooks de react-redux (npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
//importo las actiones que me interesa usar en este componente
import { getVideogames, getNameVideogames, getGenres,filterVideogamesByStatus, filterCreated, orderByName  } from '../../Actions/Actions';
import { Link } from 'react-router-dom';
//importo los componentes que voy a usar
import Card from '../Card'
import Paginado from '../Paginado';
//COMIENZA EL COMPONENTE
export default function Home() {

  const dispatch = useDispatch()
  const allVideogames = useSelector ((state) => state.videogames)
  const genres = useSelector((state) => state.genres)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1) 
  const [videogamesPerPage, setVideogamesPerPage] = useState(15) 
  const indexOfLastVideogame = currentPage * videogamesPerPage // 15 
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0 
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) 
  console.log('this is the current', currentVideogames, 'this is the current')
  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }

  useEffect (()=>{
      dispatch(getVideogames())
      dispatch(getGenres())
  },[dispatch])

  function handleClick(e){
      e.preventDefault();
      dispatch(getVideogames());
  }

  function handleFilterStatus(e) {
      dispatch(filterVideogamesByStatus(e.target.value))
  }

//   function handleFilterGenres(e) {
//       dispatch(filterVideogameByGenres)
//   }

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
     <div className="Home">
<Link to= '/videogame'> Crear Videojuego </Link>
<h1>Welcome to Videogames</h1>
<button onClick={e=> {handleClick(e)}}>
    Reload all the videogames
</button>
<div>
    <select onChange={e => handleSort(e)}>
        <option value= 'asc'>A-Z</option>
        <option value= 'desc'>Z-A</option>
    </select>
    <select className='genres' onChange={getGenres} defaultValue=''>  
    <option selected='false' disabled>Genres</option>
       {genres.map((e) => (<option style={{color: 'red'}} key={e.id} value={e.name}>{e.name}</option>))}
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
    {currentVideogames?.map((c, i) =>{
        return(
            <div key={i}>
                <Link to={'/home/' + c.id}>
                    <Card name={c.name} background_image={c.background_image} genre={c.genre} />
                </Link>
            </div>
        )
    })
}

</div>
     </div>
 )
 
}