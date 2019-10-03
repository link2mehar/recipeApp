import React from 'react';


const Recpie = ({title,calories,image}) => {
    return (
        <div className="list">
            <h1>{title}</h1>
            <p>{calories}</p>
            <img src={image} />
        </div>
    );
}

export default Recpie;