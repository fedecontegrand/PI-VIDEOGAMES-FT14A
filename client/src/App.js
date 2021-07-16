
import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from './views/LandingPage/LandingPage';
import Videogames from './views/Videogames/Videogames';
import VideogameDetail from './views/VideogameDetail/VideogameDetail';
import AddGame from './views/AddGame/AddGame';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/videogames" component={Videogames}/>
      <Route exact path="/videogame/:idVideogame" render={({match})=><VideogameDetail id={match.params.idVideogame}/>}/>
      <Route exact path="/addGame" component={AddGame} />
    </div>
  );
}

export default App;
