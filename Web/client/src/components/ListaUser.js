import React from 'react'
import {Link} from 'react-router-dom'

export function ListaUsers({users, filterValue}){
    const filteredUsers = users.filter(entry => entry.name.toLowerCase().includes(filterValue.toLowerCase()))

    return(
        <div>
            <div className="col-10 mx-auto contenedorListaUser overflow-auto">
                <ul className="list-group" id="lista-usuarios">
                    {filteredUsers.map((user) => (
                        <div key={user.id}>
                            <li className="list-group-item d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                <div className="col-8">
                                    {user.name}  
                                </div>
                                <div className="position-left align-items-left">
                                    {user.puntos}  
                                </div>
                                <Link to={"/user/"+user.id}>
                                    <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.id}>Administrar</button>
                                </Link>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

