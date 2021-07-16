import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearDetail, getVideogameDetail } from '../../actions'
import NavBar from '../../components/NavBar'
import Spinner from '../../components/Spinner'
import styles from '../VideogameDetail/VDetail.module.css'
import styles2 from '../../components/Card.module.css'

export default function VideogameDetail({id}) {

    let game=useSelector(state=>state.gameDetail)
    const dispatch=useDispatch()

    useEffect(()=>{
     dispatch(getVideogameDetail(id))
     return function cleanup(){dispatch(clearDetail())}    
    },[dispatch,id])
  
    let key=1
    console.log(game)
    
    return (
        <div>
        <NavBar/>
        {game ?  
            <div className={styles.container}>
            <div className={styles.neu}>   
            <img src={`${game.urlImage}`} alt="gameImg" className={styles.img} />
            <h2 className={styles.title}>{game.name}</h2>
            <span className={styles.releaseDate}>Relesead at <span>{game.releaseDate}</span></span>  
            <span className={styles.rating}>Rating: <span>{game.rating} ⭐</span></span>                               
            <div className={styles.description}>{game.description.replace(/<[^>]+>/g,"")}</div>
                                                       {/* API structure */}                   {/* DB structure */}
            <div className={styles.platforms}>
            {game.platforms.map(platform=><span key={key++}>{platform.platform ? platform.platform.name : platform}</span>)}
            </div>
            <div className={styles.genres}>
            {game.genres.map((genre=><span>{genre.name}</span>))}
            </div>
            </div>
            </div>
            :<Spinner/>}

        </div>
    )
}
