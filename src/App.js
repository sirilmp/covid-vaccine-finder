import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NotifyMe from './pages/NotifyMe';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/notifyme'>
          <NotifyMe />
        </Route>
      </Router>
    </div>
  );
}

export default App;
