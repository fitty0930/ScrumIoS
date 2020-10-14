import React from 'react'
import {Link} from 'react-router-dom' 
import Logo from '../assets/images/Scrum game.JPG'
//do something...

class Home extends React.Component{

    constructor(props){
        super(props)
    /*     if (!localStorage.getItem('session')) {       //verificara si existe la session y si no es asi redireccionara al login
            return this.props.history.push('/login');
        } */
    }
    render(){
        return(
            <div className="consola">
                {/* <div>
                    <img src={Logo} alt="" className="logoConsola"/>  
                </div> */}
                <div>
                    <Link to="/nico"> 
                        <button type="submit"   className="boton-ingresar" >Administrar usuarios</button>
                    </Link>
                    <Link to="/benja"> 
                    <button type="submit"   className="boton-ingresar" >Administrar Niveles</button>
                    </Link>
                </div>

            </div>
        );
    }


}
export default Home;
