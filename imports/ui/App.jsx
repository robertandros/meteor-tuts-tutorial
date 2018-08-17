import React from 'react';
import PropTypes from 'prop-types';

export default function App({ children }) {
    return (
        <div className="app-container" id="app-container">
            {children}
        </div>
    );
}

App.propTypes = {
    children: PropTypes.array
};

