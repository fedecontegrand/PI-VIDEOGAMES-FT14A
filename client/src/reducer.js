import { ADD_NEW_GAME, ALL_GAMES, ALL_GENRES,  CLEAR_ALL_GAMES, CLEAR_DETAIL, CLEAR_FILTERS_AND_ORDERS, CLEAR_SEARCHED_GAMES, FILTERS_AND_ORDERS, GAMES_SEARCHED, GAME_DETAIL, SET_SEARCH } from "./actions"


const initialState = {
    allGames: [],
    searchedGames: [],
    allGenres:[],
    filters:{user:"All",genres:"Any",alphOrder:"Select",ratingOrder:"Select"},
    gameDetail:undefined,
    isSearching:false,
    allPlatforms:[],
    addedGame:{}
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

      case FILTERS_AND_ORDERS: return {
        ...state,
        filters:{
          user:payload.user,
          genres:payload.genres,
          alphOrder:payload.alphOrder,
          ratingOrder:payload.ratingOrder
        }
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

      case CLEAR_DETAIL:{
        return {
          ...state,
          gameDetail:undefined
        }
      }

      case SET_SEARCH:{    
        return {
          ...state,
          isSearching:payload
        }   
      }

      case CLEAR_SEARCHED_GAMES:{
        return {
         ...state,
         searchedGames:[]
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
         allGames:[]
        }
      }

      case CLEAR_FILTERS_AND_ORDERS:{
        return {
          ...state,
          filters:{user:"All",genres:"Any",alphOrder:"Select",ratingOrder:"Select"}
        }
      }

    //   case "bla bla": return {
    //     ...state,
    //     page: payload
    //   }
      default: return state
    }
  }