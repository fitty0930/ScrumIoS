import React, { Component, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {register} from "./Users_WaitFunctions";
import "react-toastify/dist/ReactToastify.css";
const Register =(props)=> {

    const notification = () => toast("Tu solicitud será procesada en brevedad");
    const [edad, setEdad] = useState("");
    const [pais, setPais] = useState("");
    const [interes, setInteres] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [genero, setGenero] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [mail, setMail] = useState("");
    const [nombre, setNombre] = useState("");
    const handleSubmit = (event) => {
      notification();
      const user = {
        body: {
          edad: edad,
          pais: pais,
          interes: interes,
          tiempo: tiempo,
          genero: genero,
          ciudad: ciudad,
          provincia: provincia,
          mail: mail,
          nombre: nombre,
        },
      };
      register(user)
      .then(res => 
        console.log(res.data)
      )
     .catch(err => console.log(err))
    };
    const handleInputChange = (event) => {
      if (event.target.name === "edad") {
        setEdad(event.target.value);
      }
      if (event.target.name === "pais") {
        setPais(event.target.value);
      }
      if (event.target.name === "interes") {
        setInteres(event.target.value);
      }
      if (event.target.name === "tiempo") {
        setTiempo(event.target.value);
      }
      if (event.target.name === "genero") {
        setGenero(event.target.value);
      }
      if (event.target.name === "ciudad") {
        setCiudad(event.target.value);
      }
      if (event.target.name === "provincia") {
        setProvincia(event.target.value);
      }
      if (event.target.name === "mail") {
        setMail(event.target.value);
      }
      if (event.target.name === "nombre") {
        setNombre(event.target.value);
      }
    };
    return (
      <>
        <div className="col-8 m-auto h-100">
          {/*           <form>
           */}{" "}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEdad">Edad</label>
              <input type="email" onChange={handleInputChange} name="edad" className="form-control" id="inputEdad" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCountry">País</label>
              <input
                onChange={handleInputChange}
                type="email"
                name="pais"
                className="form-control"
                id="inputCountry"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-4">
              <label for="inputInteres">Interes en el Juego</label>
              <select id="inputInteres"onChange={handleInputChange} name="interes" className="form-control">
                <option value="nada">Nada</option>
                <option value="poco">Poco</option>
                <option value="le-da-igual" defaultValue>
                  Le da igual
                </option>
                <option value="mucho">Mucho</option>
                <option value="fantástico">Fantástico</option>
              </select>
            </div>
            <div className="col-4">
              <label for="inputInteres">Tiempo dedicado a Jugar</label>
              <select id="inputTiempo" onChange={handleInputChange} name="tiempo" className="form-control">
                <option value="nada">Nada</option>
                <option value="poco">Poco</option>
                <option value="le-da-igual" defaultValue>
                  Le da igual
                </option>
                <option value="mucho">Mucho</option>
                <option value="fantástico">Fantástico</option>
              </select>
            </div>
            <div className="col-4">
              <label for="inputGenero">Género</label>
              <select id="inputTiempo" onChange={handleInputChange} name="genero" className="form-control">
                <option value="masculino" defaultValue>
                  Masculino
                </option>
                <option value="otro">Otro</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">Ciudad</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="ciudad"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">Provincia</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="provincia"
                className="form-control"
                id="inputProvince"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputMail">Mail</label>
              <input
                onChange={handleInputChange}
                type="mail"
                name="mail"
                className="form-control"
                id="inputMail"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputName">Nombre</label>
              <input
                onChange={handleInputChange}
                type="username"
                name="nombre"
                className="form-control"
                id="inputName"
              />
            </div>
          </div>
          <button
            className="btn btn-primary float-right"
            onClick={handleSubmit}
          >
            Solicitar Registro
          </button>
          <ToastContainer
            autoClose={5000}
            pauseOnHover
            draggable
            closeOnClick
          />
          {/* </form> */}
        </div>
      </>
    );
  };

export {Register};
