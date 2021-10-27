import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  clearAllGames, getAllGames } from '../../actions';
import styles from './videogames.module.css'
import styles2 from '../LandingPage/lp.module.css'
import Spinner from '../../components/Spinner';
import Card from '../../components/Card'
import filterAndOrder from '../../filterOrderFx';
import SearchBar from '../../components/SearchBar';
import NavBar from '../../components/NavBar';
import Filter from '../../components/Filter';



export default function Videogames() {
    
    const INITIAL_PAGE=0
    const [page,setPage]=useState(INITIAL_PAGE)
    
    const allGames = useSelector((state) =>state.allGames);
    const filters=useSelector(state=>state.filters)
    const order=useSelector(state=>state.order)

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAllGames())
        dispatch(getAllGames(page/20+1,filters));
        return ()=>{
          dispatch(clearAllGames())
        } 
      }, [dispatch,page,filters]
    );


    useEffect(()=>{
      setPage(INITIAL_PAGE)        //reset pagination every time filter/order/search change
    },[filters,order])

    
    const handlePage=e=>{
        if(e.target.name==="next")setPage((page)=>page+20)
        else setPage((page)=>page-20)
        window.scroll({
          top: 0,
          left: 100,
          behavior: 'smooth'
        });
    }
    
    let key=1;

    let result
    result=allGames 
    

    if(Array.isArray(result)){  // filter,order and pagination functions for games
    var pageGames=result
    } 
  
    return (
        <div className={styles.videogames}>
                        
             {  pageGames && pageGames[0]   ? // case games found
               <div>
               <div className={styles.cards}>
               { pageGames.map(game=><Card game={game} key={key++}/>)}
               </div> 
               <div> 
                <button onClick={handlePage} disabled={page===0} name="prev" className={styles2.button} >Prev Page</button>
      
                <span style={{color:"white",fontWeight:"bold",padding:"1rem"}}>{page/20+1}</span>
                  
                <button onClick={handlePage} disabled={page>4*20} name="next" className={styles2.button}>Next Page</button>
               </div>
               </div>

             : Array.isArray(pageGames) && !pageGames[0] ? 
             <div className={styles.emptyResult}>
               <h2 className={styles.h2}>No game satisfies the specified conditions.</h2>
               </div> // case filter returns empty array
             :<Spinner/> // case games not found
            }        
        </div>
    )
}