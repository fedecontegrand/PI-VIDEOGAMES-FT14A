import React from 'react'
import styles from './NavBar.module.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearchedGames, setFiltersAndOrders, setSearch } from '../actions'
import SearchBar from './SearchBar'

export default function NavBar(props) {

    const isSearching=useSelector(state=>state.isSearching)
    
    const dispatch=useDispatch()
    const handleClick=e=>{
        dispatch(clearSearchedGames())
        dispatch(setFiltersAndOrders({user:"All",genres:"Any",alphOrder:"Select",ratingOrder:"Select"}))
        if(isSearching!==0) dispatch(setSearch(false))
    }
    
    return (
        <div>
            <nav className={styles.nav}>
               <span onClick={handleClick} className={styles.firstLink} >
                    <Link to="/videogames"className={styles.home} >🎮 Videogames App</Link>
                </span>
            
               <span className={styles.firstLink}>
                   <Link to="/addGame" className={styles.addGame}> Add Game &#128204;</Link>
                </span>
            </nav>
        </div>
    )
}
