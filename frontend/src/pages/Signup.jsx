import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { signup } from '../store/userSlice';
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phoneNumber: ''
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phoneNumber: '',
    });


    const validate = () => {
        const newError = {};

        if (!formValues.name) {
            newError.name = 'Name is required';
        }

        if (!formValues.email) {
            newError.email = 'Email is required';
        }

        if (!formValues.password) {
            newError.password = `Password is required`;
        }
        else if (formValues.password.length < 6) {
            newError.password = `Password must be 6 characters or long`;
        }

        if (!formValues.confirmPassword) {
            newError.confirmPassword = `Password is required`;
        }
        else if (formValues.password !== formValues.confirmPassword) {
            newError.confirmPassword = `Password do not match`;
        }

        if (!formValues.address) {
            newError.address = 'Address is required';
        }

        if (!formValues.phoneNumber) {
            newError.phoneNumber = 'Contect Info is required';
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        setError((prevError) => ({ ...prevError, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate())
            dispatch(signup(formValues)).then(() => {
                setFormValues({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    address: '',
                    phoneNumber: ''
                });
                navigate('/login');
            });
    };

    return (
        <Container >
            <Form onSubmit={handleSubmit} className='custom-form'>
                <div className='form-title display-2 text-center border-bottom w-100'>Signup</div>
                <Form.Group className="group mt-4 mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        placeholder="Username"
                        name='name'
                        type="text"
                        id='"name'
                        onChange={handleChange} />
                    {error.name && <span style={{ color: "red" }}>{error.name}</span>}
                </Form.Group>
                <Form.Group className="group mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        placeholder="Example@email.com"
                        type="email"
                        name='email'
                        id='email'
                        onChange={handleChange} />
                    {error.email && <span style={{ color: "red" }}>{error.email}</span>}
                </Form.Group>
                <Form.Group className="group mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        placeholder="Password"
                        type="password"
                        value={formValues.password}
                        name="password"
                        id="password"
                        onChange={handleChange} />
                    {error.password && <span style={{ color: "red" }}>{error.password}</span>}
                </Form.Group>
                <Form.Group className="group mb-3">
                    <Form.Label>Confirm password:</Form.Label>
                    <Form.Control
                        placeholder="Password"
                        type="password"
                        value={formValues.confirmPassword}
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleChange} />
                    {error.confirmPassword && <span style={{ color: "red" }}>{error.confirmPassword}</span>}
                </Form.Group>
                <Form.Group className="group mb-3">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        placeholder="Address"
                        name='address'
                        type="text"
                        id='"address'
                        onChange={handleChange} />
                    {error.address && <span style={{ color: "red" }}>{error.address}</span>}
                </Form.Group>
                <Form.Group className="group mb-3">
                    <Form.Label>Phone number:</Form.Label>
                    <Form.Control
                        placeholder="phone number"
                        name='phoneNumber'
                        type="text"
                        id='"phoneNumber'
                        onChange={handleChange} />
                    {error.phoneNumber && <span style={{ color: "red" }}>{error.phoneNumber}</span>}
                    {error.checkEmail && <span style={{ color: "red" }}>{error.checkEmail}</span>}
                </Form.Group>
                <Button
                    type="submit"
                    variant="success"
                    className="py-3 px-4 my-3 fs-5 w-100">
                    Signup
                </Button>
            </Form>
        </Container >
    );
};

export default Signup;