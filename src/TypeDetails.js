import React, { useState, useEffect } from 'react';

const TypeDetails = (props) => {

    return (
        <div className="TypeDetails">
            <h4 className="">{props.title}</h4>
            <ul className="type-detail">
                {props.details.map(elem => (
                    <li key={elem.name}>{elem.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TypeDetails;