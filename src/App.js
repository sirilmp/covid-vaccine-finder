import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notify from './pages/Notify';
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/'>
          <Home/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
