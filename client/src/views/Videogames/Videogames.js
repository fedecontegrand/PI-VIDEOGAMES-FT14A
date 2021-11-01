import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  clearAllGames, getAllGames } from '../../actions';
import styles from './videogames.module.css'
import styles2 from '../LandingPage/lp.module.css'
import Spinner from '../../components/Spinner';
import Card from '../../components/Card'



export default function Videogames() {
    
    const INITIAL_PAGE=0
    const [page,setPage]=useState(INITIAL_PAGE)
    
    const allGames = useSelector((state) =>state.allGames);
    const filters=useSelector(state=>state.filters)
    const [failSearch,setFailSearch]=useState(false)

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAllGames())
        dispatch(getAllGames(filters));
        return ()=>{
          dispatch(clearAllGames())
        } 
      }, [dispatch,filters]
    );

    useEffect(()=>{
      if(allGames==="No games found"){
        setFailSearch(true)
      }
    },[allGames])


    useEffect(()=>{
      setPage(INITIAL_PAGE)        //reset pagination every time filter/order/search change
    },[filters])

    
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

    if(Array.isArray(allGames) && page===0) {
      result=allGames.slice(0,20)
    }
    else if(Array.isArray(allGames) && page===20){
      result=allGames.slice(-20)
    }
    

    return (
        <div className={styles.videogames}>
                        
             {  allGames && Array.isArray(allGames) ?// case games found
               <div>
               <div className={styles.cards}>
               { result.map(game=><Card game={game} key={key++}/>)}
               </div> 
               <div> 
                <button onClick={handlePage} disabled={page===0} name="prev" className={styles2.button} >Prev Page</button>
      
                <span style={{color:"white",fontWeight:"bold",padding:"1rem"}}>{page/20+1}</span>
                  
                <button onClick={handlePage} disabled={page===20} name="next" className={styles2.button}>Next Page</button>
               </div>
               </div>

             : allGames===undefined ? <Spinner/>
             : failSearch ? (<div className={styles.emptyResult}>
               <h2 className={styles.h2}>No game satisfies the specified conditions.</h2>
               </div>) :null
            }        
        </div>
    )
}