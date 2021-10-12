import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getDetail } from '../Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getDetail(props.match.params.id));     
    }, [dispatch])

    const myVideogame = useSelector ((state)=> state.detail)
}
    // return (
    //     <div>
    //         {
    //             myVideogame.length>0 ?
    //             <div>
    //                 <h1>{myVideogame[0].name}</h1>
    //                 <img src= {myVideogame[0].img? myVideogame[0].img : myVideogame[0].image} />
    //                 <h2>Status: {myVideogame[0].status}</h2>
    //                 <p> </p>
    //     </div>
    //          }
    //        )
    //     }