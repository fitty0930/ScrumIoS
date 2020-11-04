import React , {useState} from 'react';
import './assets/css/App.css';
import './assets/css/index.css';
import {Filtrar} from './components/Filtro';
import {ListaUsers} from './components/ListaUser';
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import ResultCategory from './components/Progress';
import UserDetails from './components/UserDetails'
import Register from './components/Register';

function App() {
  const [filterValue, setFilterValue] = useState('')  
  const users = [
      {uid:1, name:"Benja", puntos:12000,  mail:"Mail123@testing.com"},
      {uid:2, name:"Martin", puntos:11000, mail:"Mail456@testing.com"},
      {uid:3, name:"Tomas", puntos:10000, mail:"Mail789@testing.com"},
      {uid:4, name:"Juan", puntos:9000,    mail:"Mail234@testing.com"},
      {uid:5, name:"Franco", puntos:8000,  mail:"Mail567@testing.com"},
      {uid:6, name:"Joel", puntos:7000,    mail:"Mail890@testing.com"},
      {uid:7, name:"Cassoli", puntos:7000, mail:"Mail012@testing.com"},
      {uid:8, name:"Nico", puntos:7000,    mail:"Mail654@testing.com"},
  ]
  return (
    <Router>
        <Route exact path='/adminUsers' render={() => (
              <div>
                <Filtrar filterValue={filterValue} setFilterValue={setFilterValue}/>
                <ListaUsers users={users} filterValue={filterValue}/>
                
              </div>
        )}/>
       <Route exact path='/login' component={Login} />
       <Route exact path='/register' component={Register} />
       <Route exact path='/home' component={Home} />
       <Route exact path='/user/:id' component={UserDetails}/>
       <Route exact path='/progress/:id' component={ResultCategory} />
     </Router>
    
  );
}

export default App;