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
        dispatch(clearAllGames())
        dispatch(resetAll())
        props.history.push('/videogames')
        }      
    }

    let key=1  

    return (
        <div className={styles.all}>
            <NavBar/>
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
                 <div><label>PC </label><input type="checkbox" value="PC" onClick={handleSelections} name="platforms"/></div>
                 <div><label>PlayStation 5</label><input type="checkbox" value="PlayStation 5" onClick={handleSelections} name="platforms"/></div>
                 <div><label>Xbox Serie X</label><input type="checkbox" value="Xbox Serie X" onClick={handleSelections} name="platforms"/></div>
                 <div><label>PlayStation 4</label><input type="checkbox" value="PlayStation 4" onClick={handleSelections} name="platforms"/></div>
                 <div><label>Xbox One</label><input type="checkbox" value="Xbox One" onClick={handleSelections} name="platforms"/></div>
                 <div><label>PlayStation 3</label><input type="checkbox" value="PlayStation 3" onClick={handleSelections} name="platforms"/></div>
                 <div><label>Xbox 360 </label><input type="checkbox" value="Xbox 360" onClick={handleSelections} name="platforms"/></div>
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
