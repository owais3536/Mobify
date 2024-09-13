import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { getCurrentUser, logout } from '../store/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OffCanvasNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, status } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);


    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container>
                        <Navbar.Brand>
                            <NavLink to='/'>Mobify</NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {user === null && (
                                        <div className="form-btn ms-auto d-flex gap-3">
                                            <NavLink
                                                to="/login"
                                                className="text-decoration-none text-dark fs-4">
                                                Login
                                            </NavLink>
                                            <NavLink
                                                to="/signup"
                                                className="text-decoration-none text-dark fs-4">
                                                Signup
                                            </NavLink>
                                        </div>
                                    )}
                                    {user && (
                                        <>
                                            <Button variant='outline-danger' onClick={handleLogout}>Logout</Button>
                                            <div className='ad-post'>
                                                <NavLink to='/post'>
                                                    <i className="fa-solid fa-plus"></i>
                                                    <span>Sell</span>
                                                </NavLink>
                                            </div>
                                        </>
                                    )}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default OffCanvasNavbar;