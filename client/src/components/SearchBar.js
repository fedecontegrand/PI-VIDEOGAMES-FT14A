import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearchedGames, getSearchedGames ,setFiltersAndOrders,setSearch} from '../actions';
import styles from './SearchBar.module.css'
import Filter from './Filter';

export default function SearchBar() {

    const dispatch=useDispatch()   
    const [searchedGame,setSearchedGame]=useState("")
    const isSearching=useSelector(state=>state.isSearching)

    const handleSubmit=e=>{
        e.preventDefault();
        dispatch(setFiltersAndOrders({user:"All",genres:"Any",alphOrder:"Select",ratingOrder:"Select"}))
        dispatch(setSearch(true))
        dispatch(clearSearchedGames())
        dispatch(getSearchedGames(searchedGame))
    }

    const handleChange=e=>{
        setSearchedGame(e.target.value)
    }
    
    const input=useRef(null)

    // clean input when stop searching

    return (
        <div className={styles.searchBar}>
        <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Search your game..."  name="name" onChange={handleChange} className={styles.input} ref={input}/>
        <button type="submit" className={styles.button} >Search</button>     
        </form>
        <br></br>
         <Filter/>   
        </div>
    )
}
