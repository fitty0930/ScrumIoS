import React from 'react'
import {Link} from 'react-router-dom' 
import Logo from '../assets/images/Scrumgame.JPG'
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
//do something...
//este template funciona como una interfaz para redirigir a los otros componentes
class Home extends React.Component{

    constructor(props){
        super(props)
    /*     if (!localStorage.getItem('session')) {       //verificara si existe la session y si no es asi redireccionara al login
            return this.props.history.push('/login');
        } */

        
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
    render(){
        return(
            <div className="consola"  >
                    <div className="logoConsola">
                        <img src={Logo} alt="" className="logoConsola"/>  
                    </div>
                    <button onClick={this.traducirIngles} className="boton-administrar" >Ingles</button>
                    <button onClick={this.traducirEspañol} className="boton-administrar" >Español</button>
                    <div className="botones">
                        <Link to="/adminUsers"> 
                            <button type="submit" className="boton-administrar" >{this.props.t('Home.admin-users')}</button>
                        </Link>
                        <Link to='/adminWaitingUsers'> 
                            {/* proximo sprint */}
                            <button type="submit"   className="boton-administrar" >{this.props.t('Home.admin-waitingUsers')}</button>
                        </Link>
                    
                        <Link to='/admin-levels'> 
                            {/* proximo sprint */}
                            <button type="submit"   className="boton-administrar" >{this.props.t('Home.admin-levels')}</button>
                        </Link>
                    </div>
                
            </div>
        );
    }


}
export default withTranslation()(Home);
