import React from 'react'
import styles from './NavBar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllGames, setSearch } from '../actions'
import SearchBar from './SearchBar'
import { useHistory } from 'react-router'


export default function NavBar(props) {

    const history=useHistory();

    const dispatch=useDispatch()

    const onClickAddPage=(e)=>{
       history.push("/addGame")
    }
    const onClickHomePage=(e)=>{
       dispatch(clearAllGames())
       dispatch(setSearch(false))
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
