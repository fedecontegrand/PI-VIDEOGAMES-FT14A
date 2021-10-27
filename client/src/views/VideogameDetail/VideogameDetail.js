import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearDetail, getVideogameDetail } from '../../actions'
import NavBar from '../../components/NavBar'
import Spinner from '../../components/Spinner'
import styles from '../VideogameDetail/VDetail.module.css'



export default function VideogameDetail({id}) {

    let game=useSelector(state=>state.gameDetail)
    const dispatch=useDispatch()

    useEffect(()=>{
     dispatch(getVideogameDetail(id))
     return function cleanup(){dispatch(clearDetail())}   
    },[dispatch,id])
  
    let key=1
    let key2=1000

    window.scroll({
        top: 0,
        left: 100,
        behavior: 'smooth'
      });
    
    return (
        <div className={styles.bigContainer}>
        {game ?  
            <div className={styles.container}>
            <div className={styles.neu}>   
            <img src={`${game.urlImage}`} alt="gameImg" className={styles.img} />
            <h2 className={styles.title}>{game.name}</h2>
            <span className={styles.releaseDate}>Released at <span>{game.releaseDate || "Unknown"}</span></span>  
            <span className={styles.rating}>Rating <span>{game.rating || "Unknown" } ⭐ </span></span>                               
            <div className={styles.description}>{game.description.replace(/<[^>]+>/g,"")}</div>
                                                                        
            <div className={styles.platforms}>     {/* API structure */}                          {/* DB structure */}
            {game.platforms.map(platform=><span key={key++}>{platform.platform ? platform.platform.name : platform}</span>)}
            </div>
            <div className={styles.genres}>
            {game.genres.map((genre=><span key={key2++}>{genre.name}</span>))}
            </div>
            </div>
            </div>
            :<Spinner/>}

        </div>
    )
}
