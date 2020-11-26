import React, { Component,useState } from 'react';
import  '../assets/css/main.css';
import  '../assets/fonts/fontawesome-webfont.eot';
import {Link} from 'react-router-dom';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
 
class NavBar extends Component {

    closeSession(){
        if(localStorage.getItem('session')){
            localStorage.removeItem('session');
        }
    }
    traducirIngles(){
        i18next.changeLanguage('en', (err) => {
            if (err) return console.log('something went wrong loading', err);
          });
    }
    traducirEspañol(){
        i18next.changeLanguage('es', (err) => {
            if (err) return console.log('something went wrong loading', err);
          });
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
                        <a type="submit" className="button small ml-2 button-amigote" >{this.props.t('Navbar.admin-users')}</a>
                    </Link>
                    <Link to='/adminWaitingUsers'> 
                        <a type="submit" className="button small ml-2 button-amigote" >{this.props.t('Navbar.admin-w-users')}</a>
                    </Link>
				</nav>
				<nav className="right">
                    <Link to='/login'> 
                        <a onClick={this.closeSession} type="submit" className="button small ml-2 button-amigote-gris">{this.props.t('Navbar.log-out')}</a>
                    </Link>
                    <img src="https://www.flaticon.es/svg/static/icons/svg/3013/3013911.svg" onClick={this.traducirIngles}type="submit" className="button small ml-2 button-amigote-gris-home"/>
                        <img src="https://www.flaticon.es/svg/static/icons/svg/3013/3013899.svg" onClick={this.traducirEspañol}type="submit" className="button small ml-2 button-amigote-gris-home"/> 
				</nav>
			</header>
            </>
        );
    }
}
export default withTranslation()(NavBar);