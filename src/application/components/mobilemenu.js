import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./mobilemenu.css";

const MobileMenuItem = ({ to, children }) => {
  return (
    <Card className="my-1 mobile-menu-item">
      <Link style={{ textDecoration: "none" }} to={to}>
        <Card.Body className="text-center">
          <h1>{children}</h1>
        </Card.Body>
      </Link>
    </Card>
  );
};

const MobileMenu = () => {
  return (
    <Container>
      <MobileMenuItem to="/profile">Profile</MobileMenuItem>
      <MobileMenuItem to="/subscriptions">Subscriptions</MobileMenuItem>
      <MobileMenuItem to="/dashboard">Dashboard</MobileMenuItem>
    </Container>
  );
};

export default MobileMenu;
