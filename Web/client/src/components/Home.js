import React from 'react'
import  '../assets/css/main.css';
import '../assets/css/App.css'
import {Link} from 'react-router-dom';
import  NavBar  from './NavBar';

import Logo from '../assets/images/ScrumgamePNG.png'
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
    render(){
        return(
            <>
            <header id="header" className="nav-amigote">	
				<p className="logo">Scrum</p>
				<nav className="right">
                    <Link to='#'> 
                        <a type="submit" className="button small ml-2 button-amigote-gris">Log Out</a>
                    </Link>
				</nav>
			</header>
			<section id="banner">
                <img src={Logo} alt="" className="img-fluid img-amigotes" />
				<div className="content">
					<p>Un juego didactico para probar tus conocimientos de scrum</p> 
                    <p>Demuestra tu sabiduria!.</p>
                    
                    <nav class="navbar navbar-expand-lg">
                        <ul class="mx-auto navbar-nav d-flex justify-content-around">
                            <li class="nav-item active">
                                <Link to='/adminUsers' className="nav-link"> 
                                    <button type="submit"   className="button-amigote-home btn btn-sm" >Administrar Usuarios</button>
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link to='/adminWaitingUsers' className="nav-link"> 
                                    <button type="submit" className="button-amigote-home btn btn-sm" >Administrar Usuarios en espera</button>
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link to='#' className="nav-link"> 
                                    <button type="submit" className="btn btn-sm button-amigote-home" >Administrar Niveles</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* <ul className="actions">
						<li>
                            <Link to='/adminUsers'> 
                                <button type="submit"   className="button scrolly btn btn-sm" >Administrar Usuarios</button>
                            </Link>
                        </li>
                        <li>
                        <Link to='/adminWaitingUsers'> 
                            <button type="submit"   className="button scrolly" >Usuarios en espera</button>
                        </Link>
                        </li>
                        <li>
                        <Link to='/admin-levels'> 
                            <button type="submit"   className="button scrolly" >Administrar Niveles</button>
                        </Link>
                        </li>
                        <a className="button small fit" href="/adminUsers">Administrar Usuario</a>
					</ul> */}
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
export default Home;
