import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, status, error } = useSelector(state => state.user);

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const [errors, seterrors] = useState({
        email: '',
        password: ''
    });

    const validate = () => {
        let newerrors = {};

        if (!formValues.email) {
            newerrors.email = 'Email is required';
        }

        if (!formValues.password) {
            newerrors.password = 'Password is required';
        }

        seterrors(newerrors);
        return Object.keys(newerrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        seterrors((preverrors) => ({ ...preverrors, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const action = await dispatch(login(formValues));
                if (login.fulfilled.match(action)) {
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    navigate('/');
                } else {
                    seterrors({ ...error, server: action.payload.error || 'Login failed' });
                }

            } catch (error) {
                console.error('Login failed', error);
                seterrors({ ...error, server: 'An unexpected error occurred' });
            }
        }

    };

    return (
        <Container className='login-form'>
            <Form onSubmit={handleSubmit} className='custom-form'>
                <div className='form-title text-center display-2 border-bottom w-100'>Login</div>
                <Form.Group className='mt-4 mb-3 group'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={formValues.email}
                        onChange={handleChange} />
                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                </Form.Group>
                <Form.Group className='mb-3 group'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        placeholder='Enter email'
                        value={formValues.password}
                        onChange={handleChange} />
                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                    {error && <div className='error py-4 ps-2 mt-4'>{error}</div>}
                </Form.Group>
                <div className='form-btn w-100'>
                    <Button
                        variant='primary'
                        type='submit'
                        size='lg'
                        className="py-3 px-4 my-3 fs-5 w-100"
                    >
                        Login
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;