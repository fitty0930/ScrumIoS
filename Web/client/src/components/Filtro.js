import React, {useEffect} from 'react';

export function Filtrar({filterValue, setFilterValue}){


    function handleChange(e){
            setFilterValue(e.target.value)
    }

    return ( 
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
    );
}