import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres, setFiltersAndOrders } from '../actions';
import styles from './Filter.module.css'

export default function Filter() {

    const genres=useSelector((state)=>state.allGenres)
    const searchedGames=useSelector(state=>state.searchedGames)
    const dispatch=useDispatch()

    const [state,setState]=useState({
        user:"All",
        genres:"Any",
        alphOrder:"Select",
        ratingOrder:"Select"
    })

    useEffect(() => {
        dispatch(getAllGenres())
    },[dispatch]);

    useEffect(()=>{
        setState({
            user:"All",
            genres:"Any",
            alphOrder:"Select",
            ratingOrder:"Select"
        });
    },[searchedGames]) // reinicio el filtro cada vez que cambia la busqueda

    const handleChange=e=>{
       if(e.target.value!=="Select"){
           setState({...state,[e.target.name]:e.target.value});
           dispatch(setFiltersAndOrders({...state,[e.target.name]:e.target.value}))
        }
    }
  
    
    let key=1
    return (
        <div >

           <form style={{
            display:'flex',
            justifyContent:"space-around",
            backgroundColor:"lightgray",
            borderRadius: "1rem",
            marginBottom:"0.5rem"
            }}>

            <span className={styles.span}>
                Filter by
            </span>

            <label>Who added the game?
            <select value={state.user} onChange={handleChange} name="user">
                <option value="">ANY</option>
                <option value="user">ME</option>
            </select>
            </label>
            
            <label>What genre belongs to?
            <select onChange={handleChange} value={state.genres} name="genres">
            <option  value="Any" >ANY</option>
            {genres.map(genre=>(
            <option key={key++} value={genre.name} >{genre.name}</option>
            ))}
            </select>
            </label>

            <span className={styles.span}>
                Order by
            </span>
            <label>A-Z
            <select onChange={handleChange}  value={state.alphOrder} name="alphOrder">
                    <option value="Select">SELECT</option>
                    <option value="A-Z" >A-Z</option>
                    <option value="Z-A" >Z-A</option>
            </select>
            </label>

            <label>Rating            
            <select  onChange={handleChange} value={state.ratingOrder} name="ratingOrder">
                    <option value="Select">SELECT</option>
                    <option value="desc" >Rating &#8595;</option>
                    <option value="asc" >Rating &#8593;</option>
            </select>
            </label>
           </form>
            
            
        </div>
    )
}
