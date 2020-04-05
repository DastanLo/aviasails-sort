import React from 'react';
import img from '../../assets/S7@2x.png';
import './FlightCard.css';
import OneFlight from "./OneFlight/OneFlight";

const FlightCard = ({price,flights}) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className="price">{price}</span>
                <img src={img} alt="logo" className="logo-img"/>
            </div>
            {
                flights.map((f,index) => {
                    return <OneFlight key={index} fromTo={`${f.origin}-${f.destination}`} date={f.date} duration={f.duration} stops={f.stops}/>
                })
            }
        </div>
    );
};

export default FlightCard;
