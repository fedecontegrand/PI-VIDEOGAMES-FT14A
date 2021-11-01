import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({game}) {

    const history=useHistory()
    const handleClick=e=>{
        history.push(`/videogame/${game.id}`)
    }
    let key=1

        
    return (
        <div className={styles.card}  >
                <img src={game.urlImage} alt="gameImage"/>
                <h4 className={styles.name} onClick={handleClick}>{game.name} </h4>
                {game.rating ? <span className={styles.rating}>{game.rating} ⭐</span> : null}
                <div className={styles.genresDiv}>
                     {game.genres.map(genre=><p key={key++} className={styles.genres}>{ genre.name}<br></br></p>)}
                 </div>
                  
        </div>
    )
}
