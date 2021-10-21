import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './Components/Landing/LandingPage'
import Home from './Components/Home/Home'
import CreateVideogame from './Components/CreateVideogame'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
 <Route exact path= '/' component= {LandingPage}/>
 <Route path='/home' component={Home}/>
 <Route path="/home/:id" component={CreateVideogame} />
 </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
