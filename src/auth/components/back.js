import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

const Back = ({ to }) => {
    const navigate = useNavigate();

    return to ? (
        <Link to={to} className="text-decoration-none m-1 btn btn-link">
            <ArrowLeft /> Back
        </Link>
    ) : (
        <button onClick={() => navigate(-1)} className="text-decoration-none m-1 btn btn-link">
            <ArrowLeft /> Back
        </button>
    );
};

export default Back;