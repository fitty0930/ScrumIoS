import React, {Component, useEffect, useState} from "react";

class Progress extends Component {
    constructor () {
        super();
        this.state = {
          levels : [],
          levelsFilter : [],
          filtro : "Nivel",
        }
        this.loadLevels();
    }
    getUsers  (){
        var firebaseConfig = {
            apiKey: "AIzaSyBqdvaUqNByD_R0zIhLMRPDQ677iwSetMc",
            authDomain: "scrum-game-uade.firebaseapp.com",
            databaseURL: "https://scrum-game-uade.firebaseio.com",
            projectId: "scrum-game-uade",
            storageBucket: "scrum-game-uade.appspot.com",
            messagingSenderId: "919500917072",
            appId: "1:919500917072:web:0018ded1ca394039a70455",
            measurementId: "G-ES5W27SK2R"
          }
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics(); // por alguna razon no es necesario
          var db = firebase.firestore();

          function searchByMail(mail) {
            let array= [];
            db.collection('users').doc(mail).collection('levels').get().then((querySnapshot) => { // consulta de colecciones anidada, con el mail busco el progreso de niveles
              querySnapshot.forEach((docu) => {
                array.push(docu);
                });
            })
            return array;
          }
          
          let arrayUsers = [];

          db.collection("users").get().then((querySnapshot) => { // busca en la db, coleccion users y hace un get
            querySnapshot.forEach((doc) => {
                arrayUsers.push({
                    userName: doc.name,
                    levels: searchByMail(doc.id)
                }); // con el id de la colecc users que es un mail busco en la coleccion siguiente
            });  
            console.log(arrayUsers);    
        });
    }

    setFiltro = (e) =>{
        if(e.target.value === 'percent'){
            this.setState({
                filtro: "Porcentaje"
            });
        }
        if(e.target.value === 'level'){
            this.setState({       
                filtro: "Nivel"
            });
        }
    }
    getFiltro = (e) =>{
        let array= [];
        if(e.target.value === ''){
            array = this.state.levels;
            this.setState({
                levelsFilter: array
            }); 
        }
        if(e.target.value != '' && this.state.filtro === "Nivel"){
            for (let item of this.state.levels) {
                if(item.level == e.target.value){
                    array.push(item);
                }   
            }
            this.setState({
                levelsFilter: array
            });
        }
        if(e.target.value != '' && this.state.filtro == "Porcentaje"){
            for (let item of this.state.levels) {
                if(item.percent == e.target.value){
                    array.push(item);
                }   
            }
            this.setState({
                levelsFilter: array
            });
        }
    }
    loadLevels = () => {
        this.state.levelsFilter = this.state.levels;  
    };
    render() {
        return (
            <>
                <div className="row col-10 mx-auto">
                    <div>
                        <h1>Mis Niveles</h1>
                    </div>
                    <form className="form-inline mx-auto">
                        <div className="form-group padding-auto mx-5">
                            <select className="custom-select rounded-pill" id="inputGroupSelect01" onChange={this.setFiltro}>
                                <option selected>Filtrar Por</option>
                                <option value="level">Nivel</option>
                                <option value="percent">Porcentaje</option>
                            </select>
                            <input type="number" onChange={this.getFiltro} className="form-control input-color rounded-pill" id="formGroupExampleInput" placeholder={this.state.filtro}/>
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
                                item.percent === 100 ? 
                                    <li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                    <p>{"nivel: "+item.level+" "+item.percent+"%"}</p> <button className="btn btn-primary text-left collapsed" type="button" data-toggle="collapse" data-target={"#collapseExample" + item.level} aria-expanded="false" aria-controls="collapseExample" >SubNiveles</button>
                                    
                                    <div className="collapse cardLevel" id={"collapseExample" + item.level}>
                                        <div className="card card-body cardLevel">
                                            <ol>
                                                <li>
                                                    <p>SubLevel : 1, sarasa sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                                <li>
                                                    <p>SubLevel : 2 sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                                <li>
                                                    <p>SubLevel : 3 sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                                <li>
                                                    <p>SubLevel : 4 sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>     
                                    </li>
                                : item.percent >= 50 ?
                                    <li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                        <p>{"nivel: "+item.level+" "+item.percent+"%"+" "+" EN CURSO"}</p> <button className="btn btn-primary text-left collapsed" type="button" data-toggle="collapse" data-target={"#collapseExample" + item.level} aria-expanded="false" aria-controls="collapseExample" >SubNiveles</button>
                                        <div className="collapse cardLevel" id={"collapseExample" + item.level}>
                                            <div className="card card-body cardLevel">
                                                <ol>
                                                    <li>
                                                        <p>SubLevel : 1, sarasa sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                    </li>
                                                    <li>
                                                        <p>SubLevel : 2 sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                    </li>
                                                    <li>
                                                        <p>SubLevel : 3 sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                    </li>
                                                    <li>
                                                        <p>SubLevel : 4 sarasa sarasa sarasa sarasa sarasa</p>
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>     
                                    </li>
                                : 
                                <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                    <p>{"nivel: "+item.level+" "+item.percent+"%"}</p> <button className="btn btn-primary text-left collapsed" type="button" data-toggle="collapse" data-target={"#collapseExample" + item.level} aria-expanded="false" aria-controls="collapseExample" >SubNiveles</button>
                                
                                    <div className="collapse cardLevel" id={"collapseExample" + item.level}>
                                        <div className="card card-body cardLevel">
                                            <ol>
                                                <li>
                                                    <p>SubLevel : 1, sarasa sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                                <li>
                                                    <p>SubLevel : 2 sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                                <li>
                                                    <p>SubLevel : 3 sarasa sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                                <li>
                                                    <p>SubLevel : 4 sarasa sarasa sarasa sarasa sarasa</p>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>                                     
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