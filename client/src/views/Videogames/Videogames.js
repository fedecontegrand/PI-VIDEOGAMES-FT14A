import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewGame, clearAllGames, clearFiltersAndOrders, clearSearchedGames, getAllGames, getAllGenres, getSearchedGames, setFiltersAndOrders} from '../../actions';
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import styles from './videogames.module.css'
import styles2 from '../LandingPage/lp.module.css'
import Spinner from '../../components/Spinner';
import Card from '../../components/Card'
import filterAndOrder from '../../filterOrderFx';
import Filter from '../../components/Filter';


export default function Videogames() {
    
    const INITIAL_PAGE=0
    const [page,setPage]=useState(INITIAL_PAGE)
    
    const allGames = useSelector((state) =>state.allGames);
    const searchedGames=useSelector(state=>state.searchedGames)
    const filters=useSelector(state=>state.filters)
    const isSearching=useSelector(state=>state.isSearching)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGames());
      }, [dispatch]
      );

    useEffect(()=>{
      setPage(INITIAL_PAGE)
    },[searchedGames,filters])


    const handlePage=e=>{
        if(e.target.name==="next")setPage(allGames[page+20]? page+20 : allGames.length)
        else setPage(allGames[page-20] ? page-20 : 0)
    }
    
    let key=1;

    let result
    if(isSearching) result=searchedGames
    else result=allGames
    
    let filteredAndOrderedGames=filterAndOrder(filters,result)
    let pageGames=filteredAndOrderedGames.slice(page,page+20||filteredAndOrderedGames.length)
    
    
    return (
        <div className={styles.videogames}>
            <NavBar/>
            <SearchBar/>
                        
             {  pageGames.length  ? 
               <div>
               <div className={styles.cards}>
               {pageGames.map(game=><Card game={game} key={key++}/>)}
               </div> 
               <div> 
                <button onClick={handlePage} disabled={!filteredAndOrderedGames[page-1]} name="prev" className={styles2.button} >Prev Page</button>
      
                <span style={{color:"white",fontWeight:"bold",padding:"1rem"}}>{page/20+1}</span>
                  
                <button onClick={handlePage} disabled={!filteredAndOrderedGames[page+20]} name="next" className={styles2.button}>Next Page</button>
               </div>
               </div>
             
             : <Spinner/> 
               
            }        
        </div>
    )
}