import React, { Component, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {register} from "./Users_WaitFunctions";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
const Register =(props)=> {
  const { t } = useTranslation();
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
    const [profesion, setProfesion] = useState("");
    const handleSubmit = (event) => {
      notification();
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <div className="col-8 m-auto h-100 bg-light rounded">
          {/*           <form>
           */}{" "}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEdad">{this.props.t('Register.age')}:</label>
              <input type="number" onChange={handleInputChange} name="edad" className="form-control" id="inputEdad" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCountry">{this.props.t('Register.country')}</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="pais"
                className="form-control"
                id="inputCountry"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-4">
              <label for="inputInteres">{t('Register.gameTasteLevel')}</label>
              <select id="inputInteres"onChange={handleInputChange} name="interes" className="form-control">
                <option  value="nada">{t('Register.nothing')}</option>
                <option value="poco">{t('Register.little-bit')}</option>
                <option value="le-da-igual" defaultValue>
                {t('Register.same')}
                </option>
                <option value="mucho">{('Register.a-lot')}</option>
                <option value="fantástico">{t('Register.fantastic')}</option>
              </select>
            </div>
            <div className="col-4">
              <label for="inputInteres">{t('Register.gameTimeLevel')}</label>
              <select id="inputTiempo" onChange={handleInputChange} name="tiempo" className="form-control">
                <option value="nada">{t('Register.nothing')}</option>
                <option value="poco">{t('Register.little-bit')}</option>
                <option value="le-da-igual" defaultValue>
                {t('Register.same')}
                </option>
                <option value="mucho">{t('Register.a-lot')}</option>
                <option value="fantástico">{t('Register.fantastic')}</option>
              </select>
            </div>
            <div className="col-4">
              <label for="inputGenero">{t('Register.gender')}</label>
              <select id="inputTiempo" onChange={handleInputChange} name="genero" className="form-control">
                <option value="masculino" defaultValue>
                {this.props.t('Register.male')}
                </option>
                <option value="otro">{t('Register.other')}</option>
                <option value="femenino">{t('Register.female')}</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">{t('Register.country')}</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="ciudad"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">{t('Register.state')}</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="provincia"
                className="form-control"
                id="inputProvince"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">{t('Register.profession')}</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="profesion"
                className="form-control"
                id="inputProfesion"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputMail">{t('Register.mail')}</label>
              <input
                onChange={handleInputChange}
                type="mail"
                name="mail"
                className="form-control"
                id="inputMail"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputName">{t('Register.name')}</label>
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
            {t('Register.request-registration')}
          </button>
          <ToastContainer
            autoClose={5000}
            pauseOnHover
            draggable
            closeOnClick
          />
        </div>
      </>
    );
  };

export {Register};