import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../store/userSlice';

const DropDown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    };


    return (
        <>
            <div className='dropdown-items profile'>
                <i className="fa-solid fa-user"></i>
                <NavLink to='/profile'>Profile</NavLink>
            </div>
            <div className='dropdown-items my-posts'>
                <i className="fa-solid fa-file"></i>
                <NavLink to='/dashboard'>My Ads</NavLink>
            </div>
            <div className='dropdown-items logout'>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </>
    );
};

export default DropDown;