import React from 'react'
import styles from './SearchBar.module.css'

export default function Spinner() {
    return (
        <div>
            <div className={styles.spinnerCont}>
                   <div className={styles.spinner}></div>
                </div>
        </div>
    )
}
