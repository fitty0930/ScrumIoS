import React, {useState, Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from '../firebase'
import './AdminStyles.css';

    
    class ListaUser extends Component {

        constructor(){
            super()
            this.state = {
                users: [],
                filterValue: "",
                setFilterValue: ""
            }
            this.cargarUsuarios = this.getWaitingUsers.bind(this)
        }

        //Funcion de filtro de la lista de usuarios
        filtrar(){
            filteredUsers = this.state.users.filter(entry => entry.name.toLowerCase().includes(this.state.filterValue.toLowerCase())
            || entry.mail.toLowerCase().includes(this.state.filterValue.toLowerCase()))
        }

        handleChange(e){
            this.state.setFilterValue(e.target.value)
        }

        //conexion con firebase para traer usuarios
        cargarUsuarios(){
            let db = firebase.firestore()
            db.collection("users").get().then((res) => {
                res.forEach((doc) => {
                    this.state.users.push(doc.data())
                });
            });
        }

        render() {
            return (
                <div>
                    <header className="row col-10 mx-auto">
                        <div>
                            <h1 className="col-2">Back</h1>
                        </div>
                        <form className="form-inline mx-auto">
                            <div className="form-group padding-auto mx-5">
                                <input type="text" className="form-control input-color rounded-pill" id="inputFilterUser" placeholder="Filtrar por Usuario" value={this.state.filterValue} onChange={this.handleChange()}/>
                            </div>
                        </form>
                        <div>
                            <h1 className="col-2">Logo</h1>
                        </div>
                    </header>
                    <div className="col-10 mx-auto contenedorListaUser overflow-auto" id="listaUser">
                        <div className="sticky-top rounded-pill m-1 h-50 d-inline-block">
                            <h1 className="text-black p-1">Lista de Usuarios:</h1>
                        </div>
                        <ul className="list-group" id="lista-usuarios">
                            {this.filteredUsers.map((user) => (
                                <div key={user.uid}>
                                    <li className="list-group-item d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                        <div className="col-8">
                                            {user.name}  
                                        </div>
                                        <div className="position-left align-items-left">
                                            {user.mail}  
                                        </div>
                                        <Link to={"/user/"+user.mail}>
                                            <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.mail}>Administrar</button>
                                        </Link>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }
    }
    
    export default ListaUser;
    
        