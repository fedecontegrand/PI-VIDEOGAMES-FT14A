import React from 'react'
import styles from './lp.module.css'


export default function LandingPage() {
    return (
        <div className={styles.lp}>
            <div>
            <h1 className={styles.title}>Welcome to my Videogame App &#127918;</h1>               
            </div>
            <button className={styles.button} >Start</button>
        </div>
    )
}
