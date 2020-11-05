import React, { Component } from "react";
import logo from "../assets/images/Scrumgame.JPG";
import profilePicture from "../assets/images/user-example.jpg";
import firebase from "../firebase"

import {Button,Modal,ModalHeader,ModalBody,ModalFooter,FormGroup,Input,Label} from 'reactstrap';
import {login} from './Adminfunctions'
import {Link} from 'react-router-dom'
import '../assets/css/normalClase.css';




const options = [
  {
    value: "Nada"
  },
  {                           //constantes que sirven para darle funcionalidad a los select del componente
    value: "Poco"
  },
  {
    value: "Le da igual"
  },
  {
    value: "Mucho"
  },
  {
    value: "Fantástico"
  }
];
const Genero = [
  {
    value: "Femenino"
  },
  {
    value: "Otro"
  },
  {
    value: "Masculino"
  }
];

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
  
        id: "",
        name: "",
        email: "",
        country: "",
   
      
        edad: 0,                                     ////estos datos se setean en "" para luego ser completados
        pais: "",                                   //por la base de datos,en caso de que uno quede vacío , no se actualizan los datos
        interesEnelJuego: "",
        tiempoDedicadAjugar: "",
        genero: "",
        ciudad: "",
        Provincia: "",
        Profesion: ""
      },
      levels: 0,
      score: 0,
      Profesion: "",
      BotonEditar: "Editar",
      precionado: false,
      Provincia: "",
      Ciudad: "",
      email: "",
      name: "",
      edad: 0,
      pais: "",
      interesEnelJuego: "",
      tiempoDedicadAjugar: "",
      genero: "",
      formularioEliminar:false
    }
    this.getDatauser();
    this.CambiarSelec1 = this.CambiarSelec1.bind(this)
    this.CambiarSelec2 = this.CambiarSelec2.bind(this)
    this.CambiarGenero = this.CambiarGenero.bind(this)
  }
  async getDataLevels(mail){
    let levels = [];
    let db = firebase.firestore();

    await db.collection('users').doc(mail).collection('levels').get().then((querySnapshot) => { // consulta de colecciones anidada, con el mail busco el progreso de niveles
      querySnapshot.forEach((docu) => {
        levels.push(docu.data());
      });
      let score= 0;
      let levelsCompleted=0;

      for (let level of levels) {
        if(level.status === "EN CURSO"){
          
          levelsCompleted++;
        }
        if(level.puntaje !== undefined){
          score += level.puntaje;
        }
      }
      this.setState({
        score: score,
        levels: levelsCompleted
      });
    });
  }
  getDatauser() {
    let mail = "";
    if (this.props.location.query != undefined) {
      mail = this.props.location.query;
    } else {
      let valueUrl = window.location.pathname.split("/");
      mail = valueUrl[2];
    }
    this.getDataLevels(mail);
    let db = firebase.firestore();
    let array = [];
    db.collection('users').doc(mail).get().then((querySnapshot) => { // consulta de colecciones anidada, con el mail busco el progreso de niveles
      let user = querySnapshot.data();
      if (user !== undefined) {
        this.setState({
          user: {
            username: user.name,
            id: user.uid,
            name: user.name,
            email: mail,
            country: user.country,
            edad: user.age,                                    
            pais: user.country,                            
            interesEnelJuego: user.gameTasteLevel,
            tiempoDedicadAjugar: user.gameTimeLevel,
            genero: user.gender,
            ciudad: user.city,
            Provincia: user.state,
            Profesion: user.profession
          },
          tiempoDedicadAjugar: user.gameTimeLevel,
          Provincia: user.state,
          Ciudad: user.city,
          email: mail,
          name: user.name,
          edad: user.age,
          pais: user.country,
          interesEnelJuego: user.gameTasteLevel,
          genero: user.gender,
          Profesion: user.profession
        });
      } else {
        alert("no se encontro usuario con este mail");
      }
    });
  }
  deleteUser = () => {

    let user={
      email:document.getElementById('ModelAdmin').value,
      password:document.getElementById('ModelPassword').value
     }
     login(user).then(
          res=>{
              if(!res.error){
                  /*envia los datos a mongoDB para confirmar que exista el administrador y si no hay error procede a eliminar al usuario */
                   let mail = this.state.user.email;
                  let db = firebase.firestore();
                  db.collection("users").doc(mail).delete().then(function () {
                    alert("Usuario Eliminado");
                    window.location.href = "/adminUsers";//luego de eliminar redirige a /AdminUser
                  }).catch(function (error) {
                    alert("Error al borrar usuario", error);
                  });
              }else{
                  alert(res.error)
              }
          }
      ).catch(err=>{
          console.log(err)
      })  
      this.abrirmodal();
  }
  enviarDatos = () => {
    let user = this.state.user;
    let db = firebase.firestore();
    db.collection('users').doc(user.email).set({
      age: this.state.edad,
      city: this.state.Ciudad,
      country: this.state.pais,
      gameTasteLevel: this.state.interesEnelJuego,
      gameTimeLevel: this.state.tiempoDedicadAjugar,
      gender: this.state.genero,
      mail: this.state.email,
      name: this.state.name,
      profession: this.state.Profesion,
      state: this.state.Provincia,
      uid: user.id,
    });
    //crea una variable con los datos del usuario sacados del State y luego actualiza los datos del usuario correspondientes a este mail
    this.getDatauser();
    alert("se modificaron los datos");
  }
  handleChange = (key) => {              //permite que los imputs puedan ser modificados
    return function (e) {             //estos imputs estan leyendo el state,por lo que no se puden modificar
      let state = {}                  //la funcion permite capurar los valores que estas escribiendo y setearlos dentro del state en tiempo real
      state[key] = e.target.value     //lo bueno es que no vas a perder los datos, ya que al actualizar la pagina los datos se vuelven
      this.setState(state)            //a cargar desde la base de datos
    }.bind(this)
  }
  CambiarSelec1(e) {
    this.setState({
      tiempoDedicadAjugar: e.target.value
    });
  }
  CambiarSelec2(e) {                        //tiene la misma funcionalidad que el metodo de arriba pero para los select
    this.setState({                         //como no paraba de romperse los separe en 3 funciones
      interesEnelJuego: e.target.value
    });
  }
  CambiarGenero(e) {
    this.setState({
      genero: e.target.value
    });
  }
  desplegarFormulario() {
    document.querySelector("#formulario").toggleAttribute("hidden");
    document.querySelector("#formulario").classList.toggle("normal-clase");
    document.querySelector("#formulario2").classList.toggle("normal-clase");
    //funcionalidad para la el formulario css
  }
  abrirmodal=()=>{
    this.setState(
      {formularioEliminar:!this.state.formularioEliminar}
    )
    //funcion que permite visualizar el modal para eliminar usuarios
  }
  render() {
    return (
      <>
        <div className="d-flex justify-content-around">
          <div className="user-details my-auto rounded-pill">
            <img src={profilePicture} className="img-profile rounded-circle" alt="" />
            <input type="text" name="username" value={this.state.user.username} className="user-details rounded " />
            <input type="text" disabled name="points" value={this.state.score} className="user-details rounded" />
          </div>
          
        </div>
        <div className="container  contenedorListaUser bg-white" id="formulario2">
          <div className="row ">
            
              <div className="col-4 ">
                <h3 className="mt-3">Id de Usuario:</h3>
                <input type="text" disabled name="user-id" value={this.state.user.id} className="rounded inputUser" />
                <h3 className="mt-3">Nombre Completo:</h3>
                <input type="text" name="user-name" value={this.state.user.name} className="rounded inputUser" />
                <h3 className="mt-3">Correo Electronico:</h3>
                <input type="text" name="user-mail" value={this.state.user.email} className="rounded inputUser" />
              </div>
              <div className="col-4 float-center">
                <img src={logo} width="210" height="210"  />
              </div>
              <div className="col-4 float-right">
                
                <h3 className="mt-3">Pais:</h3>
                <input type="text" name="nombre" value={this.state.user.country} className="rounded inputUser" />
                <h3 className="mt-3">Tiempo jugado:</h3>
                <input type="text" disabled name="nombre" value={this.state.user.tiempoDedicadAjugar} className="rounded inputUser" />
                <h3 className="mt-3">Niveles Superados:</h3>
                <input type="text" disabled name="nombre" value={this.state.levels} className="rounded inputUser" />
              </div>
            
          </div>
          <div class="container">
            <div class="row">
              <div class="col-sm my-4">
                  <Button className="buttonsUser btn btn-primary" role="button" onClick={this.abrirmodal}>
                    Eliminar
                  </Button>
                  <Modal isOpen={this.state.formularioEliminar}>
                    <ModalHeader>
                      Ingrese datos administrador para eliminar usuario
                    </ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Label for="admin">administrador</Label>
                        <Input type="text" id="ModelAdmin"/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" id="ModelPassword"/>
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={this.abrirmodal}>
                        Cancelar
                      </Button>
                      <Button color="danger" onClick={this.deleteUser}>
                        Eliminar Usuario
                      </Button>
                    </ModalFooter>
                  </Modal>
                  
              </div>
              <div class="col-sm my-4">
                <a class="buttonsUser btn btn-primary" role="button" onClick={this.desplegarFormulario}>
                  {this.state.BotonEditar}
                </a>
              </div>
              <div class="col-sm my-4">
                  <Link to={{pathname:"/progress/"+this.state.email, query:this.state.email}}>
                          <button type="button" className="buttonsUser btn btn-primary" >Ver Progreso</button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
              <div className="container  contenedorListaUser bg-white" id="formulario" hidden>
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
                    <select value={this.state.interesEnelJuego} className="form-control" onChange={this.CambiarSelec2}>
                      {options.map((option) => (
                        <option value={option.value}>{option.value} </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4">
                    <label for="inputInteres">Tiempo dedicado a Jugar</label>
                    <div className="select-container">
                      <select value={this.state.tiempoDedicadAjugar} className="form-control" onChange={this.CambiarSelec1}>
                        {options.map((option) => (
                          <option value={option.value}>{option.value} </option>
                        ))}
                      </select>
                    </div>

                  </div>
                  <div className="col-4">
                    <label for="inputGenero">Género</label>
                    <select value={this.state.genero} className="form-control" onChange={this.CambiarGenero}>
                      {Genero.map((option) => (
                        <option value={option.value}>{option.value} </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="inputCity">Ciudad</label>
                    <input type="text" className="form-control" id="inputCity" value={this.state.Ciudad} onChange={this.handleChange('Ciudad')} />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="inputCity">Profesion</label>
                    <input type="text" className="form-control" id="inputCity" value={this.state.Profesion} onChange={this.handleChange('Profesion')} />
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
      </>
    );
  }
}
export default UserDetails;
