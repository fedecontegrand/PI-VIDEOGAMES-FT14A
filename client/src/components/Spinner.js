import React from 'react'
import styles from './SearchBar.module.css' //spinner styles are there for simplicity

export default function Spinner() {

    return (
        <div className={styles.spinnerDiv}>
            <div className={styles.spinnerCont}>
                   <div className={styles.spinner}></div>
                </div>
        </div>
    )    
}
