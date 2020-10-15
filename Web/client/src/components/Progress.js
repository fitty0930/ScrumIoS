import React, { Component, useEffect, useState } from "react";
// import firebase from "firebase/app"; // ESTO PARECIERA QUE SIRVE PARA IMPORTAR
import firebase from "../firebase"
// USATE UN npm install --save firebase y te descarga las dependencias de la toronja esta que usan de db 
// SOLUCIONAMOS QUE YA NO TIENE ERRORES, LO MALO ES QUE NO MUESTRA NADA 
// DICE JUAN CRUZ QUE TIENE QUE VER CON EL MATETE QUE HAS HECHO AHI ABAJO
// ...



class Progress extends Component {
    constructor() {
        super();
        this.state = {
            levels: [{}],
            levelsFilter: [{}],
            filtro: "Nivel",
            mail: "anmartinez@uade.edu.ar"
        }

        // this.loadLevels();
        // this.getUsers();
    }

    componentDidMount (){
        this.loadLevels();
    }
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
    loadLevels = () => {
        // if(this.state.mail != ""){
            let db = firebase.firestore();
            let array = [];
            db.collection('users').doc(this.state.mail).collection('levels').get().then((querySnapshot) => { // consulta de colecciones anidada, con el mail busco el progreso de niveles
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
        console.log(this.state.levelsFilter)
        return (
            <>
                <div className="row col-10 mx-auto">
                    <div>
                        <h1>Mis Niveles</h1>
                    </div>
                    <form className="form-inline mx-auto">
                        <div className="form-group padding-auto mx-5">
                            <select className="custom-select rounded-pill" id="inputGroupSelect01" onChange={this.setFiltro} >
                                <option defaultValue>Filtrar Por</option>
                                <option value="level">Nivel</option>
                                <option value="EN CURSO">En Curso</option>
                                <option value="NO INICIADO">No Iniciado</option>
                            </select>
                            {   this.state.filtro === "Nivel" ? 
                                <input type="text"  onChange={this.getFiltro} className="form-control input-color rounded-pill" id="formGroupExampleInput" placeholder={this.state.filtro} />
                            : ""
                            }
                        </div>
                    </form>
                    <div>
                        <h1>Logo</h1>
                    </div>
                </div>
                <div className="col-10 mx-auto contenedorListaUser overflow-auto list-levels">
                    <ul className="list-group">
                        {
                            this.state.levelsFilter.map((item, index) =>
                                item.status == "HECHO" ?
                                    <li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                        <p>{"nivel: " + item.levelId + " " + item.status }</p> <p>SubLevelID: {item.sublevelID}</p>
                                    </li>
                                    : item.status == "EN CURSO" ?
                                        <li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                            <p>{"nivel: " + item.levelId + " " + item.status}</p> <p>SubLevelID: {item.sublevelID}</p>
                                        </li>
                                        :
                                        <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                            <p>{"nivel: " + item.levelId + " " + item.status}</p> <p>SubLevelID: {item.sublevelID}</p>
                                            
                                        </li>
                            )
                        }
                    </ul>
                </div>
            </>
        )
    }
}
export default Progress;