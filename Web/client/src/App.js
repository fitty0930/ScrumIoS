import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import './assets/css/index.css';
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom' 

function App() {
  return (
    
     <Router>
       <Route exact path='/login' component={Login} />
     </Router>
    
  );
}

export default App;
