import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {getUsers} from './Userslistfunctions'
import './AdminStyles.css';

export function ListaUserWait(){
  
    const [waitingUsers, setWaitingUsers] = useState([])

    const getWaitingUsers = () =>{
        getUsers().then(res => {
            setWaitingUsers(res)
        })
    }
    getWaitingUsers() 
    

    

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
                    <h1 className="col-2">Logo</h1>
                </div>
            </header>
        <div>
                <div className="col-10 mx-auto my-2 contenedorListaUser overflow-auto" id="listaUserEspera">
                    <div className="sticky-top rounded-pill m-1 h-50 d-inline-block">
                        <h1 className="text-black p-1">Lista de Usuarios <span className="font-weight-bold">en espera</span>:</h1>
                    </div>
                    <ul className="list-group" id="lista-usuarios">
                        {waitingUsers.map((user) => (
                            <div key={user._id}>
                                <li className="list-group-item d-flex justify-content-between align-items-center input-color m-1 rounded-pill">
                                    <div className="col-8">
                                        {user.name}  
                                    </div>
                                    <div className="position-left align-items-left">
                                        {user.mail}  
                                    </div>
                                    {/* <Link to={"/user/"+user.uid}>
                                        <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.uid}>Aceptar</button>
                                    </Link>
                                    <Link to={"/user/"+user.uid}>
                                        <button type="button" className="btn btn-color rounded-pill btn-admin-user" id={user.uid}>Rechazar</button>
                                    </Link> */}
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}




