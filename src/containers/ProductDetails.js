import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Container, Row } from "react-bootstrap";

import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";
const ProductDetails = () => {
  const { productId } = useParams();
  // console.log(useSelector());
  let product = useSelector((state) => state.product);
  // console.log();
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    console.log(response.data);

    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (
    <Container>
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <Card style={{ margin: "10%" }}>
          <Row style={{ width: "100%" }}>
            <Card.Img
              bg="primary"
              variant="top"
              src={image}
              style={{ width: "18rem", border: "black 1px solid" }}
            />

            <Card.Body style={{ width: "50%",border: "black 1px solid" }}>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                {category}
                <hr />
                {description}
              </Card.Text>
              <Button variant="primary">{price}</Button>
            </Card.Body>
          </Row>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetails;
