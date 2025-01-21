import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import {
  Card,
  Row,
  Col,
  Container,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap"; // Import Bootstrap components

const SearchedItem = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const category = queryParams.get("category");

  console.log("Search Query:", query);
  console.log("Category:", category);

  const [searchproducts, setSearchProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To handle error messages

  // Cart state (this could be moved to a global state or context)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading state
      try {
        const response = await axios.get(
          `http://localhost:5000/user/searchproduct?query=${query}&category=${category}`
        );
        console.log("Response Data:", response.data); // Log the response

        if (response.status === 200 && response.data.data) {
          console.log("Fetched Products:", response.data.data); // Log fetched data before setting state
          setSearchProducts(response.data.data.reverse()); // Set the products data
          setError(""); // Clear any previous error
        } else if (response.data.message) {
          setSearchProducts([]); // No products found
          setError("No products found.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    if (query && category) {
      fetchProducts(); // Only fetch products if query and category are provided
    }
  }, [query, category]);

  // Function to add product to cart
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log("Product added to cart:", product);
  };

  return (
    <Container className="my-4 pb-4 mb-5">
      {!loading}
      {
        <h1 style={{ color: "black", marginBottom: "2rem" }}>
          Search Results for "{query}" in Category: {category}
        </h1>
      }

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> // Bootstrap loading spinner
      ) : error ? (
        <Alert variant="danger">{error}</Alert> // Display error message if any
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {searchproducts.length > 0 ? (
            searchproducts.map((product) => (
              <Col key={product._id}>
                <Card
                  style={{
                    height: "500px",
                    overflow: "hidden",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt={product.name}
                    height="200"
                    style={{ objectFit: "contain" }}
                  />
                  <Card.Body className="pb-5">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>Price: ₹{product.price}</Card.Text>
                    <Card.Text>Category: {product.category}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No products found.</p> // Message if no products found
          )}
        </Row>
      )}
    </Container>
  );
};

export default SearchedItem;
