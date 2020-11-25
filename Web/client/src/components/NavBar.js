import React, { Component,useState } from 'react';
import  '../assets/css/main.css';
import  '../assets/fonts/fontawesome-webfont.eot';
import {Link} from 'react-router-dom';
import './AdminStyles.css';
 
class NavBar extends Component {

    closeSession(){
        if(localStorage.getItem('session')){
            localStorage.removeItem('session');
        }
    }

    render() {
        return (
            <>
			<header id="header" className="nav-amigote">	
				<p className="logo">Scrum</p>
                <nav className="left">
                    <Link to='/home'> 
                        <a type="submit" className="button small ml-2 button-amigote" >Home</a>
                    </Link>
                    <Link to='/adminUsers'> 
                        <a type="submit" className="button small ml-2 button-amigote" >Admin. Users</a>
                    </Link>
                    <Link to='/adminWaitingUsers'> 
                        <a type="submit" className="button small ml-2 button-amigote" >Admin. W. Users</a>
                    </Link>
				</nav>
				<nav className="right">
                    <Link to='/login'> 
                        <a onClick={this.closeSession} type="submit" className="button small ml-2 button-amigote-gris">Log Out</a>
                    </Link>
				</nav>
			</header>
            </>

        );
    }
}
export default NavBar;