import React from 'react';
import PropTypes from 'prop-types';
import { Navbar,Nav,NavDropdown,Container } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import {BsTelephoneFill} from "react-icons/bs"
import { useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import './Navigation.css';
import { useSelector } from 'react-redux';


const Navigation = () => {
  const state = useSelector(state => state)
  
  return  (
    <Navbar bg="dark" expand="lg" variant="dark">
    <Container fluid>
      <Navbar.Brand href="/home">WeCare</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className = "justify-content-end">
        <Nav>
          {state.login.isAuthenticated ?
            <>
              <NavLink to = {state.login.isCoach ? "/coachviewprofile" : "/userviewprofile"}  className = " mt-2 me-3 text-white navlink">View Profile</NavLink>
              {state.login.isCoach ? <NavLink to = {"/coachschedules"}  className = "mt-2 me-3 text-white navlink">My Schedules</NavLink>
              :
              <NavLink to = {"/userappointments"}  className = "mt-2 me-3 text-white navlink">My Appointments</NavLink>
              }
              <IconContext.Provider value={{ color: "white"}}>
              <Navbar.Brand >
                <BsTelephoneFill/>
                Call Us:  080 22233447
              </Navbar.Brand>
            </IconContext.Provider>
              <Nav.Link href = "/home" className = "me-3 text-white">Logout</Nav.Link>
              
            </> :
            <>
            <Nav.Link href = "/" className = "me-3 text-white">Login</Nav.Link>
            <IconContext.Provider value={{ color: "white"}}>
            <Navbar.Brand >
              <BsTelephoneFill/>
              Call Us: +1 (504)-123-4567
            </Navbar.Brand>
          </IconContext.Provider>
          </>
          }
        
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Navigation;