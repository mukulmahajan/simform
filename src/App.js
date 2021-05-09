import './App.css';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Profile from '../src/components/profile';
import Login from './components/login';
function App() {
  return (
    <Router>
      <div>
        <Switch>  
        <Route path='/profile' component={Profile}/>   
        <Route path="/login" component={Login}/>  
        <Route path='/' component={Login}/>    
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
