import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import {getUsers, deleteUser} from './Userslistfunctions'
import firebase from '../firebase'
import './AdminStyles.css';

class ListaUsersWait extends Component {
    constructor(){
        super()
        this.state = {
            waitingUsers: [],
        }
        this.getWaitingUsers = this.getWaitingUsers.bind(this)
    }

    getWaitingUsers(){
        getUsers().then(res => {
            this.setState({
                waitingUsers: res
            })
        })
    }
    
    

    sendMail(data){
        emailjs.send("service_d16913k","template_vwt9yfd",{
            name: data.name,
            texto: data.texto,
            mail: data.mail
        }, "user_MQPRaaR0lgvvmtsY8fJvR")
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    darAltaUser(user){
        console.log(user)
        let db = firebase.firestore()
        db.collection('users').doc(user.mail).set({
            age: user.age,
            city: user.city,
            country: user.country,
            gameTasteLevel: user.gameTasteLevel,
            gameTimeLevel: user.gameTimeLevel,
            gender: user.gender,
            mail: user.mail,
            name: user.name,
            password: user.name + user.age,
            profession: user.profession,
            state: user.state,
            uid: user._id,
        })
    }

    aceptUser(id){
        const data = {mail: id}
        deleteUser(data).then(res => {
            this.darAltaUser(res.data)
            let dato = {
                name: res.data.name,
                texto: " Su usuario ha sido aceptado. Su contrasena es: "+ res.data.name + res.data.age +".",
                mail: res.data.mail,
            }
            console.log(dato)
            this.sendMail(dato)
            this.getWaitingUsers()
        })
    }

    rejectUser(id){
        const data = {mail: id}
        deleteUser(data).then(res => {
            let dato = {
                name: res.data.name,
                texto: " Su usuario ha sido rechazado. ",
                mail: res.data.mail,
            }
            console.log(dato)
            this.sendMail(dato)
            this.getWaitingUsers()
        })
    }

    componentDidMount(){
        this.getWaitingUsers()
    }

    render() {
        return(
            <div>
                <header className="row col-10 mx-auto">
                    <div>
                        <h1 className="col-2">Back</h1>
                    </div>
                    {/* <form className="form-inline mx-auto">
                        <div className="form-group padding-auto mx-5">
                            <input type="text" className="form-control input-color rounded-pill" id="inputFilterUser" placeholder="Filtrar por Usuario" value={filterValue} onChange={handleChange}/>
                        </div>
                    </form> */}
                    <div>
                        <h1 className="col-2 float-right">Logo</h1>
                    </div>
                </header>
            <div>
                    <div className="col-10 mx-auto my-2 contenedorListaUser overflow-auto" id="listaUserEspera">
                        <div className="sticky-top rounded-pill m-1 h-50 d-inline-block">
                            <h1 className="text-black p-1">Lista de Usuarios <span className="font-weight-bold">en espera</span>:</h1>
                        </div>
                        <ul className="list-group" id="lista-usuarios">
                            {this.state.waitingUsers.map((user) => (
                                <div key={user._id}>
                                    <li className="list-group-item d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                        <div className="col-8">
                                            {user.name}  
                                        </div>
                                        <div className="position-left align-items-left">
                                            {user.mail}  
                                        </div>
                                        <button type="button" className="btn btn-color rounded-pill btn-admin-user" onClick={() => this.aceptUser(user.mail)} id={user.mail}>Aceptar</button>
                                        <button type="button" className="btn btn-color rounded-pill btn-admin-user" onClick={() => this.rejectUser(user.mail)} id={user.mail}>Rechazar</button>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListaUsersWait;