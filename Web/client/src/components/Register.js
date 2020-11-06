import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
class Register extends Component {
  

  render() {
    const notification = () => 
    toast('Tu solicitud será procesada en brevedad');
    return (
      <>
        <div className="col-8 m-auto h-100">
{/*           <form>
 */}            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEdad">Edad</label>
                <input type="email" className="form-control" id="inputEdad" />
              </div>
              <div className="form-group col-md-6">
                <label for="inputCountry">País</label>
                <input type="email" className="form-control" id="inputCountry" />
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
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="form-group col-md-6">
                <label for="inputProvince">Provincia</label>
                <input type="text" className="form-control" id="inputProvince" />
              </div>
              <div className="form-group col-md-6">
                <label for="inputMail">Mail</label>
                <input type="mail" className="form-control" id="inputMail" />
              </div>
              <div className="form-group col-md-6">
                <label for="inputName">Nombre</label>
                <input type="username" className="form-control" id="inputName" />
              </div>
            </div>
            <button className="btn btn-primary float-right" onClick={notification}>
              Solicitar Registro
            </button>
            <ToastContainer autoClose={5000} pauseOnHover draggable closeOnClick />
          {/* </form> */}
        </div>
      </>
    );
  }
}
export default Register;
