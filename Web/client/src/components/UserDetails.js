import React, { Component } from "react";
import imagen from "../assets/images/pic02.jpg";
import profilePicture from "../assets/images/user-example.jpg";
import firebase from "../firebase"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { login } from './Adminfunctions'
import { Link } from 'react-router-dom'
import NavBar from './NavBar';
import '../assets/css/normalClase.css';
import { withTranslation } from 'react-i18next';
import Footer from "./Footer";





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
      formularioEliminar: false
    }
    this.getDatauser();
    this.CambiarSelec1 = this.CambiarSelec1.bind(this)
    this.CambiarSelec2 = this.CambiarSelec2.bind(this)
    this.CambiarGenero = this.CambiarGenero.bind(this)
  }
  async getDataLevels(mail) {
    let levels = [];
    let db = firebase.firestore();

    await db.collection('users').doc(mail).collection('levels').get().then((querySnapshot) => { // consulta de colecciones anidada, con el mail busco el progreso de niveles
      querySnapshot.forEach((docu) => {
        levels.push(docu.data());
      });
      let score = 0;
      let levelsCompleted = 0;

      for (let level of levels) {
        if (level.status === "EN CURSO") {

          levelsCompleted++;
        }
        if (level.puntaje !== undefined) {
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

    let user = {
      email: document.getElementById('ModelAdmin').value,
      password: document.getElementById('ModelPassword').value
    }
    login(user).then(
      res => {
        if (!res.error) {
          /*envia los datos a mongoDB para confirmar que exista el administrador y si no hay error procede a eliminar al usuario */
          let mail = this.state.user.email;
          let db = firebase.firestore();
          db.collection("users").doc(mail).collection("levels").doc().delete().then(function () {
            db.collection("users").doc(mail).delete().then(function () {
              alert("Usuario Eliminado");
              window.location.href = "/adminUsers";//luego de eliminar redirige a /AdminUser
            }).catch(function (error) {
              alert("Error al borrar usuario", error);
            });
          }

          )

            .catch(function (error) {
              alert("Error al borrar usuario", error);
            });
        } else {
          alert(res.error)
        }
      }
    ).catch(err => {
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

    alert("se modificaron los datos");
    this.desplegarFormulario() // esto para que quede mas prolijo
    setTimeout(() => {
      this.getDatauser();
    }, 500); // esto es para darle el tiempo a consultar la bdd y renderizar 


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
  abrirmodal = () => {
    this.setState(
      { formularioEliminar: !this.state.formularioEliminar }
    )
    //funcion que permite visualizar el modal para eliminar usuarios
  }

  componentDidMount(){
    if(!localStorage.getItem('session')){
      this.props.history.push({
        pathname:"/login",
        state: {errormessage: true}
      });
    }
  }

  render() {
    return (
      <>
        <NavBar />
        <section id="one" class="wrapper cualquiera">
          <div class="inner flex flex-3">
            <div class="flex-item left mb-2">
              <div className="col-sm-12">
                <h3>{this.props.t('UserDetails.user-ID')}</h3>
                <input type="text" name="user-id" value={this.state.user.id} readOnly className="rounded inputUser col-sm-12" />
              </div>
              <div className="col-sm-12">
                <h3>{this.props.t('UserDetails.complete-name')}</h3>
                <input type="text" name="user-name" value={this.state.user.name} readOnly className="rounded inputUser col-sm-12" />
              </div>
            </div>
            <div class="flex-item image fit round">
              <img src={imagen} alt="" />

            </div>
            <div class="flex-item right ">
              <div className="col-sm-12">
                <h3>{this.props.t('UserDetails.e-mail')}</h3>
                <input type="text" name="user-mail" value={this.state.user.email} readOnly className="rounded inputUser col-sm-12" />
              </div>
              <div className="col-sm-12">
                <h3>{this.props.t('UserDetails.levels-passed')}</h3>
                <input type="text" name="nombre" value={this.state.levels} readOnly className="rounded inputUser col-sm-12" />
              </div>

            </div>
          </div>
          <div class="inner flex flex-3">

            <div class="flex-item left col">
              <div class="mx-auto col-sm-8 mb-3">
                <Button className="button small ml-2 button-amigote col" role="button" onClick={this.abrirmodal}>
                {this.props.t('UserDetails.delete')}
                  </Button>
                <Modal isOpen={this.state.formularioEliminar} >
                  
                  <ModalHeader className="mt-50">
                  <br></br>
                  <br></br>
                  {this.props.t('UserDetails.admin-data')}
                    </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="admin">{this.props.t('UserDetails.admin')}</Label>
                      <Input type="text" id="ModelAdmin" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">{this.props.t('UserDetails.password')}</Label>
                      <Input type="password" id="ModelPassword" />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={this.abrirmodal}>
                    {this.props.t('UserDetails.cancel')}
                      </Button>
                    <Button color="danger" onClick={this.deleteUser}>
                    {this.props.t('UserDetails.delete-user')}
                      </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
            <div class="flex-item mt-auto col">
              <div className="mx-auto col-sm-8 mb-3">
                <a class="button small ml-2 button-amigote col" role="button" onClick={this.desplegarFormulario}>
                  {this.props.t('UserDetails.edit')}
                </a>
              </div>
            </div>
            <div class="flex-item right col">
              <div class="mx-auto col-sm-8 mb-3">
                <Link to={{ pathname: "/progress/" + this.state.email, query: this.state.email }}>
                  <button type="button" className="button small ml-2 button-amigote col" >Ver Progreso</button>
                </Link>
              </div>
            </div>
          </div>

        </section>
        <div className="container bg-white" id="formulario2">
        </div>
        <div className="container bg-white" id="formulario" hidden>
          <div className="form-row">
            <div className="12u$(xsmall) form-group col-md-6">
              <label for="inputEdad">{this.props.t('Register.age')}</label>
              <input type="text" className="form-control" id="inputEdad" value={this.state.edad} onChange={this.handleChange('edad')} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCountry">{this.props.t('Register.country')}</label>
              <input type="text" className="form-control" id="inputCountry" value={this.state.pais} onChange={this.handleChange('pais')} />
            </div>
          </div>
          <div className="form-group row">
            <div className="select-container col-4">
              <label for="inputInteres">{this.props.t('Register.gameTasteLevel')}</label>
              <select value={this.state.interesEnelJuego} className="form-control" onChange={this.CambiarSelec2}>
                <option value="">{this.props.t('Register.gameTasteLevel')}</option>
                  <option value="nada">{this.props.t('Register.nothing')}</option>
                  <option value="poco">{this.props.t('Register.little-bit')}</option>
                  <option value="le-da-igual" defaultValue>{this.props.t('Register.same')}</option>
                  <option value="mucho">{this.props.t('Register.a-lot')}</option>
                  <option value="fantástico">{this.props.t('Register.fantastic')}</option>
              </select>
            </div>
            <div className="col-4">
              <label for="inputInteres">{this.props.t('Register.gameTimeLevel')}</label>
              <div className="select-container">
                <select value={this.state.tiempoDedicadAjugar} className="form-control" onChange={this.CambiarSelec1}>
                <option value="">{this.props.t('Register.gameTimeLevel')}</option>
                  <option value="nada">{this.props.t('Register.nothing')}</option>
                  <option value="poco">{this.props.t('Register.little-bit')}</option>
                  <option value="le-da-igual" defaultValue>{this.props.t('Register.same')}</option>
                  <option value="mucho">{this.props.t('Register.a-lot')}</option>
                  <option value="fantástico">{this.props.t('Register.fantastic')}</option>
                </select>
              </div>

            </div>
            <div className="col-4">
              <label for="inputGenero">{this.props.t('Register.gender')}</label>
              <select value={this.state.genero} className="form-control" onChange={this.CambiarGenero}>
                  <option value="Femenino">{this.props.t('Register.female')} </option>
                  <option value="Otro">{this.props.t('Register.other')} </option>
                  <option value="Masculino">{this.props.t('Register.male')} </option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">{this.props.t('Register.city')}</label>
              <input type="text" className="form-control" id="inputCity" value={this.state.Ciudad} onChange={this.handleChange('Ciudad')} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCity">{this.props.t('Register.profession')}</label>
              <input type="text" className="form-control" id="inputCity" value={this.state.Profesion} onChange={this.handleChange('Profesion')} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">{this.props.t('Register.state')}</label>
              <input type="text" className="form-control" id="inputProvince" value={this.state.Provincia} onChange={this.handleChange('Provincia')} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputMail">{this.props.t('Register.mail')}</label>
              <input type="email" className="form-control" id="inputMail" value={this.state.email} onChange={this.handleChange('email')} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputName">{this.props.t('Register.name')}</label>
              <input type="text" className="form-control" id="inputName" value={this.state.name} onChange={this.handleChange('name')} />
            </div>
          <button className="button small   mt-5 ml-auto button-amigote" onClick={this.enviarDatos}>
          {this.props.t('UserDetails.save-changes')}
          </button>
          </div>
        </div>

        <Footer/>

        
      </>
    );
  }
}
export default withTranslation()(UserDetails);
