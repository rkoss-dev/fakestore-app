import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Row xs={1} md={3} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <Card className="h-100 text-center p-3 shadow-sm">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ height: "200px", objectFit: "contain" }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-6 text-truncate">
                {product.title}
              </Card.Title>
              <Card.Text className="fw-bold">${product.price}</Card.Text>
              <Button
                as={Link}
                to={`/products/${product.id}`}
                variant="outline-primary"
                className="mt-auto"
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
