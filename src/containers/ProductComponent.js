import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {  Container } from "react-bootstrap";

import { Card,Row } from "react-bootstrap";
// import "./table.css";

function ProductComponent({ tableTitle, tableHeadingArr, tableBodyArr }) {
  const products = useSelector((state) => state.allProducts.products);

  const listItems = products.map((product) => (
    <Link key={product.id} to={`/product/${product.id}`} style={{ width: "25%" }}>
    <Card key={product.id} >
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.category}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {product.price}Last updated 3 mins ago
        </small>
      </Card.Footer>
    </Card>
    </Link>
  ));
  return (
    // <div>
    <Container>
    <Row>{listItems}</Row>
    </Container>
    // </div>
  );
}
export default ProductComponent;
