import React from 'react';
import { Link } from 'react-router-dom';

const TypeDetails = (props) => {

    return (
        <div className="TypeDetails">
            <h4 className="type-details-subtitle">{props.title}</h4>
            <ul className="type-details-detail">
                {props.details.map(elem => (
                    <li key={elem.name}>
                        <Link>{elem.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TypeDetails;