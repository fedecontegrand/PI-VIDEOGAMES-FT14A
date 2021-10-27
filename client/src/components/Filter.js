import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres, setFilter, setOrder } from '../actions';
import styles from './Filter.module.css'

export default function Filter() {

    const genres=useSelector((state)=>state.allGenres)
    const filters=useSelector(state=>state.filters)
    const order=useSelector(state=>state.order)
    const dispatch=useDispatch()

    const [state,setState]=useState({
        source:filters.source,
        genres:filters.genres,
        order:order
    })

    useEffect(() => {
     dispatch(getAllGenres())
    },[dispatch]);


    const handleChange=e=>{
       if(e.target.value!=="Select"){
           if(e.target.name!=="order"){
               setState({...state,[e.target.name]:e.target.value});
               dispatch(setFilter({...state,[e.target.name]:e.target.value}))
           }
           else {
               setState({...state,order:e.target.value})
               dispatch(setOrder(e.target.value)) 
            }
        }
    }
  
    
    let key=1
    return (
        <div className={styles.filterDiv}>

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

            <label className={styles.label}>Who added the game?
            <select  onChange={handleChange} name="source" value={filters.source}>
                <option value="any">ANY</option>
                <option value="database">Database</option>
                <option value="api">Rawg's Api</option>
            </select>
            </label>
            
            <label className={styles.label}>What genre belongs to?
            <select onChange={handleChange}  name="genres" value={filters.genres}>
            <option  value="any" >ANY</option>
            {genres.map(genre=>(
            <option key={key++} value={genre.name} >{genre.name}</option>
            ))}
            </select>
            </label>

            <span className={styles.span}>
                Order by
                <select onChange={handleChange}   name="order" value={order}>
                <option value="Select">SELECT</option>
                <option value="A-Z" >A-Z</option>
                <option value="Z-A" >Z-A</option>
                <option value="desc" >Rating &#8595;</option>
                <option value="asc" >Rating &#8593;</option>
            </select>
            </span>
           </form>  
        </div>
    )
}
