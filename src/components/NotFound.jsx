
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <h2 className="mb-4">Page Not Found</h2>
                <Link to="/login" className="btn btn-dark">
                    Go to Login Page
                </Link>
            </div>
        </div>
    );
};

export default NotFound;