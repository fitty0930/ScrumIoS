import React, { Suspense, Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'

import { withTranslation } from 'react-i18next';

import  NavBar  from './NavBar';
import  Footer  from './Footer';

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

    componentDidMount(){
        if(!localStorage.getItem('session')){
            this.props.history.push({
                pathname:"/login",
                state: {errormessage: true}
              });
        }else{
            this.cargarUsuarios();
        }
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
            <div className="mt-2">
           
                <NavBar/>
                
                <div className="col-10 mx-auto overflow-auto cualquiera" id="listaUser">
                    <div className="row">
                        <h4>{this.props.t('UserList.user-list')}</h4>
                        <div className="form-group padding-auto ml-auto">
                            <input type="text" className="form-control" id="inputFilterUser" placeholder={this.props.t('UserList.filter-user')} value={this.state.filterValue} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div class="table-wrapper table-amigote">
                        <table>
                            <thead>
                                <tr>
                                    <th>{this.props.t('Register.name')}</th>
                                    <th>{this.props.t('Register.mail')}</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filteredUsers.map((user) => (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.mail}</td>
                                        <td></td>
                                        <td>
                                            <Link to={"/user/" + user.mail}>
                                                <button type="button" className="button small ml-2 button-amigote" id={user.mail}>{this.props.t('UserList.admin')}</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}   
export default withTranslation()(ListaUser);
