import React,{memo} from 'react';
import {filters} from "../../constants";
import './Filter.css';

const Filter = memo(({inputChange,filter}) => {
    return (
        <div className="filter">
            <h5 className="filter-title">Количество пересадок</h5>
            <div className="check-buttons">
                {Object.keys(filters).map(criteria =>  (
                    <div key={criteria} className="check-button-container">
                        <input type="checkbox" name={criteria} checked={filter[criteria]} onChange={inputChange} className="check-button" id={criteria}/>
                        <label htmlFor={criteria} className="filter-label">{filters[criteria]}</label>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Filter;
