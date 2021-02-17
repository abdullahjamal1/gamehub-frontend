import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import LoginContext from "../contexts/loginContext";
import { Col, Image, Navbar, Nav, Form, Button, FormControl, NavDropdown } from "react-bootstrap";

const NavBar = ({ user }) => {
  const loginModal = useContext(LoginContext);
  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
  <Navbar.Brand href="/games"> <i class="fa fa-gamepad fa-2x" aria-hidden="true">GameHub</i> </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/games" className="btn btn-light">Games</Nav.Link>
      <Nav.Link href="/genres" className="btn btn-light">Genres</Nav.Link>
      <Nav.Link href="/users" className="btn btn-light">Users</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
    
          {!user && (
            <React.Fragment>
              <Nav.Link
                className="nav-link nav-item mr-auto btn btn-light mr-sm-2 border-dark"
                onClick={loginModal.onHandleShow}
                href="#"
              >
                Login <i class="fa fa-sign-in" aria-hidden="true"></i>
              </Nav.Link>

              <Nav.Link
                className="nav-link nav-item  navbar-right btn btn-light border-dark"
                href="/register"
              >
                Sign Up
              </Nav.Link>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <img
                src={process.env.REACT_APP_API_URL + `/users/23/avatar`}
                styles={{ maxWidth: "5 px", maxHeight: "5 px" }}
                className="thumbnail "
              />
              <Nav.Link
                className="nav-link nav-item navbar-right btn btn-light mr-sm-2"
                href="/profile"
              >
                {user.sub}
              </Nav.Link>

              <Nav.Link
                className="nav-link nav-item navbar-right btn btn-light"
                href="/logout"
              >
                Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
              </Nav.Link>
            </React.Fragment>
          )}
  </Navbar.Collapse>
</Navbar>
  );
};

export default NavBar;
