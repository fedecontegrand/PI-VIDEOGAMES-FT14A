import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewGame, clearAllGames, clearFiltersAndOrders, getAllGames, getAllGenres, resetAll, setFiltersAndOrders } from '../../actions'
import NavBar from '../../components/NavBar'
import Spinner from '../../components/Spinner'
import styles from './AddGame.module.css'
import styles2 from '../LandingPage/lp.module.css'
import validate from './validateFx'


export default function AddGame(props) {

    const allGenres=useSelector(state=>state.allGenres)
    const [state,setState]=useState({
        name:"",
        description:"",
        rating:undefined,
        releseDate:undefined,
        genres:[],
        platforms:[]
    })

    const dispatch=useDispatch()

    
    useEffect(() => {
        dispatch(getAllGenres())
    },[dispatch])

    
    const handleChange=e=>{
      setState({...state,[e.target.name]:e.target.value})
    }

    const handleSelections=e=>{

        // platform selectors
        if(e.target.name==="platforms"){
           if(state.platforms.includes(e.target.value)){
            let oldPlatforms=state.platforms
            let newPlatforms=oldPlatforms.filter(platform=>platform!==e.target.value)
            setState({...state,platforms:newPlatforms})
         }else {
            let platforms=state.platforms
            platforms.push(e.target.value)
            setState({...state,platforms:platforms})
         } 
        }
         // genre selectors
        else {
          if(state.genres.includes(e.target.value)){
              let oldGenres=state.genres
              let newGenres=oldGenres.filter(genre=>genre!==e.target.value)
              setState({...state,genres:newGenres})
          } else {
              let newGenres=state.genres
              newGenres.push(e.target.value)
              setState({...state,genres:newGenres})
          }
        }        
    }
        
    const handleSubmit=e=>{
        e.preventDefault()
        if(validate(state)){
        dispatch(addNewGame(state))
        setState({
            name:"",
            description:"",
            rating:undefined,
            releseDate:undefined,
            genres:[],
            platforms:[]
        })
        alert("Your game was added successfully!")  
        dispatch(resetAll())
        dispatch(clearAllGames())
        props.history.push('/videogames')
        }      
    }

    let key=1  

    const allPlatforms=['PC','PlayStation 5','Xbox Serie X','PlayStation 4','Xbox One','PlayStation 3', 'Xbox 360',
                        'Nintendo Switch', 'PlayStation 2', 'PlayStation', 'PS Vita','Nintento Wii', 'PSP','GameCube',
                    'Nintendo 64','Game Boy','Atari 7800', 'Genesis','Sega']

    return (
        <div className={styles.all}>
            { allGenres  ? 
            <div className={styles.container}>
             <div className={styles.addGame}>
             <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.name}>Name *</label> 
                <input type="text" name="name" onChange={handleChange} className={styles.inputName}/>
                <label className={styles.description}>Description *</label> 
                <textarea type="text" name="description" onChange={handleChange} className={styles.inputDescription}/>
                 
                <label>URL of Image</label> <input type="url" name="urlImage" onChange={handleChange}/>
                <label>Release Date</label> <input type="date" name="releaseDate" onChange={handleChange}/>
                <label>Rating</label><input type="number" min={0} max={5} name="rating" onChange={handleChange} className={styles.inputRating}/>
                <div className={styles.divGenres}>
                <label>What genres belongs to? *</label>
                <br></br>
                <div className={styles.genres}>{allGenres.map(genre=>
                <div><label>{genre.name}</label><input type="checkbox" value={genre.name} name="genres" key={key++} onClick={handleSelections}/></div>)}  
                </div>         
        
                </div>
                <div className={styles.divPlatforms}>
                <label >Platforms *</label>
                <br></br>
                <div className={styles.platforms}>
                 {allPlatforms.map(platform=>
                    <div key={platform}>
                        <label>{platform}</label><input type="checkbox" value={platform} onClick={handleSelections} name="platforms"/>
                    </div>)}
                </div>
                </div>
                <div className={styles.buttonDiv}>
                <button className={styles2.button} type="submit" onClick={handleSubmit}>Add Game</button>
                </div>
            </form>
            </div>
            </div>
            : <Spinner/>
            }            
        </div>
    )
}
