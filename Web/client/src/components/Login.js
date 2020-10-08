import React from 'react'
import Logo from '../assets/images/Scrum game.JPG'


 

 
class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
            error0:"",
            error1:"*Por favor, rellene todos los campos*",
            verificando:""
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
            /* let usuario=document.getElementById('usuario').value;
            let password=document.getElementById('password').value;
    
            console.log(usuario)
            console.log(password) */
            alert('enviando..')                 
        }
        
      }
      
       camposVacios=()=>{
        let usuario=document.getElementById('usuario').value;
        let password=document.getElementById('password').value;
        console.log(usuario)
        console.log(password)
        if((usuario==="")||(password==="")){
            return true
        }
        return false
    }

    render(){
        return(
           
        <div className="sombreado">
            <form action="" method="" className="formulario"  onSubmit={this.verificar}>
                <div>
                    <img src={Logo} alt="" className="logo"/>  
                </div>
                
                <input type="text" name="username" className="input" placeholder="Usuario" id="usuario"/>
                <input type="password" name="password" className="input" placeholder="*******" id="password"/>
                <button type="submit"  className="input" className="boton-ingresar" >Ingresar</button>
                <label>{this.state.error0}</label>  
            </form>
        </div>
        );
    }
     
        
}
export default Login;

 
