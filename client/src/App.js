
import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from './views/LandingPage/LandingPage';
import Videogames from './views/Videogames/Videogames';
import VideogameDetail from './views/VideogameDetail/VideogameDetail';
import AddGame from './views/AddGame/AddGame';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Search from './views/Search/Search';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/videogames" component={Videogames}/>
      <Route path="/videogames/search/:name" render={({match})=><Search name={match.params.name}/>}/>
      <Route exact path="/videogame/:idVideogame" render={({match})=><VideogameDetail id={match.params.idVideogame}/>}/>
      <Route exact path="/addGame" component={AddGame} /> 
      
    </div>
  );
}

export default App;
