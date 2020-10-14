import React from 'react';
import './assets/css/App.css';

import './assets/css/index.css';
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom' 

function App() {
  return (


     <Router>
       <Route exact path='/login' component={Login} />
       <Route exact path='/home' component={Home} />
     </Router>
    
  );
}

export default App;
