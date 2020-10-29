import React, { Component } from "react";
import logo from "../assets/images/Scrumgame.JPG";
import profilePicture from "../assets/images/user-example.jpg";
class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        visible:true,
        username: "Nico_erasun",
        score: 14555,
        id: 4,
        name: "Nicolas",
        email: "nico_erasun@gmail.com",
        country: "Argentina",
        hours: 800,
        levels: 28,
        edad: 14,
        pais: "Argentina",
        interesEnelJuego: "le da igual",
        tiempoDedicadAjugar: "Mucho",
        genero: "Otro",
        ciudad: "Bolivar",
        Provincia: "Buenos Aires"

      }
    }
  }
  /*   componentDidMount(){
      this.setState({user :  localStorage.getItem('user')});
    }; */
    enviarDatos(){

      //a
      alert("por favor llene todos los campos")
    }

   desplegarFormulario(){
    document.querySelector("#formulario").toggleAttribute("hidden");
   }

  render() {

    // En este componente se muestran los datos del usuario que van a ser traidos del localStorage, por 
    // ahora esta fijo pero cuando se avance en java se van a traer los datos de forma correcta (ver en proximo sprint)
    return (
      <>
        <div className="d-flex justify-content-around">
          <div className="user-details my-auto rounded-pill">
            <img src={profilePicture} className="img-profile rounded-circle" alt="" />
            <input type="text" name="username" value={this.state.user.username} className="user-details rounded " />
            <input type="text" disabled name="points" value={this.state.user.score} className="user-details rounded" />
          </div>
          <img src={logo} width="150" height="150" />
        </div>
        <div className="container mb-16 contenedorListaUser">
          <div className="row">
            <div className="col-sm ">
              <h3 className="mt-3">Id de Usuario:</h3>
              <input type="text" disabled name="user-id" value={this.state.user.id} className="rounded inputUser" />
              <h3 className="mt-3">Nombre Completo:</h3>
              <input type="text" name="user-name" value={this.state.user.name} className="rounded inputUser" />
              <h3 className="mt-3">Correo Electronico:</h3>
              <input type="text" name="user-mail" value={this.state.user.email} className="rounded inputUser" />
            </div>
            <div className="col-sm">
              {" "}
            </div>
            <div className="col-sm">
              <h3 className="mt-3">Pais:</h3>
              <input type="text" name="nombre" value={this.state.user.country} className="rounded inputUser" />
              <h3 className="mt-3">Horas Jugadas:</h3>
              <input type="text" disabled name="nombre" value={this.state.user.hours} className="rounded inputUser" />
              <h3 className="mt-3">Niveles Superados:</h3>
              <input type="text" disabled name="nombre" value={this.state.user.levels} className="rounded inputUser" />
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-sm my-4">
                <a class="buttonsUser btn btn-primary" href="#" role="button">
                  Eliminar
                </a>
              </div>
              <div class="col-sm my-4">
                <a class="buttonsUser btn btn-primary" href="#" role="button" onClick={this.desplegarFormulario}>
                  Editar
                </a>
              </div>
              <div class="col-sm my-4">
                <a class="buttonsUser btn btn-primary" href="/progress" role="button">
                  Ver Progreso
                </a> {/* Enviar id de usuario como param al progreso*/}
              </div>
            </div>
            <div className="awdawd-col-8 m-auto h-100" id="formulario" hidden>
              
              <div className="form-row">
               <div className="form-group col-md-6">
                 <label for="inputEdad">Edad</label>
                 <input type="number" className="form-control" id="inputEdad" placeholder={this.state.user.edad} />
               </div>
               <div className="form-group col-md-6">
                 <label for="inputCountry">País</label>
                 <input type="input" className="form-control" id="inputCountry" placeholder={this.state.user.pais} />
               </div>
             </div>
             <div className="form-group row">
               <div className="col-4">
                 <label for="inputInteres">Interes en el Juego</label>
                 <select id="inputInteres" className="form-control">
                   <option value="nada">Nada</option>
                   <option value="poco">Poco</option>
                   <option value="le-da-igual" defaultValue>Le da igual</option>
                   <option value="mucho">Mucho</option>
                   <option value="fantástico">Fantástico</option>
                 </select>
               </div>
               <div className="col-4">
                 <label for="inputInteres">Tiempo dedicado a Jugar</label>
                 <select id="inputTiempo" className="form-control">
                   <option value="nada">Nada</option>
                   <option value="poco">Poco</option>
                   <option value="le-da-igual" defaultValue>Le da igual</option>
                   <option value="mucho">Mucho</option>
                   <option value="fantástico">Fantástico</option>
                 </select>
               </div>
               <div className="col-4">
                 <label for="inputGenero">Género</label>
                 <select id="inputTiempo" className="form-control">
                   <option value="masculino" defaultValue>Masculino</option>
                   <option value="otro">Otro</option>
                   <option value="femenino">Femenino</option>
                 </select>
               </div>
             </div>
             <div className="form-row">
               <div className="form-group col-md-6">
                 <label for="inputCity">Ciudad</label>
                 <input type="text" className="form-control" id="inputCity" placeholder={this.state.user.ciudad} />
               </div>
               <div className="form-group col-md-6">
                 <label for="inputProvince">Provincia</label>
                 <input type="text" className="form-control" id="inputProvince" placeholder={this.state.user.Provincia} />
               </div>
               <div className="form-group col-md-6">
                 <label for="inputMail">Mail</label>
                 <input type="email" className="form-control" id="inputMail" placeholder={this.state.user.email} />
               </div>
               <div className="form-group col-md-6">
                 <label for="inputName">Nombre</label>
                 <input type="text" className="form-control" id="inputName" placeholder={this.state.user.name} />
               </div>
             </div>
             <button className="btn btn-primary regular-button" onClick={this.enviarDatos}>
               Guardar Cambios
           </button>
     
       
           </div>
          </div>
        </div>
      </>
    );
  }
}
export default UserDetails;
