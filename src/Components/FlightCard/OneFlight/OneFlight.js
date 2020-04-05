import React from 'react';
import moment from 'moment';

function getTimeFromMin(min) {
    let hours = Math.trunc(min/60);
    let minutes = min % 60;
    return hours + 'ч ' + minutes + 'м.';
};

const OneFlight = ({fromTo,date,duration,stops}) => {
    const startFlyTime = moment(date).format('HH:mm');
    const landingTime = moment(date).add(duration,'minutes').format('HH:mm');
    return (
        <div className="card-items">
            <div className="card-bottom">
                <span className="napr">{fromTo}</span>
                <span className="time">{`${startFlyTime} - ${landingTime}`}</span>
            </div>
            <div className="card-bottom">
                <span className="napr">В пути</span>
                <span className="time">{getTimeFromMin(duration)}</span>
            </div>
            <div className="card-bottom">
                <span className="napr">{stops.length} Пересадки</span>
                <span className="time">{stops.join('-')}</span>
            </div>
        </div>
    );
};

export default OneFlight;
