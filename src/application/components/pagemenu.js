import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageMenu = () => {
  return (
    <Navbar bg="dark" variant="dark"style={{paddingTop: "0px"}}>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
      </Nav>
    </Navbar>
  );  
}

export default PageMenu;