import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, login, logout } from '../store/userSlice';
import DropDown from './DropDown';

const BasicNavbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Navbar expand="lg" className="pt-4 pb-3 border-bottom bg-dark-subtle">
        <Container>
          <Navbar.Brand>
            <Link to="/">Mobify</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapse" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ms-auto">
              {!user && (
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
                  <div className='dropdown' onClick={() => setOpen(!open)}>
                    <span className='user-icon'>
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <span className={`angle-down ${open ? 'inactive' : 'active'}`}>
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                    <span className={`angle-up ${open ? 'active' : 'inactive'}`}>
                      <i className="fa-solid fa-angle-up"></i>
                    </span>

                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                      <DropDown />
                    </div>
                  </div>

                  <div className='bars'>
                    <i className="fa-solid fa-bars"></i>
                  </div>
                  <div className='close-btn'>
                    <i className="fa-solid fa-xmark"></i>
                  </div>

                  <div className='ad-post'>
                    <NavLink to='/post'>
                      <i className="fa-solid fa-plus"></i>
                      <span>Sell</span>
                    </NavLink>
                  </div>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BasicNavbar;
