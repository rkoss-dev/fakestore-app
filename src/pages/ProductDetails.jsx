import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Button,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log(
          "Deleted (This is a testing API. No data was changed.):",
          res.data,
        );
        setShowModal(false);
        navigate("/products");
      })
      .catch((err) => console.error("Failed to delete", err));
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <Row className="mt-4">
        <Col md={6} className="text-center">
          <Image src={product.image} fluid style={{ maxHeight: "400px" }} />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <h4 className="text-success">${product.price}</h4>
          <p className="text-muted">Category: {product.category}</p>
          <p>{product.description}</p>
          <div className="d-flex gap-2 mt-4">
            <Button variant="primary">Add to Cart</Button>
            <Button
              as={Link}
              to={`/edit-product/${product.id}`}
              variant="warning"
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Delete
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{product?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetails;
