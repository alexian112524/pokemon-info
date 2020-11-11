import React from 'react';

const TypeDetails = (props) => {

    return (
        <div className="TypeDetails">
            <h4 className="type-details-subtitle">{props.title}</h4>
            <ul className="type-details-detail">
                {props.details.map(elem => (
                    <li key={elem.name}>{elem.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TypeDetails;