import React, { Component, useEffect, useState } from "react";
import firebase from "../firebase" //importamos el archivo firebase que configuro el db, para conectarnos a la misma
// ...
import {Link} from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import  NavBar  from './NavBar';
import  Footer  from './Footer';



class Progress extends Component {

    constructor(props) {
        super();
        this.state = {
            levels: [{}],
            levelsFilter: [{}],
            filtro: "Nivel",
            mail: ""
        }

        // this.loadLevels();
        // this.getUsers();
    }
    //componentDidMount se ejecuta despues de que se monto el componente en el browsser
    componentDidMount (){
        if(!localStorage.getItem('session')){
            this.props.history.push({
                pathname: "/login",
                state: {errorMessege : true},
            });
        }else{
            this.loadLevels();
        }
    }
    //setFiltro su funcion es cambiar el tipo de filtrado que se va a realizar
    setFiltro = (e) => {
        if (e.target.value === 'level') {
            this.setState({
                filtro: "Nivel"
            });
            this.setState({
                levelsFilter: this.state.levels
            });
        }
        if (e.target.value === 'EN CURSO') {
            let array = [];
            this.setState({
                filtro: "En Curso"
            });
            for (let item of this.state.levels) {
                if (item.status === "EN CURSO") {
                    array.push(item);
                }
            }
            this.setState({
                levelsFilter: array
            });
        }
        if (e.target.value === 'NO INICIADO') {
            let array = [];
            this.setState({
                filtro: "No Iniciado"
            });
            for (let item of this.state.levels) {
                if (item.status === '"NO INICIADO"') {
                    array.push(item);
                }
            }
            this.setState({
                levelsFilter: array
            });
        }
    }
    //getFiltro su funcion es traer todos los niveles a funcion del tipo de filtrado seleccionado
    getFiltro = (e) => {
        let array = [];
        if (e.target.value === '') {
            array = this.state.levels;
            this.setState({
                levelsFilter: array
            });
        }
        if (e.target.value != '' && this.state.filtro === "Nivel") {
            for (let item of this.state.levels) {
                if (item.levelId == parseInt(e.target.value, 10)) {
                    array.push(item);
                }
            }
            this.setState({
                levelsFilter: array
            });
        }
    }
    //loadlevels es para cargar de forma incial todos los niveles del usuarios con el mail del mismo traidos de la base de datos firestore,
    //esta funcion se ejecuta cuando el componente se monto en el browsser
    loadLevels = () => {
        // if(this.state.mail != ""){
        let mail = "";
        if (this.props.location.query != undefined) {
            mail = this.props.location.query;
        } else {
            let valueUrl = window.location.pathname.split("/");
            mail = valueUrl[2];
        }
        this.setState({
            mail: mail
        });


        let db = firebase.firestore();
        let array = [];
        db.collection('users').doc(mail).collection('levels').get().then((querySnapshot) => { // consulta de colecciones anidada, con el mail busco el progreso de niveles
            querySnapshot.forEach((docu) => {
                array.push(docu.data());
            });
            this.setState({
                levelsFilter: array,
                levels: array
            });
        });
        // }
    };
    render() {
        return (
            <>
                <div className="mt-2">
                <NavBar/>
                <div className="col-10 mx-auto overflow-auto" id="listaUser">
                    <div className="row">
                        <h4>Lista de Niveles:</h4>
                        <div className="form-group padding-auto ml-auto">
                            <form className="form-inline mx-auto">
                                <div className="form-group padding-auto mx-5 row">
                                    {this.state.filtro === "Nivel" ?
                                        <input type="text" onChange={this.getFiltro} className="form-control col-6" id="formGroupExampleInput" placeholder={this.state.filtro} />
                                        : ""
                                    }
                                    <div class="12u$ col-6">
                                        <div class="select-wrapper">
                                            <select id="inputGroupSelect01" onChange={this.setFiltro} className="form-control">
                                            <option defaultValue>Filtrar Por</option>
                                            <option value="level">Nivel</option>
                                            <option value="EN CURSO">En Curso</option>
                                            <option value="NO INICIADO">No Iniciado</option>
                                            </select>
                                        </div>
                                    </div>                                   
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="table-wrapper table-amigote">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Sub-Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.levelsFilter.map((item, index) =>
                                    <tr>
                                        <td>Nivel {item.levelId}</td>
                                        <td>{item.status}</td>
                                        <td>{item.sublevelID}</td>
                                    </tr>    
                            )
                        }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer/>
            </div>
            </>
        )
    }
}
export default withTranslation()(Progress);