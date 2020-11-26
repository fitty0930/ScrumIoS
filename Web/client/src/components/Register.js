import React, { Component, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { register } from "./Users_WaitFunctions";
import "react-toastify/dist/ReactToastify.css";
const Register = (props) => {
  const { t } = useTranslation();
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
      <div className="sombreado sombreado2 cualquiera">
        <div className="col-8 m-auto h-100 bg-light rounded">
          <h3>Registro</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEdad">{t('Register.age')}</label>
              <input type="text" onChange={handleInputChange} name="edad" className="form-control" id="inputEdad" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCountry">{t('Register.country')}</label>
              <input onChange={handleInputChange} type="text" name="pais" className="form-control" id="inputCountry" />
            </div>
          </div>
          <div className="form-group row">
            <div class="12u$ col-4">
              <div class="select-wrapper">
                <select id="inputInteres" onChange={handleInputChange} name="interes" className="form-control">
                  <option value="">{t('Register.gameTasteLevel')}</option>
                  <option value="nada">{t('Register.nothing')}</option>
                  <option value="poco">{t('Register.little-bit')}</option>
                  <option value="le-da-igual" defaultValue>{t('Register.same')}</option>
                  <option value="mucho">{t('Register.a-lot')}</option>
                  <option value="fantástico">{t('Register.fantastic')}</option>
                </select>
              </div>
            </div>
            <div class="12u$ col-4">
              <div class="select-wrapper">
                <select id="inputTiempo" onChange={handleInputChange} name="tiempo" className="form-control">
                  <option value="">{t('Register.gameTimeLevel')}</option>
                  <option value="nada">{t('Register.nothing')}</option>
                  <option value="poco">{t('Register.little-bit')}</option>
                  <option value="le-da-igual" defaultValue>{t('Register.same')}</option>
                  <option value="mucho">{t('Register.a-lot')}</option>
                  <option value="fantástico">{t('Register.fantastic')}</option>
                </select>
              </div>
            </div>
            <div class="12u$ col-4">
              <div class="select-wrapper">
                <select id="inputGenero" onChange={handleInputChange} name="genero" className="form-control">
                  <option value="">{t('Register.gender')}</option>
                  <option value="masculino" defaultValue>{t('Register.male')}</option>
                  <option value="otro">{t('Register.other')}</option>
                  <option value="femenino">{t('Register.female')}</option>
                </select>
              </div>
            </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">{t('Register.city')}</label>
              <input onChange={handleInputChange} type="text" name="ciudad" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">{t('Register.state')}</label>
              <input onChange={handleInputChange} type="text" name="provincia" className="form-control" id="inputProvince" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputProvince">{t('Register.profession')}</label>
              <input onChange={handleInputChange} type="text" name="profesion" className="form-control" id="inputProfesion" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputMail">{t('Register.mail')}</label>
              <input onChange={handleInputChange} type="email" name="mail" className="form-control" id="inputMail" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputName">{t('Register.name')}</label>
              <input onChange={handleInputChange} type="text" name="nombre" className="form-control" id="inputName" />
            </div>
            <button className="button small  m-auto button-amigote" onClick={handleSubmit}>{t('Register.request-registration')}</button>
          </div>
          <ToastContainer autoClose={10000} pauseOnHover draggable closeOnClick />
        </div>
        </div>
      </div>
    </>
  );
};

export { Register };