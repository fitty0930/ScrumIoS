import React from 'react'
import {Link} from 'react-router-dom' 
import Logo from '../assets/images/Scrumgame.JPG'
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
            <div className="consola"  >
                    <div className="logoConsola">
                        <img src={Logo} alt="" className="logoConsola"/>  
                    </div>
               
                    <div className="botones">
                        <Link to="/adminUsers"> 
                            <button type="submit" className="boton-administrar" >Administrar Usuarios</button>
                        </Link>
                    
                        <Link to='/admin-levels'> 
                            {/* proximo sprint */}
                            <button type="submit"   className="boton-administrar" >Administrar Niveles</button>
                        </Link>
                    </div>
                

            </div>
        );
    }


}
export default Home;
