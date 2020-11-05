import React , {useState} from 'react';
import './assets/css/App.css';
import './assets/css/index.css';
import {ListaUsers} from './components/ListaUser';
import ListaUsersWait from './components/ListaUsersWait';
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import ResultCategory from './components/Progress';
import UserDetails from './components/UserDetails'

function App() {
  return (
    <Router>
        <Route exact path='/adminUsers' render={() => (
              <div>
                <ListaUsers/>
              </div>
        )}/>
        <Route exact path='/adminWaitingUsers' component={ListaUsersWait} />
       <Route exact path='/login' component={Login} />
       <Route exact path='/home' component={Home} />
       <Route exact path='/user/:id' component={UserDetails}/>
       <Route exact path='/progress' component={ResultCategory} />
     </Router>
    
  );
}

export default App;