import React, { Component,useState } from 'react';
import  '../assets/css/main.css';
import  '../assets/fonts/fontawesome-webfont.eot';
import {Link} from 'react-router-dom';
import './AdminStyles.css';
 
class NavBar extends Component {


    render() {
        return (
            <>
			<header id="header" className="nav-amigote">	
				<p className="logo">Scrum</p>
                <nav className="left">
                    <Link to='/home'> 
                        <button type="submit" className="button small ml-2 button-amigote" >Home</button>
                    </Link>
                    <Link to='/adminUsers'> 
                        <button type="submit" className="button small ml-2 button-amigote" >Admin. Users</button>
                    </Link>
                    <Link to='/adminWaitingUsers'> 
                        <button type="submit" className="button small ml-2 button-amigote" >Admin. W. Users</button>
                    </Link>
				</nav>
				<nav className="right">
                    <Link to='#'> 
                        <button type="submit" className="button small ml-2 button-amigote-gris">Log Out</button>
                    </Link>
				</nav>
			</header>
            </>

        );
    }
}
export default NavBar;




/* class NavBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
           isOpen: false
       }
    }

    openMenu = () => {
        console.log(this.state.isOpen)
        if(!this.state.isOpen){
            this.setState({isOpen : true})
        }else{
            this.setState({isOpen : false})
        }
    }
    render() {
        return (
            <>
			<header id="header">
				
				<p class="logo">intensify</p>
                <nav class="left">
					<a href="#menu" onClick={()=>this.openMenu()}></a>
				</nav>
				<nav class="right">
					<a href="#" class="button alt">Log in</a>
				</nav>
			</header>
            {
                this.state.isOpen === true ?
			 <nav id="menu">
				<ul class="links">
					<li><a href="home">Home</a></li>
					<li><a href="generic.html">Generic</a></li>
					<li><a href="elements.html">Elements</a></li>
				</ul>
				<ul class="actions vertical">
					<li><a href="#" class="button fit">Login</a></li>
				</ul>
            </nav> 
         
            :""
            } */