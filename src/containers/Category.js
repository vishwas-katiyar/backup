import React, { useEffect,  useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { categoryProduct } from "../redux/actions/productActions";
import ListCategory from "./ListCategory"
import { Container } from "react-bootstrap";
const Category = () => {

  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        console.log(response.data);
        dispatch(categoryProduct(response.data));
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <Container>
     <ListCategory />
    </Container>
  );
};

export default Category;
