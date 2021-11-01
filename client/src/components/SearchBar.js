import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllGames, clearSearchedGames, getSearchedGames ,resetAll,setSearch} from '../actions';
import styles from './SearchBar.module.css'
import Filter from './Filter';
import { useHistory } from 'react-router';

export default function SearchBar() {

    const dispatch=useDispatch()   
    const [searchedGame,setSearchedGame]=useState("")
    const history=useHistory()
    
    const isSearching=useSelector(state=>state.isSearching)
    

    const handleSubmit=e=>{
        e.preventDefault();
        dispatch(resetAll()) // reset filters,orders,searched games
        dispatch(setSearch(true))
       dispatch(clearAllGames()) 
        history.push(`/videogames/${searchedGame}`)
    }

    const handleChange=e=>{
        setSearchedGame(e.target.value)
    }

    useEffect(()=>{
        if(!isSearching)setSearchedGame("")
    },[isSearching])


    return (
        <div className={styles.searchBar}>
        <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Search your game..." onChange={handleChange} className={styles.input} value={searchedGame}/>
        <button type="submit" className={styles.button} >Search</button>     
        </form>
        
          
        </div>
    )
}
