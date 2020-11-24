import React, { Component, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { register } from "./Users_WaitFunctions";
import "react-toastify/dist/ReactToastify.css";
const Register = (props) => {

  const notification = () => toast("Verificaremos tu solicitud a la brevedad, por favor revise su direccion de correo");
  const [seEnvio, setseEnvio] = useState(false);
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [interes, setInteres] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [genero, setGenero] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [mail, setMail] = useState("");
  const [nombre, setNombre] = useState("");
  const [profesion, setProfesion] = useState("");
  const handleSubmit = (event) => {
    if(!seEnvio){
    notification();
    console.log(event);
    setseEnvio(true);
    const user = {
      age: edad,
      country: pais,
      gameTasteLevel: interes,
      gameTimeLevel: tiempo,
      gender: genero,
      city: ciudad,
      state: provincia,
      mail: mail,
      name: nombre,
      profession: profesion
    };
    register(user)
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err))
      }else
        alert("Ya envio una solicitud de registro")

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
    if (event.target.name === "profesion") {
      setProfesion(event.target.value);
    }
  };
  return (
    <>
      <div className="sombreado sombreado2">
        <div className="col-8 m-auto h-100 bg-light rounded">
          <h3>Registro</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEdad">Edad</label>
              <input type="text" onChange={handleInputChange} name="edad" className="form-control" id="inputEdad" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCountry">País</label>
              <input onChange={handleInputChange} type="text" name="pais" className="form-control" id="inputCountry" />
            </div>
          </div>
          <div className="form-group row">
            <div class="12u$ col-4">
              <div class="select-wrapper">
                <select id="inputInteres" onChange={handleInputChange} name="interes" className="form-control">
                  <option value="">- Interes en el Juego -</option>
                  <option value="nada">Nada</option>
                  <option value="poco">Poco</option>
                  <option value="le-da-igual" defaultValue>Le da igual</option>
                  <option value="mucho">Mucho</option>
                  <option value="fantástico">Fantástico</option>
                </select>
              </div>
            </div>
            <div class="12u$ col-4">
              <div class="select-wrapper">
                <select id="inputTiempo" onChange={handleInputChange} name="tiempo" className="form-control">
                  <option value="">- Tiempo dedicado a Jugar -</option>
                  <option value="nada">Nada</option>
                  <option value="poco">Poco</option>
                  <option value="le-da-igual" defaultValue>Le da igual</option>
                  <option value="mucho">Mucho</option>
                  <option value="fantástico">Fantástico</option>
                </select>
              </div>
            </div>
            <div class="12u$ col-4">
              <div class="select-wrapper">
                <select id="inputGenero" onChange={handleInputChange} name="genero" className="form-control">
                  <option value="">- Genero -</option>
                  <option value="masculino" defaultValue>Masculino</option>
                  <option value="otro">Otro</option>
                  <option value="femenino">Femenino</option>
                </select>
              </div>
            </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">Ciudad</label>
              <input onChange={handleInputChange} type="text" name="ciudad" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">Provincia</label>
              <input onChange={handleInputChange} type="text" name="provincia" className="form-control" id="inputProvince" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">Profesion</label>
              <input onChange={handleInputChange} type="text" name="profesion" className="form-control" id="inputProfesion" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputMail">Mail</label>
              <input onChange={handleInputChange} type="email" name="mail" className="form-control" id="inputMail" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputName">Nombre</label>
              <input onChange={handleInputChange} type="text" name="nombre" className="form-control" id="inputName" />
            </div>
            <button className="button small  m-auto button-amigote" onClick={handleSubmit}>Solicitar Registro</button>
          </div>
          <ToastContainer autoClose={10000} pauseOnHover draggable closeOnClick />
        </div>
        </div>
      </div>
    </>
  );
};

export { Register };