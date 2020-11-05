import React from 'react'
import {Link} from 'react-router-dom'
import './AdminStyles.css';
export function ListaUsers({users, filterValue}){
    const filteredUsers = users.filter(entry => entry.name.toLowerCase().includes(filterValue.toLowerCase())
    || entry.mail.toLowerCase().includes(filterValue.toLowerCase()))

    return(
        <div>
            <div className="col-10 mx-auto contenedorListaUser overflow-auto">
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

                                {/* const backUrl = '/some/other/value'
                                // this.props.testvalue === "hello"
                                <Link to={{pathname: /${this.props.testvalue}, query: {backUrl}}} /> */}

                                <Link to={{pathname:"/user/"+user.mail, query:user.mail}}>
                                    <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.uid}>Administrar</button>
                                </Link>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

