import React, { useState, useEffect, useCallback } from 'react';
import loadingLogo from './loading-spinner.gif';

const Spinner = () => {
    return (
        <div className="Spinner">
            <img height="50px" alt="loading-spinner" src={loadingLogo}></img>
        </div>
    );
}

export default Spinner;