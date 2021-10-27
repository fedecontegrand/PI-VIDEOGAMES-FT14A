import { ADD_NEW_GAME, ALL_GAMES, ALL_GENRES,  CLEAR_ALL_GAMES, CLEAR_DETAIL, CLEAR_SEARCHED_GAMES, GAMES_SEARCHED, GAME_DETAIL, RESET, SET_FILTERS, SET_ORDER, SET_SEARCH } from "./actions"


const initialState = {
    allGames: undefined,
    searchedGames: [],
    allGenres:[],
    filters:{source:"any",genres:"any"},
    order:"Select",
    gameDetail:undefined,
    addedGame:{},
    isSearching:false
  }
  
  export default function reducer(state = initialState, { type, payload }) {
    switch (type) {

      case ALL_GAMES: return {
        ...state,
        allGames: payload
      }

      case ALL_GENRES: return {
       ...state,
       allGenres:payload
      }

      case GAMES_SEARCHED:return {
        ...state,
        searchedGames:payload
      }

      case SET_FILTERS: return {
        ...state,
        filters:{
          source:payload.source,
          genres:payload.genres,
        }
      }

      case SET_ORDER: return {
        ...state,
        order:payload
      }

      case SET_SEARCH: return {
        ...state,
        isSearching:payload
      }

      case GAME_DETAIL:return {
        ...state,
        gameDetail:{
          name:payload.name,
          description:payload.description,
          releaseDate:payload.releaseDate,
          rating:payload.rating,
          platforms:payload.platforms,
          urlImage:payload.urlImage,
          genres:payload.genres
        }
      }

      case ADD_NEW_GAME:{
        return {
          ...state,
          addedGame:payload
        }
      }

      case CLEAR_ALL_GAMES:{
        return {
         ...state,
         allGames:undefined
        }
      }

      case CLEAR_SEARCHED_GAMES:{
        return {
          ...state,
          searchedGames:[]
        }
      }

      case RESET:{
        return {
          ...state,
          searchedGames: [],
          filters:{source:"any",genres:"any"},
          order:"Select",
          gameDetail:undefined,
          addedGame:{}
        }
      }

      case CLEAR_DETAIL:{
        return {
          ...state,
          gameDetail:undefined
        }
      }

    //   case "bla bla": return {
    //     ...state,
    //     page: payload
    //   }
      default: return state
    }
  }