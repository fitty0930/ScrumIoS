import React from 'react'
import Logo from '../assets/images/Scrumgame.JPG'
import {login} from './Adminfunctions'

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={                        //el state se utiliza para mostrar errores a la hora de logearse
            error0:"",
            error1:"*Por favor, rellene todos los campos*",
            verificando:"",
            ups:"*Usuario no encontrado*",
            errorMessege: false
        }
    }
    verificar=(e)=>{
        e.preventDefault()                      //evita que el formulario se envie
        if(this.camposVacios()){                //comprueba que los imputs no esten vacios
            this.setState({
                error0:this.state.error1        //mensaje de llene los campos
            })
        }
        else{
            this.setState({
                error0:this.state.verificando   //podria ser cualquier cosa es para setear el mensaje a ""
                
            })

            let user={
                email:document.getElementById('usuario').value,
                password:document.getElementById('password').value
            }
            

            login(user).then(           //funcion inportada desde Adminfunctions
                res=>{                  //comprueba los datos retornados de la base de datos y si el usuario Admin existe te redirige 
                    if(!res.error){     //hacia la template home, si no es el caso saltara una alerta proviniente de la base de datos 
                        this.props.history.push('/home');
                    }else{
                        alert(res.error)
                    }
                }
            ).catch(err=>{
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

        render(){
            console.log(this.props)
        return(
           
        <div className="sombreado">
            <form action="" method="" className="formulario"  onSubmit={this.verificar}>
                { this.props.location.state != undefined ?
                    <div class="alert alert-danger alert-dismissable">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>¡Porfavor Inicie Session!</strong> para poder acceder.
                    </div>
                    : ""
                }
                <div>
                    <img src={Logo} alt="" className="logo"/>  
                </div>
                
                <input type="text" name="username" className="input" placeholder="Usuario" id="usuario"/>
                <input type="password" name="password" className="input" placeholder="*******" id="password"/>
                <button type="submit" className="boton-ingresar" >Ingresar</button>
                <label>{this.state.error0}</label>  
            </form>
        </div>
        );
    }
     
        
}
export default Login;

 
