import React from 'react'
import styles from './lp.module.css'


export default function LandingPage(props) {
    return (    
        <div className={styles.lp}>
            <div className={styles.divTitle} >
            <h1 className={styles.title}>Welcome to my Videogame App &#127918;</h1>               
            </div>
            <div className={styles.items}>
                <ul>
                    <li>Search between +500,000 videogames !</li><br></br>
                    <li>+50 platforms, 19 genres and over 1,100,000 ratings.</li><br></br>
                    <li>Add your own games to our database.</li>
                </ul>
            </div>
            <div className={styles.divButton}>
            <button className={styles.button} onClick={()=>props.history.push("/videogames")}><span>Start  🚀</span></button>
            </div>
        </div>            
    )
}
