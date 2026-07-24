import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to load product data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://fakestoreapi.com/products/${id}`, formData)
      .then((res) => {
        console.log(
          "Updated (This is a testing API. No data was changed.):",
          res.data,
        );
        setMessage(
          "Product successfully updated! (This is a testing API. No data was changed.)",
        );
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error updating product.");
      });
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Edit Product</h2>
      {message && (
        <Alert
          variant={
            message.includes("Error") || message.includes("Failed")
              ? "danger"
              : "success"
          }
        >
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="warning" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
