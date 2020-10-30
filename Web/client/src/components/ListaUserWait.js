import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './AdminStyles.css';
export function ListaUserWait(){
    const [filterValue, setFilterValue] = useState('')  

    function handleChange(e){
        setFilterValue(e.target.value)
    }

    //Funcion que retorna los usuarios filtrados
    const filteredWaitingUsers = waitingUsers.filter(entry => entry.name.toLowerCase().includes(filterValue.toLowerCase())
    || entry.mail.toLowerCase().includes(filterValue.toLowerCase()))

    const waitingUsers = [
        {uid:1, name:"Benja1", puntos:12000,  mail:"Mail123@testing.com"},
        {uid:2, name:"Martin2", puntos:11000, mail:"Mail456@testing.com"},
        {uid:3, name:"Tomas3", puntos:10000, mail:"Mail789@testing.com"},
        {uid:4, name:"Juan4", puntos:9000,    mail:"Mail234@testing.com"},
        {uid:5, name:"Franco5", puntos:8000,  mail:"Mail567@testing.com"},
        {uid:6, name:"Joel6", puntos:7000,    mail:"Mail890@testing.com"},
        {uid:7, name:"Cassoli7", puntos:7000, mail:"Mail012@testing.com"},
        {uid:8, name:"Nico8", puntos:7000,    mail:"Mail654@testing.com"},
    ]

    return(
        <div>
            <header className="row col-10 mx-auto">
                <div>
                    <h1 className="col-2">Back</h1>
                </div>
                <form className="form-inline mx-auto">
                    <div className="form-group padding-auto mx-5">
                        <input type="text" className="form-control input-color rounded-pill" id="inputFilterUser" placeholder="Filtrar por Usuario" value={filterValue} onChange={handleChange}/>
                    </div>
                </form>
                <div>
                    <h1 className="col-2">Logo</h1>
                </div>
            </header>
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



