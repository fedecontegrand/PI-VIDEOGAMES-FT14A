import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres, setFilter } from '../actions';
import styles from './Filter.module.css'

export default function Filter() {

    const genres=useSelector((state)=>state.allGenres)
    const filters=useSelector(state=>state.filters)
    const dispatch=useDispatch()

    const [state,setState]=useState({
        source:filters.source,
        genres:filters.genres,
        order:filters.order
    })

    useEffect(() => {
     dispatch(getAllGenres())
    },[dispatch]);


    const handleChange=e=>{
        setState({...state,[e.target.name]:e.target.value});
        dispatch(setFilter({...state,[e.target.name]:e.target.value}))
    }
  
    
    let key=1
    return (
        <div className={styles.filterDiv}>

           <form className={styles.sasa}>

            <div className={styles.filtersDiv}>
            <span >
                Filter by
            </span>

            <div>
            <label>Source</label>
            <select  onChange={handleChange} name="source" value={filters.source}>
                <option value="any">ANY</option>
                <option value="database">Database</option>
                <option value="api">Rawg's Api</option>
            </select>
            </div>

            <div>
            <label>Genre</label>
            <select onChange={handleChange}  name="genres" value={filters.genres}>
            <option  value="any" >ANY</option>
            {Array.isArray(genres) && genres.length ? genres?.map(genre=>(
            <option key={key++} value={genre.name} >{genre.name}</option>
            )):null}
            </select>
            </div>
            </div>

            <div className={styles.orderDiv}>
                
            <span >
                Order by
            </span>
            <select onChange={handleChange}   name="order" value={filters.order}>
             <option value="select">SELECT</option>
             <option value="name" >A-Z</option>
             <option value="-name" >Z-A</option>
             <option value="-rating" >Rating &#8595;</option>
             <option value="rating" >Rating &#8593;</option>
            </select>

            </div>
            </form>
        </div>
    )
}
