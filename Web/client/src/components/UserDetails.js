import React, { Component } from "react";
import "../styles/main.css";
import logo from "../assets/images/Scrumgame.JPG";
import profilePicture from "../assets/images/user-example.jpg";
class UserDetails extends Component {
  constructor(){
    super();
    this.state =  {
      user : {}
    }
  }
  componentDidMount(){
    this.setState({user :  localStorage.getItem('user')});
  };
  render() {
    return (
      <>
      <div className="d-flex justify-content-around">
        <div className = "user-details my-auto rounded-pill">
          <img src={profilePicture} className="img-profile rounded-circle" alt="" />
          <input type="text"  name="username" value={this.state.user.profession} className="user-details rounded "/>
          <input type="text" disabled name="points" value={this.state.user.age} className="user-details rounded" />
        </div>
        <img src={logo} width="150" height ="150"/>
      </div>
      <div className="container mb-16 contenedorListaUser">
        <div className="row">
          <div className="col-sm ">
            <h3 className="mt-3">Id de Usuario:</h3>
            <input type="text" disabled name="user-id" value={this.state.user.uid} className="rounded inputUser" />
            <h3 className="mt-3">Nombre Completo:</h3>
            <input type="text" name="user-name" value={this.state.user.name} className="rounded inputUser" />
            <h3 className="mt-3">Correo Electronico:</h3>
            <input type="text" name="user-mail" value={this.state.user.email} className="rounded inputUser" />
          </div>
          <div className="col-sm">
          </div>
          <div className="col-sm">
            <h3 className="mt-3">Pais:</h3>
            <input type="text" name="nombre" value={this.state.user.country} className="rounded inputUser" />
            <h3 className="mt-3">Ciudad:</h3>
            <input type="text" disabled name="nombre" value={this.state.user.city}  className="rounded inputUser"/>
            <h3 className="mt-3">Tiempo dedicado:</h3>
            <input type="text"  disabled name="nombre" value={this.state.user.gameTimeLevel} className="rounded inputUser" />
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
              <a class="buttonsUser btn btn-primary" href="#" role="button">
                Editar
              </a>
            </div>
            <div class="col-sm my-4">
              <a class="buttonsUser btn btn-primary" href="#" role="button">
                Ver Progreso
              </a> {/* Enviar id de usuario como param al progreso*/}
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
export default UserDetails;
