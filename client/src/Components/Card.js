import React from "react";

export default function Card({ name, background_image, genre }) {
    return(
    <div> 
        <h3>{name}</h3>
        {genre}
        <img src={background_image}  width="150px" alt='img not found' />
    </div>
    )
}