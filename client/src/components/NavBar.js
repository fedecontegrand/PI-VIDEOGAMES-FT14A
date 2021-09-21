import React from 'react'
import styles from './NavBar.module.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllGames, resetAll, setSearch } from '../actions'
import SearchBar from './SearchBar'


export default function NavBar(props) {

    const isSearching=useSelector(state=>state.isSearching)
    
    const dispatch=useDispatch()
    const handleClick=e=>{
        dispatch(resetAll())
        //dispatch(clearAllGames())
        if(isSearching) dispatch(setSearch(false))
    }

    
    
    return (
        <div>
            <nav className={styles.nav}>
               <span onClick={handleClick} className={styles.firstLink} >
                    <Link to="/videogames"className={styles.home} > <img src='https://cdn-icons-png.flaticon.com/512/37/37648.png' alt='sa' /> Videogames App</Link>
                </span>
               <SearchBar/>
               <span className={styles.firstLink}>
                   <Link to="/addGame" className={styles.addGame}> <img src='https://cdn-icons-png.flaticon.com/512/875/875119.png' alt='asa'/>
                    Add Game </Link>
                </span>
            </nav>
        </div>
    )
}
