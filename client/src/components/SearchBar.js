import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchedGames ,resetAll,setSearch} from '../actions';
import styles from './SearchBar.module.css'
import Filter from './Filter';

export default function SearchBar() {

    const dispatch=useDispatch()   
    const [searchedGame,setSearchedGame]=useState("")
    const isSearching=useSelector(state=>state.isSearching)

    const handleSubmit=e=>{
        e.preventDefault();
        dispatch(resetAll()) // reset filters,orders,searched games
        dispatch(setSearch(true)) 
        dispatch(getSearchedGames(searchedGame))
    }

    const handleChange=e=>{
        setSearchedGame(e.target.value)
    }
    
    // clean the search input when stop searching
    useEffect(()=>{
     if(!isSearching) setSearchedGame("")
    },[isSearching])

    return (
        <div className={styles.searchBar}>
        <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Search your game..." onChange={handleChange} className={styles.input} value={searchedGame}/>
        <button type="submit" className={styles.button} >Search</button>     
        </form>
        <br></br>
         <Filter/>   
        </div>
    )
}
