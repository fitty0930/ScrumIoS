import React, { useState } from 'react'
import AdminUsers from './components/AdminUsers';
import {Filtrar} from './components/Filtro';
import {ListaUsers} from './components/ListaUser';
import './App.css';
import './components/AdminStyles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  const [filterValue, setFilterValue] = useState('')
  
  const users = [
      {id:1, name:"Benja", puntos:12000},
      {id:2, name:"Martin", puntos:11000},
      {id:3, name:"Tomas", puntos:10000},
      {id:4, name:"Juan", puntos:9000},
      {id:5, name:"Franco", puntos:8000},
      {id:6, name:"Joel", puntos:7000},
      {id:7, name:"Cassoli", puntos:7000},
      {id:8, name:"Nico", puntos:7000},
  ]
  //const [filterValue, setFilterValue] = useState('')

    return ( 
          <Router>
            <Route exact path='/adminUsers' render={() => (
              <div>
                <Filtrar filterValue={filterValue} setFilterValue={setFilterValue}/>
                <ListaUsers users={users} filterValue={filterValue}/>
              </div>
            )}/>
          </Router>
    );
}

export default App;