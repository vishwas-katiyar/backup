import React from "react";
import axios from "axios";
// import { push } from 'react-router-redux'
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router";
import { Nav, NavDropdown, Navbar, Container, Button } from "react-bootstrap";
const Header = () => {
  let navigate = useNavigate();
  // const history = useHistory();
  function logMeOut(props) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
    })
      .then((response) => {
        console.log("clicked Logout");
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("clicked Logout 2222");
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <div>
      <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        <Button  variant="light" onClick={logMeOut} >Logout</Button>
        </Container>
        {/* <Button onClick={logMeOut}>Logout</Button> */}
      </Navbar>
    </div>
  );
};

export default Header;
