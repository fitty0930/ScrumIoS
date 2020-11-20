import React, { Suspense, Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import './AdminStyles.css';

import  NavBar  from './NavBar';

class ListaUser extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            filterValue: "",
            filteredUsers: [],
            guia: false
        }
        this.cargarUsuarios = this.cargarUsuarios.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filtrar = this.filtrar.bind(this);
    }

    //Funcion de filtro de la lista de usuarios
    filtrar() {
        let users = this.state.users;
        if (this.state.guia) {
            let arrFilteredUsers = users.filter(entry => entry.name.toLowerCase().includes(this.state.filterValue.toLowerCase())
                || entry.mail.toLowerCase().includes(this.state.filterValue.toLowerCase()));
            this.setState({ filteredUsers: arrFilteredUsers });
            console.log(this.state.filteredUsers);
        } else {
            this.setState({ filteredUsers: users });
            this.state.guia = true;
        }
    }

    handleChange(e) {
        this.setState({ filterValue: e.target.value });
        setTimeout(() => {
            this.filtrar();
        }, 5);
    }

    componentDidMount() {
        this.cargarUsuarios();
    }
    //conexion con firebase para traer usuarios
    cargarUsuarios() {
        let db = firebase.firestore()
        db.collection("users").get().then((res) => {
            res.forEach((doc) => {
                this.state.users.push(doc.data());
            });
            this.setState({ filteredUsers: this.state.users })
        });
    }

    render() {
        return (
            <div>
                  <NavBar />
                <header className="row col-10 mx-auto">
                    <div>
                        <Link to='/home'>
                            <button type="submit" className="boton-administrar-maschico" >Volver</button>
                        </Link>
                    </div>
                    <form className="form-inline mx-auto">
                        <div className="form-group padding-auto mx-5">
                            <input type="text" className="form-control input-color rounded-pill" id="inputFilterUser" placeholder="Filtrar por Usuario" value={this.state.filterValue} onChange={this.handleChange} />
                        </div>
                    </form>
                </header>
                <div className="col-10 mx-auto contenedorListaUser overflow-auto" id="listaUser">
                    <div className="sticky-top rounded-pill m-1 h-50 d-inline-block">
                        <h1 className=" jumbotron jumbotron-fluid rounded-pill text-black p-1 ">Lista de Usuarios:</h1>
                    </div>
                    <ul className="list-group" id="lista-usuarios">
                        {this.state.filteredUsers.map((user) => (
                            <div key={user.uid}>
                                <li className="list-group-item d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                    <div className="col-8">
                                        {user.name}
                                    </div>
                                    <div className="position-left align-items-right">
                                        {user.mail}
                                    </div>
                                        <Link to={"/user/" + user.mail}>
                                            <button type="button" className="btn btn-color rounded-pill btn-admin-user ml-1" id={user.mail}>Administrar</button>
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

