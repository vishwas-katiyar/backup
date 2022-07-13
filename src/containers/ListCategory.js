import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";

// import { Card, Table, Row } from "react-bootstrap";
// import "./table.css";

function ListCategory() {
  const categorys = useSelector((state) => state.category);

//   {console.log("categorys list ", categorys);}
  return (
    // <div>
    <Container>
      {/* <ul> */}
      {Object.keys(categorys).map(function (keyName, keyIndex) {
        return (
          <Link to={"/category/" + categorys[keyName]}>
            <Button key={keyName}>
              {categorys[keyName]}
              {console.log(categorys[keyName])}
            </Button>
          </Link>
        );
      })}
      {/* </ul> */}
    </Container>
    // </div>
  );
}
export default ListCategory;
