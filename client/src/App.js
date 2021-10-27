
import './App.css';
import {Route,Switch} from 'react-router-dom'
import LandingPage from './views/LandingPage/LandingPage';
import Videogames from './views/Videogames/Videogames';
import VideogameDetail from './views/VideogameDetail/VideogameDetail';
import AddGame from './views/AddGame/AddGame';
import NavBar from './components/NavBar';
import Filter from "./components/Filter"
import Search from './views/Search/Search';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route>
          <NavBar/>
            <Route exact path="/addGame" component={AddGame} /> 
            <Route exact path="/videogame/:idVideogame" render={({match})=><VideogameDetail id={match.params.idVideogame}/>}/>
            <Route path="/videogames">
              <Filter/>
              <Route exact path="/videogames" component={Videogames} /> 
              <Route path="/videogames/search/:name" render={({match})=><Search name={match.params.name}/>}/>        
            </Route>
        </Route>
      </Switch>   
    </div>
  );
}


export default App;
