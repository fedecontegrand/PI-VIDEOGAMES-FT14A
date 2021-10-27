import React from 'react'
import styles from './NavBar.module.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllGames, resetAll, setSearch } from '../actions'
import SearchBar from './SearchBar'
import { useHistory } from 'react-router'


export default function NavBar(props) {

    const isSearching=useSelector(state=>state.isSearching)

    const history=useHistory();

    const dispatch=useDispatch()
    const handleClick=e=>{
        dispatch(resetAll())
        //dispatch(clearAllGames())
        if(isSearching) dispatch(setSearch(false))
    }

    const onClickAddPage=(e)=>{
       history.push("/addGame")
    }
    const onClickHomePage=(e)=>{
       history.push("/videogames")
    }
    
    return (
        <div>
            <nav className={styles.nav}>
               <div onClick={onClickHomePage} className={styles.firstLink} >
                     <img src='https://cdn-icons-png.flaticon.com/512/37/37648.png' alt='sa' />
                     <span>Videogames App</span>
                </div>
               <SearchBar/>
               <div className={styles.firstLink} onClick={onClickAddPage} style={{display:"flex",justifyContent:"left"}}>
                    <img src='https://cdn-icons-png.flaticon.com/512/875/875119.png' alt='asa'/>
                   <span>Add Game</span>
                </div>
            </nav>
        </div>
    )
}
