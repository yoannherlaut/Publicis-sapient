import React from 'react';

import { Link } from 'react-router-dom';

const Styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    code: {
        fontSize: 80,
        color: '#e94e27',
    },
};

const NotFound = () => {
    return (
        <div className={Styles.container}>
            <h1 className={Styles.code}>404</h1>
            <p>Oops, Page Not Found </p>
            <Link to='/'>
                <button backgroundcolor='#313646' color='#fff'>
                    Return to Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
