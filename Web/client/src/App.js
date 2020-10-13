import React from 'react';
import './assets/css/App.css';
import './assets/css/index.css';
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import ResultCategory from './components/Progress';

function App() {
  return (
    <Router>
       <Route exact path='/login' component={Login} />
       <Route exact path='/progress' component={ResultCategory} />
     </Router>
    
  );
}

export default App;
