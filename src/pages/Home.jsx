import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to FakeStore!</h1>
      <p className="lead">Browse our massive collection of mock products.</p>
      <Button as={Link} to="/products" variant="primary" size="lg">
        Shop Now
      </Button>
    </Container>
  );
};

export default Home;
