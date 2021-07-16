import axios from "axios";

export const ALL_GAMES = "ALL_GAMES"
export const ALL_GENRES="ALL_GENRES"
export const ALL_PLATFORMS="ALL_PLATFORMS"
export const GAMES_SEARCHED="GAMES_SEARCHED"
export const FILTERS_AND_ORDERS="FILTERS_AND_ORDERS"
export const GAME_DETAIL="GAME_DETAIL"
export const CLEAR_DETAIL="CLEAR_DETAIL"
export const CLEAR_ALL_GAMES="CLEAR_HOME"
export const CLEAR_SEARCHED_GAMES="CLEAR_SEARCHED_GAMES"
export const CLEAR_FILTERS_AND_ORDERS="CLEAR_FILTERS_AND_ORDERS"
export const SET_SEARCH="SET_SEARCH"
export const ADD_NEW_GAME="ADD_NEW_GAME"

export function getAllGames() {
  return (dispatch) => {
    axios.get('http://localhost:3001/videogames').then((response) => {
      dispatch({ type: ALL_GAMES, payload: response.data });
    });
  }
}

export  function getAllGenres(){
  return (dispatch) => {
    axios.get('http://localhost:3001/genres')
        .then(response => {
            dispatch({type: ALL_GENRES, payload: response.data})
        })
  }
}

export function getSearchedGames(payload){
  return (dispatch) => {
    axios.get(`http://localhost:3001/videogames?name=${payload}`)
        .then(response => {
            dispatch({type: GAMES_SEARCHED, payload: response.data})
        })
  }
}

export function setFiltersAndOrders(payload){
  return {
    type:FILTERS_AND_ORDERS,
    payload
  }
}

export function getVideogameDetail(payload){
  return (dispatch) => {
    axios.get(`http://localhost:3001/videogame/${payload}`)
        .then(response => {
            dispatch({type: GAME_DETAIL, payload: response.data})
        })
  }
}

export function clearDetail(){
  return {
    type:CLEAR_DETAIL,
    payload:undefined
  }
}

export function clearAllGames(){
  return {
    type:CLEAR_ALL_GAMES,
    payload:undefined
  }
}

export function clearSearchedGames(){
  return {
    type:CLEAR_SEARCHED_GAMES,
    payload:undefined
  }
}

export function setSearch(payload){
  return {
    type:SET_SEARCH,
    payload:payload
  }
}

export function addNewGame(payload){
  return (dispatch)=>
  axios.post('http://localhost:3001/videogame/',payload)
  .then(response=>{
    dispatch({type:ADD_NEW_GAME,payload:response.data})
  })
}

export function clearFiltersAndOrders(){
  return {
    type:CLEAR_FILTERS_AND_ORDERS,
    payload:undefined
  }
}

// export function getPage(urlTitle) {
//   return (dispatch) => {
//     axios.get(`/api/pages/${urlTitle}`)
//       .then((response) => {
//         dispatch({ type: SET_PAGE, payload: response.data })
//       })
//       .catch(error => {
//         if (error.response?.status) {
//           if (error.response.status === 404) {
//             return dispatch({ type: SET_PAGE, payload: null })
//           }
//         }
//         alert("Ups!!! 😥")
//       })
//   }
// }

// export function clearPage() {
//   return { type: SET_PAGE, payload: undefined }
// }