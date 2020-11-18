import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import {Link} from 'react-router-dom'
import {getUsers, deleteUser} from './Userslistfunctions'
import firebase from '../firebase'
import './AdminStyles.css';
import { withTranslation } from 'react-i18next';
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
                        <Link to='/home'>
                            <button type="submit" className="boton-administrar-maschico" >{this.props.t('WaitingUsersList.back')}</button>
                        </Link>
                    </div>
                </header>
            <div>
                    <div className="col-10 mx-auto my-2 contenedorListaUser overflow-auto" id="listaUserEspera">
                        <div className="sticky-top rounded-pill m-1 h-50 d-inline-block">
                            <h1 className="text-black p-1">{this.props.t('WaitingUsersList.user-list')}<span className="font-weight-bold">{this.props.t('WaitingUsersList.on-hold')}</span>:</h1>
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
                                        <button type="button" className="btn btn-color rounded-pill btn-admin-user" onClick={() => this.aceptUser(user.mail)} id={user.mail}>{this.props.t('WaitingUsersList.accept')}</button>
                                        <button type="button" className="btn btn-color rounded-pill btn-admin-user" onClick={() => this.rejectUser(user.mail)} id={user.mail}>{this.props.t('WaitingUsersList.reject')}</button>
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
export default withTranslation()(ListaUsersWait);