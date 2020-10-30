import React from 'react'
import {Link} from 'react-router-dom'
import './AdminStyles.css';
export function ListaUserWait({waitingUsers, filterValue}){
    //Funcion que retorna los usuarios filtrados
    const filteredWaitingUsers = waitingUsers.filter(entry => entry.name.toLowerCase().includes(filterValue.toLowerCase())
    || entry.mail.toLowerCase().includes(filterValue.toLowerCase()))

    

    return(
        <div>
        {console.log(waitingUsers)}
        <div>
                <div className="col-10 mx-auto my-2 contenedorListaUser overflow-auto" id="listaUserEspera">
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
            </div>
        </div>
    )
}



