import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({game}) {
 
    
    let key=1

        
    return (
        <div className={styles.card}  >
                 <div><img src={game.urlImage} alt="gameImage"/></div>
                 <div>
                <Link to={`/videogame/${game.id}`} style={{ textDecoration: 'none' }}>
                     <h4 className={styles.name}>{game.name} </h4>
                 </Link>
                 {game.rating ? <span>{game.rating} ⭐<br></br></span> : null}
                </div>
                <div>
                     {game.genres.map(genre=><p key={key++} className={styles.genres}>{genre.name}<br></br></p>)}
                 </div>
                  
        </div>
    )
}
