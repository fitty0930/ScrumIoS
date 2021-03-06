import React from 'react'
import {Link} from 'react-router-dom' 
import Logo from '../assets/images/ScrumgamePNG.png'
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import  '../assets/css/main.css';
import '../assets/css/App.css'
import  NavBar  from './NavBar';
import Footer from './Footer';
//do something...
//este template funciona como una interfaz para redirigir a los otros componentes
class Home extends React.Component{

    constructor(props){
        super(props)
    /*     if (!localStorage.getItem('session')) {       //verificara si existe la session y si no es asi redireccionara al login
            return this.props.history.push('/login');
        } */

    }
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
    componentDidMount(){
        if(!localStorage.getItem('session')){
            this.props.history.push({
                pathname:"/login",
                state: {errormessage: true}
              });
        }
    }
    
    render(){
        return(
            <>
            <header id="header" className="nav-amigote">	
				<p className="logo">Scrum</p>
				<nav className="right">
                    <Link to='/login'> 
                        <a onClick={this.closeSession} type="submit" className="button small ml-2 button-amigote-gris">{this.props.t('Navbar.log-out')}</a>
                    </Link>
                        <img src="https://www.flaticon.es/svg/static/icons/svg/3013/3013911.svg" onClick={this.traducirIngles}type="submit" className="button small ml-2 button-amigote-gris-home"/>
                        <img src="https://www.flaticon.es/svg/static/icons/svg/3013/3013899.svg" onClick={this.traducirEspañol}type="submit" className="button small ml-2 button-amigote-gris-home"/> 
				</nav>
			</header>
			<section id="banner">
                <img src={Logo} alt="" className="img-fluid img-amigotes" />
				<div className="content">
					<p>{this.props.t('Home.middle-text-1')}</p> 
                    <p>{this.props.t('Home.middle-text-2')}</p>
                    
                    <nav class="navbar navbar-expand-lg">
                        <ul class="mx-auto navbar-nav d-flex justify-content-around">
                            <li class="nav-item active">
                                <Link to='/adminUsers' className="nav-link"> 
                                    <button type="submit" className="button-amigote-home btn btn-sm" >{this.props.t('Home.admin-users')}</button>
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link to='/adminWaitingUsers' className="nav-link"> 
                                    <button type="submit" className="button-amigote-home btn btn-sm" >{this.props.t('Home.admin-waitingUsers')}</button>
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link to='#' className="nav-link"> 
                                    <button type="submit" className="btn btn-sm button-amigote-home" >{this.props.t('Home.admin-levels')}</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
				</div>
			</section>

			




            <Footer />
</>
           /*  <div classNameName="consola"  >
                    <div classNameName="logoConsola">
                        <img src={Logo} alt="" classNameName="logoConsola"/>  
                    </div>
               
                    <div classNameName="botones">
                        <Link to="/adminUsers"> 
                            <button type="submit" classNameName="boton-administrar" >Administrar Usuarios</button>
                        </Link>
                        <Link to='/adminWaitingUsers'> 
                            <button type="submit"   classNameName="boton-administrar" >Administrar Usuarios en espera</button>
                        </Link>
                    
                        <Link to='/admin-levels'> 
                            <button type="submit"   classNameName="boton-administrar" >Administrar Niveles</button>
                        </Link>
                    </div> 
            </div>
            */
        );
    }


}
export default withTranslation()(Home);
