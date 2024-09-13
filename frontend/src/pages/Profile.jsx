import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/userSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);


    return (
        <div className='profile-page'>
            <div className="profile-img">
                <img
                    src="./src/assets/3d-business-guy-with-backpack-and-laptop.png"
                    alt="3d-guy-image" />
            </div>
            <div className='user-profile'>
                <div className='page-title fs-1 border-bottom pb-4 mb-3'>Your Profile</div>
                <div className='field-group'>
                    <span className='title fs-3'>Name</span>
                    <span className='data fs-3 p-3'>{user.name}</span>
                </div>
                <div className='field-group'>
                    <span className='title fs-3'>Email</span>
                    <span className='data fs-3 p-3'>{user.email}</span>
                </div>
                <div className='field-group'>
                    <span className='title fs-3'>Address</span>
                    <span className='data fs-3 p-3'>{user.address}</span>
                </div>
                <div className='field-group'>
                    <span className='title fs-3'>Contect Info</span>
                    <span className='data fs-3 p-3'>{user.phoneNumber}</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;