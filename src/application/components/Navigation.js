import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { useAdmin } from "../../auth/hooks/useAdmin";
import { PersonCircle, StarFill } from "react-bootstrap-icons";
import { useSummary } from "../context/SummaryContext";

const Navigation = () => {
  const { user, logout } = useAuth();
  const isAdmin = useAdmin();
  const navigate = useNavigate();

  const { isPremium } = useSummary();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          as={Link}
          to={user ? "/home" : "/"}
          style={{ cursor: "pointer" }}
        >
          Template Application
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {user ? (
              <NavDropdown
                title={
                  <span>
                    {isPremium ? (
                      <StarFill size={20} className="me-1" style={{color:"gold", marginTop: "-7px"}} />
                    ) : (
                      <PersonCircle size={20} className="me-1" style={{marginTop: "-7px"}} />
                    )}
                    {user.firstname || "User"}
                  </span>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                {isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/settings">
                  Settings
                </NavDropdown.Item>{" "}
                <NavDropdown.Item as={Link} to="/properties">
                  Properties
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/subscriptions">
                  Subscriptions
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/comingsoon">
                  Coming Soon
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
