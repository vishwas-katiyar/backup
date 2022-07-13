import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import ProductCategoryComponent from "./ProductCategoryComponent"
import {
  selectedCategory,
  removeSelectedCategory,
} from "../redux/actions/productActions";
const CategorySeperate = () => {
  const { CategoryId } = useParams();
  // console.log(useSelector());
  let products = useSelector((state) => state.selectedCategory);
  // console.log();
//   const { image, title, price, category, description } = products;
  const dispatch = useDispatch();
  const fetchcategoryDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/category/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    console.log(response.data);

    dispatch(selectedCategory(response.data));
  };

  useEffect(() => {
    if (CategoryId && CategoryId !== "") fetchcategoryDetail(CategoryId);
    return () => {
      dispatch(removeSelectedCategory());
    };
  }, [CategoryId]);
  return (
    <Container>
      {console.log(products.id)}
      {Object.keys(products).length === 0 ? (
        <div>...Loading</div>
      ) : (
          <ProductCategoryComponent />
      )}
    </Container>
  );
};

export default CategorySeperate;
