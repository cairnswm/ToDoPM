import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLayout from "../components/pagelayout";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Error Set", error);
  }, [error]);

  const handleSubmit = async (e) => {
    console.log("Handle Submit");
    e.preventDefault();
    setError(""); 

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Attempting registration with:", { email });
      const result = await register(email, password, confirmPassword);
      console.log("Registration response:", result);

      console.log("Do we have errors?", !!result?.errors);
      if (!!result?.errors) {
        console.log("Error type:", typeof result.errors);
        console.log("Error value:", result.errors);

        if (Array.isArray(result.errors)) {
          console.log("Errors array:", result.errors);
          console.log("error", result.errors[0]);
          setError(result.errors[0].message);
        } else if (typeof result.errors === "string") {
          setError(result.errors);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else if (!result?.token) {
        setError("Registration failed. Please try again.");
      } else {
        console.log("Registration successful. Navigating to /profile");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <PageLayout>
      <Card style={{ maxWidth: "400px" }} className="mx-auto">
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>

          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" className="w-100" onClick={(e)=>handleSubmit(e)}>
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </PageLayout>
  );
};

export default Register;
