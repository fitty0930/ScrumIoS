import React, { Component } from "react";
import logo from "../assets/images/Scrumgame.JPG";
import profilePicture from "../assets/images/user-example.jpg";
import firebase from "../firebase"

const  options = [
  {
    label: "Poco",
    value: "poco"
  },
  {
    label: "Le da igual",
    value: "le-da-igual"
  },
  {
    label: "Mucho",
    value: "Mucho"
  },
  {
    label: "fantastico",
    value: "Fantástico"
  }
];

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        score: 0,
        id: 0,
        name: "",
        email: "",
        country: "",
        hours: 0,
        levels: 0,
        edad: 0,                                     ////estos datos son de ejemplo
        pais: "",                            //se van a cargar con la informacion de la base de datos
        interesEnelJuego: "",
        tiempoDedicadAjugar: "",
        genero: "",
        ciudad: "",
        Provincia: "",
        profesion: ""
      },
      BotonEditar: "Editar",
      precionado: false,
      Provincia: "",
      Ciudad: "",
      email: "",
      name: "",
      edad: 0,
      pais: "",
      interesEnelJuego: ""
    }
    this.getDatauser();
  }
  getDatauser(){
    let mail = "";
    if(this.props.location.query != undefined){
      mail= this.props.location.query;
    }else{
      let valueUrl= window.location.pathname.split("/");
      mail= valueUrl[2];
    }

    let db = firebase.firestore();
    let array = [];
    db.collection('users').doc(mail).get().then((querySnapshot) => { // consulta de colecciones anidada, con el mail busco el progreso de niveles
      let user= querySnapshot.data();
      console.log(user);
      if(user !== undefined){
          this.setState({
            user: {
              username: "este no va",
              score: "traer niveles", //hacer foreach de todos los niveles (HAY QUE TRAER NIveles)
              id: user.uid,
              name: user.name,
              email: mail,
              country: user.country,
              hours: "traer niveles", //hacer foreach de todos los niveles (HAY QUE TRAER NIveles)
              levels: "traer niveles",//hacer foreach de todos los niveles (HAY QUE TRAER NIveles)
              edad: user.age,                                     ////estos datos son de ejemplo
              pais: user.country,                            //se van a cargar con la informacion de la base de datos
              interesEnelJuego: user.gameTasteLevel,
              tiempoDedicadAjugar: user.gameTimeLevel,
              genero: user.gender,
              ciudad: user.city,
              Provincia: user.state,
              profesion: user.profession
            },
            Provincia: user.state,
            Ciudad: user.city,
            email: mail,
            name: user.name,
            edad: user.age,
            pais: user.country,
            interesEnelJuego: user.gameTasteLevel,
        });
      }else{
        alert("viejo pasame bien el mail, no se encontro nada");
      }
    });
  }
  
  enviarDatos = () => {
    let user= this.state.user;
    let db = firebase.firestore();
    db.collection('users').doc(user.email).set({
      age: this.state.edad,
      city: this.state.Ciudad,
      country: this.state.pais,
      gameTasteLevel: this.state.interesEnelJuego,
      gameTimeLevel: user.tiempoDedicadAjugar,
      gender: user.genero,
      mail: this.state.email,
      name: this.state.name,
      profession: user.profesion,
      state: this.state.Provincia,
      uid: user.id,
    });

    this.getDatauser();
    alert("matalo a ese hijo de puta");
  }

  handleChange = (key) => {              //permite que los imputs puedan ser modificados
    return function (e) {             //estos imputs estan leyendo el state,por lo que no se puden modificar
      let state = {}                  //la funcion permite capurar los valores que estas escribiendo y setearlos dentro del state en tiempo real
      state[key] = e.target.value     //lo bueno es que no vas a perder los datos, ya que al actualizar la pagina los datos se vuelven
      this.setState(state)            //a cargar desde la base de datos
    }.bind(this)
  }
  CambiarSelect(e) {
    this.setState({ user: e.target.value });
  }
  desplegarFormulario() {

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
                <a class="buttonsUser btn btn-primary" role="button">
                  Eliminar
                </a>
              </div>
              <div class="col-sm my-4">
                <a class="buttonsUser btn btn-primary" role="button" onClick={this.desplegarFormulario}>
                  {this.state.BotonEditar}
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
                  <input type="number" className="form-control" id="inputEdad" value={this.state.edad} onChange={this.handleChange('edad')} />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputCountry">País</label>
                  <input type="input" className="form-control" id="inputCountry" value={this.state.pais} onChange={this.handleChange('pais')} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label for="inputInteres">Interes en el Juego</label>
                  <select id="inputInteres" className="form-control">
                    defaultValue{this.setState.interesEnelJuego}////////////////////aca flaco 
                    <option value="nada">Nada</option>
                    <option value="poco">Poco</option>
                    <option value="le-da-igual" >Le da igual</option>
                    <option value="mucho">Mucho</option>
                    <option value="fantástico">Fantástico</option>
                  </select>
                </div>
                <div className="col-4">
                  <label for="inputInteres">Tiempo dedicado a Jugar</label>
                 {/*  <select id="inputTiempo" className="form-control">
                    <option value="nada">Nada</option>
                    <option value="poco">Poco</option>
                    <option value="le-da-igual" defaultValue>Le da igual</option>
                    <option value="mucho">Mucho</option>
                    <option value="fantástico">Fantástico</option>
                  </select> */}
                  <div className="select-container">
                    <select value={this.state.user.tiempoDedicadAjugar} className="form-control">    
                      {options.map((option) => (
                        <option value={option.value}>{option.label} </option>
                      ))}
                    </select>
                  </div>
                  
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
                  <input type="text" className="form-control" id="inputCity" value={this.state.Ciudad} onChange={this.handleChange('Ciudad')} />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputProvince">Provincia</label>
                  <input type="text" className="form-control" id="inputProvince" value={this.state.Provincia} onChange={this.handleChange('Provincia')} />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputMail">Mail</label>
                  <input type="email" className="form-control" id="inputMail" value={this.state.email} onChange={this.handleChange('email')} />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputName">Nombre</label>
                  <input type="text" className="form-control" id="inputName" value={this.state.name} onChange={this.handleChange('name')} />
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
