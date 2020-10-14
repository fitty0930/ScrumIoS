import React from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import './App.css';
import UserDetails from './components/UserDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <UserDetails />    {/* /id */}
    </div>
  );
}

export default App;
