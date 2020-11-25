import React from 'react'
import Logo from '../assets/images/Scrumgame.JPG'
import {login} from './Adminfunctions'
import { withTranslation } from 'react-i18next';
class Login extends React.Component{

    constructor(props) {
        super(props)
        this.state={                        //el state se utiliza para mostrar errores a la hora de logearse
            error0:"",
            error1:"*Por favor, rellene todos los campos*",
            verificando:"",
            ups:"*Usuario no encontrado*",
            errorMessege: false
        }
    }
    verificar = (e) => {
        e.preventDefault()                      //evita que el formulario se envie
        if (this.camposVacios()) {                //comprueba que los imputs no esten vacios
            this.setState({
                error0: this.state.error1        //mensaje de llene los campos
            })
        }
        else {
            this.setState({
                error0: this.state.verificando   //podria ser cualquier cosa es para setear el mensaje a ""

            })

            let user = {
                email: document.getElementById('usuario').value,
                password: document.getElementById('password').value
            }


            login(user).then(           //funcion inportada desde Adminfunctions
                res => {                  //comprueba los datos retornados de la base de datos y si el usuario Admin existe te redirige 
                    if (!res.error) {     //hacia la template home, si no es el caso saltara una alerta proviniente de la base de datos 
                        this.props.history.push('/home');
                    } else {
                        alert(res.error)
                    }
                }
            ).catch(err => {
                console.log(err)
            })
        }
        
      }
      
       camposVacios=()=>{
            let usuario=document.getElementById('usuario').value;
            let password=document.getElementById('password').value;
            
            if((usuario==="")||(password==="")){
                return true
            }
            return false
        }

    render() {
        return (
            <div className="sombreado">
                <form action="" method="" className="formulario" onSubmit={this.verificar}>
                    <div>
                        <img src={Logo} alt="" className="logo img-fluid col-8" />
                    </div>
                    <input type="text" name="username" className="input" placeholder="*******" id="usuario" />
                    <input type="password" name="password" className="input" placeholder="*******" id="password" />
                    <button type="submit" className="boton-ingresar  button-amigote" >{this.props.t('Login.sign-in')}</button>
                    
                    <label>{this.state.error0}</label>
                    <a href="/register">{this.props.t('Login.accept')}</a>
                </form>
            
            </div>
        )}
}
export default withTranslation()(Login);


