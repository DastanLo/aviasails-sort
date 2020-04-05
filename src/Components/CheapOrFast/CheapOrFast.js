import React from 'react';
import './CheapOrFast.css';

const CheapOrFast = ({cheapClasses,fastClasses,getFast,getCheap}) => {
    return (
        <div className="box">
            <div className={cheapClasses.join(' ')} onClick={getCheap}>
                <span>Самый дешевый</span>
            </div>
            <div className={fastClasses.join(' ')} onClick={getFast}>
               <span>Самый быстрый</span>
            </div>
        </div>
    );
};

export default CheapOrFast;
