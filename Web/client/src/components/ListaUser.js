import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './AdminStyles.css';
export function ListaUsers(){
    const [filterValue, setFilterValue] = useState('')  
    
    const users = [
        {uid:1, name:"Benja", puntos:12000,  mail:"Mail123@testing.com"},
        {uid:2, name:"Martin", puntos:11000, mail:"Mail456@testing.com"},
        {uid:3, name:"Tomas", puntos:10000, mail:"Mail789@testing.com"},
        {uid:4, name:"Juan", puntos:9000,    mail:"Mail234@testing.com"},
        {uid:5, name:"Franco", puntos:8000,  mail:"Mail567@testing.com"},
        {uid:6, name:"Joel", puntos:7000,    mail:"Mail890@testing.com"},
        {uid:7, name:"Cassoli", puntos:7000, mail:"Mail012@testing.com"},
        {uid:8, name:"Nico", puntos:7000,    mail:"Mail654@testing.com"},
    ]
    
    //Funcion que retorna los usuarios filtrados
    const filteredUsers = users.filter(entry => entry.name.toLowerCase().includes(filterValue.toLowerCase())
    || entry.mail.toLowerCase().includes(filterValue.toLowerCase()))
    
    function handleChange(e){
        setFilterValue(e.target.value)
    }
    
    
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
        </div>
        )
    }
        
        