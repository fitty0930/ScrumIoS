import React, { Component } from 'react';
import {Filtrar} from './components/Filtro';
import {ListaUsers} from './components/ListaUser';

class AdminUsers extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Filtrar filterValue={filterValue} setFilterValue={setFilterValue}/>
                <ListaUsers users={users} filterValue={filterValue}/>
            </div>
        );
    }
}

export default AdminUsers;