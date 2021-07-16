import React from 'react'
import styles from './lp.module.css'


export default function LandingPage(props) {
    return (    
        <div className={styles.lp}>
            <div className={styles.divTitle} >
            <h1 className={styles.title}>Welcome to my Videogame App &#127918;</h1>               
            </div>
            <div className={styles.divButton}>
            <button className={styles.button} onClick={()=>props.history.push("/videogames")}><span>Start  🚀</span></button>
            </div>
        </div>            
    )
}
