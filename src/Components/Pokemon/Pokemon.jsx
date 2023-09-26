import { Link } from 'react-router-dom'
import './Pokemon.css'

import React from 'react'

const Pokemon = ({name,image,id}) => {
  return (
    <div className='pokemon'>
      <Link to={`/pokemon/${id}`}>
       <div className='pokemon-name'>{name}</div>
       <div><img className='pokemon-img' src={image}  /></div>
       </Link>
    </div>
  )
}

export default Pokemon