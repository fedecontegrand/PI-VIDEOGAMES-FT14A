
import './App.css';
import {Route,Switch} from 'react-router-dom'
import LandingPage from './views/LandingPage/LandingPage';
import Videogames from './views/Videogames/Videogames';
import VideogameDetail from './views/VideogameDetail/VideogameDetail';
import AddGame from './views/AddGame/AddGame';
import NavBar from './components/NavBar';
import Filter from "./components/Filter"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="https://pi-videogames-ft-14-a.vercel.app/" component={LandingPage}/>
        <Route>
          <NavBar/>
            <Route exact path="/addGame" component={AddGame} /> 
            <Route exact path="/videogame/:idVideogame" render={({match})=><VideogameDetail id={match.params.idVideogame}/>}/>
            <Route path="/videogames">
              <Filter/>
              <Switch>
                <Route exact path="/videogames/:game" render={({match})=><Videogames game={match.params.game}/>}/>
                <Route component={Videogames}/>
              </Switch>
            </Route>
        </Route>
      </Switch>   
    </div>
  );
}


export default App;
