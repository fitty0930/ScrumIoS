import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import {Link, useHistory } from 'react-router-dom'
import {getUsers, deleteUser} from './Userslistfunctions'
import firebase from '../firebase'
import './AdminStyles.css';
import { withTranslation } from 'react-i18next';
import  NavBar  from './NavBar';
import  Footer  from './Footer';

class ListaUsersWait extends Component {
    constructor() {
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



    sendMail(data) {
        emailjs.send("service_d16913k", "template_vwt9yfd", {
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

    darAltaUser(user) {
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

    aceptUser(id) {
        const data = { mail: id }
        deleteUser(data).then(res => {
            this.darAltaUser(res.data)
            let dato = {
                name: res.data.name,
                texto: " Su usuario ha sido aceptado. Su contrasena es: " + res.data.name + res.data.age + ".",
                mail: res.data.mail,
            }
            console.log(dato)
            this.sendMail(dato)
            this.getWaitingUsers()
        })
    }

    rejectUser(id) {
        const data = { mail: id }
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
        if(!localStorage.getItem('session')){
            this.props.history.push({
                pathname:"/login",
                state: {errormessage: true}
              });
        }else{
            this.getWaitingUsers()
        }
    }

    render() {
        return (
            <div className="mt-2">
                <NavBar />
                <div>
                    <div className="col-10 mx-auto my-2 overflow-auto" id="listaUserEspera">
                        <div className="row">
                            <h4>Lista de usuarios en espera:</h4>
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
                                    {this.state.waitingUsers.map((user) => (
                                        <tr>
                                            <td>{user.name}</td>
                                            <td>{user.mail}</td>
                                            <td>
                                                <button type="button" className="button small ml-2 button-amigote" onClick={() => this.aceptUser(user.mail)} id={user.mail}>{this.props.t('WaitingUsersList.accept')}</button>
                                            </td>
                                            <td>
                                                <button type="button" className="button small ml-2 button-amigote" onClick={() => this.rejectUser(user.mail)} id={user.mail}>{this.props.t('WaitingUsersList.reject')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default withTranslation()(ListaUsersWait);