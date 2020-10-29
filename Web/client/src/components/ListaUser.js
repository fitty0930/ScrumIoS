import React from 'react'
import {Link} from 'react-router-dom'
import './AdminStyles.css';
export function ListaUsers({users, waitingUsers, filterValue}){
    const filteredUsers = users.filter(entry => entry.name.toLowerCase().includes(filterValue.toLowerCase())
    || entry.mail.toLowerCase().includes(filterValue.toLowerCase()))
    const filteredWaitingUsers = waitingUsers.filter(entry => entry.name.toLowerCase().includes(filterValue.toLowerCase())
    || entry.mail.toLowerCase().includes(filterValue.toLowerCase()))
    
    //Funcion de visualizacion/cambio entre lista de usuarios y usuarios en espera de aprobacion
    setTimeout(() => {
        document.querySelector("#btn-toggle").addEventListener("click", ()=>{
            document.querySelector("#listaUser").toggleAttribute("hidden")
            document.querySelector("#listaUserEspera").toggleAttribute("hidden")
            document.querySelector("#addOnEspera").toggleAttribute("hidden")
        })
    }, 2000);

    return(
        <div>
        {console.log(users)}
            <div className="col-10 mx-auto contenedorListaUser overflow-auto" id="listaUser">
                <div className="sticky-top rounded-pill m-1 h-50 d-inline-block">
                    <h1 className="text-black p-1">Lista de Usuarios:</h1>
                </div>
                <ul className="list-group" id="lista-usuarios">
                    {filteredUsers.map((user) => (
                        <div key={user.uid}>
                            <li className="list-group-item d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                <div className="col-8">
                                    {user.name}  
                                </div>
                                <div className="position-left align-items-left">
                                    {user.mail}  
                                </div>
                                <Link to={"/user/"+user.uid}>
                                    <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.uid}>Administrar</button>
                                </Link>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="col-10 mx-auto my-2 contenedorListaUser overflow-auto" id="listaUserEspera" hidden>
                <div className="sticky-top rounded-pill m-1 h-50 d-inline-block">
                    <h1 className="text-black p-1">Lista de Usuarios <span className="font-weight-bold">en espera</span>:</h1>
                </div>
                <ul className="list-group" id="lista-usuarios">
                    {filteredWaitingUsers.map((user) => (
                        <div key={user.uid}>
                            <li className="list-group-item d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                <div className="col-8">
                                    {user.name}  
                                </div>
                                <div className="position-left align-items-left">
                                    {user.mail}  
                                </div>
                                <Link to={"/user/"+user.uid}>
                                    <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.uid}>Aceptar</button>
                                </Link>
                                <Link to={"/user/"+user.uid}>
                                    <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.uid}>Rechazar</button>
                                </Link>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="col-10 mx-auto my-1">
                <button type="button" id="btn-toggle" className="btn btn-primary float-right">Ver usuarios <span id="addOnEspera">en espera</span></button>
            </div>
        </div>
    )
}

