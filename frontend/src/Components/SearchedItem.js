// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Card, Row, Col, Container, Spinner, Alert } from "react-bootstrap";

// const SearchedItem = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const query = queryParams.get("query");
//   const category = queryParams.get("category");

//   const [searchproducts, setSearchProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/user/searchproduct?query=${query}&category=${category}`
//         );

//         if (response.status === 200 && response.data.data) {
//           setSearchProducts(response.data.data.reverse());
//           setError("");
//         } else if (response.data.message) {
//           setSearchProducts([]);
//           setError("No products found.");
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError("Error fetching products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (query && category) {
//       fetchProducts();
//     }
//   }, [query, category]);

//   return (
//     <Container className="my-4 pb-4 mb-5">
//       <h1 style={{ color: "black", marginBottom: "2rem" }}>
//         Search Results for "{query}" in Category: {category}
//       </h1>

//       {loading ? (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : (
//         <Row xs={1} sm={2} md={3} lg={3} className="g-4">
//           {searchproducts.length > 0 ? (
//             searchproducts.map((product) => (
//               <Col key={product._id}>
//                 <Card
//                   className="shadow-sm"
//                   style={{
//                     height: "auto",
//                     borderRadius: "12px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <Card.Img
//                     variant="top"
//                     src={`http://localhost:5000/${product.images[0]}`}
//                     alt={product.name}
//                     height="200"
//                     style={{
//                       objectFit: "cover",
//                       borderBottom: "1px solid #ddd",
//                     }}
//                   />
//                   <Card.Body>
//                     <Card.Title>{product.name}</Card.Title>
//                     <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>
//                       {product.description}
//                     </Card.Text>
//                     <Card.Text>
//                       <strong>Price:</strong> ₹{product.price}
//                     </Card.Text>
//                     <Card.Text>
//                       <strong>Category:</strong> {product.category}
//                     </Card.Text>
//                     <div
//                       className="d-flex align-items-center justify-content-between"
//                       style={{ marginBottom: "10px" }}
//                     ></div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default SearchedItem;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { Card, Row, Col, Container, Spinner, Alert } from "react-bootstrap";

const SearchedItem = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const category = queryParams.get("category");
  const navigate = useNavigate(); // Initialize useNavigate

  const [searchproducts, setSearchProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleProductClick = (product) => {
    navigate("/productdetail", { state: { product } });
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/user/searchproduct?query=${query}&category=${category}`
        );

        if (response.status === 200 && response.data.data) {
          setSearchProducts(response.data.data.reverse());
          setError("");
        } else if (response.data.message) {
          setSearchProducts([]);
          setError("No products found.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    if (query && category) {
      fetchProducts();
    }
  }, [query, category]);

  return (
    <Container
      className="my-4 pb-4 mb-5"
      style={{ minHeight: "90vh", marginTop: "60px" }}
    >
      <h1 style={{ color: "black", marginBottom: "2rem" }}>
        Search Results for "{query}" in Category: {category}
      </h1>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {searchproducts.length > 0 ? (
            searchproducts.map((product) => (
              <Col key={product._id}>
                <Card
                  className="shadow-sm d-flex flex-column"
                  style={{
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                  onClick={() => handleProductClick(product)}
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt={product.name}
                    height="200"
                    style={{
                      objectFit: "cover",
                      borderBottom: "1px solid #ddd",
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>
                      {product.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ₹{product.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>Category:</strong> {product.category}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default SearchedItem;
