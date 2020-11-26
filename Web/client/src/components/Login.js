import React from 'react'
import Logo from '../assets/images/Scrumgame.JPG'
import {login} from './Adminfunctions'
import  './AdminStyles.css';
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

            <div className="sombreado ">
                <div className="bg-white col-sm-12 col-md-6 col-lg-4 mx-auto rounded responsive cualquiera2">
                    <img src={Logo} alt="" className="logo img-fluid " />
                    <form action="" method=""  onSubmit={this.verificar} className="col-10 mx-auto " >
                        <input type="text" name="username"  placeholder={this.props.t('Login.user')} id="usuario" />
                        <input type="password" name="password"  placeholder="*******" id="password" className="mt-2"/>
                        <label>{this.state.error0}</label>
                        <button type="submit" className="mt-3 mb-2 col-6 mx-auto button small button-amigote " >{this.props.t('Login.sign-in')}</button>
                        <a href="/register"className="float-right mt-3" >{this.props.t('Login.register')}</a>
                        
                    <div className=" mx-auto col-8 d-flex justify-content-around">
                    </div>
                    </form>

                </div>

            </div>

                
                    
            

            
        )}
}
export default withTranslation()(Login);

{/* <div className="sombreado">
                <form action="" method="" className="mx-auto bg-danger col-6 d-flex justify-content-center rounded" onSubmit={this.verificar}  >
                  

                        <img src={Logo} alt="" className="logo img-fluid col-8" />
                        <div className="col">
                            <input type="text" name="username"  placeholder="*******" id="usuario" />
                            <input type="password" name="password"  placeholder="*******" id="password" />
                            <button type="submit" className="boton-ingresar  button-amigote" >{this.props.t('Login.sign-in')}</button>

                        </div>
                        
                        <label>{this.state.error0}</label>
                        <a href="/register">{this.props.t('Login.accept')}</a>
                    
                </form>
            
            </div> */}
