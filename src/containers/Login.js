import { React, useState } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router'
// import history from '../history';
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loggedInAdmin, toast } from "../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Toast from "react-bootstrap/Toast";

import CustomAleart from "./Aleart";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    const response = axios({
      method: "post",
      url: "http://127.0.0.1:5000/SignUp",
      data: formDataObj,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response.data.msg);
        
        dispatch(
          toast({
            headData: response.data.msg,
            statusData: "now",
            showAlert: true,
            bodyData: formDataObj.email,
          })
        );
        dispatch(loggedInAdmin(response.data));
        // navigate("/Dashboard");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        dispatch(
          toast({
            headData: response.msg,
            statusData: "now",
            showAlert: true,
            bodyData: formDataObj.email,
          })
        );
      });
  };
  const onLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    const response = axios({
      method: "post",
      url: "http://127.0.0.1:5000/login",
      data: formDataObj,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        // console.log(response.status);
        if (response.status == 200) {
          console.log(response.data);
          localStorage.setItem("token", response.data.data.token);

          // props.saveToken({ "response.data": "hello" });
          dispatch(loggedInAdmin(response.data));
          dispatch(
            toast({
              headData: response.data.msg,
              statusData: "now",
              showAlert: true,
              bodyData: formDataObj.email,
            })
          );
          // history.push('/')

          navigate("/");
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        //handle error
        console.log(err);
        console.log(err.code);

        if (err.code == "ERR_NETWORK") {
          // setShowAlter(true)
          dispatch(
            toast({
              headData: err.message,
              statusData: "now",
              showAlert: true,
              bodyData: "Server Not Reachable or Network error...",
            })
          );
          // alert("lool");

          console.log(err);
        }

        if (err.response.status == 401) {
          // setShowAlter(true)
          dispatch(
            toast({
              headData: err.response.statusText,
              statusData: "now",
              showAlert: true,
              bodyData: err.response.data.msg,
            })
          );
          // alert("lool");

          console.log(err);
        }
        // console.log();
      });
  };

  return (
    // <div>
    <Container className="text-center">
      <br></br>

      <Row>
        <Col>
          <Card>
            <Card.Header>Sign-Up</Card.Header>
            <Card.Body>
              <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    // onChange={onInput}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    // onChange={onInput}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    // onChange={onInput}
                    name="cpassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Log-In</Card.Header>
            <Card.Body>
              <Form onSubmit={onLogin}>
                <Form.Group className="mb-3" controlId="formBasicloginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicloginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <CustomAleart headData="User Logged in Successully.." statusData="now" bodyData="ejnlwkejwekj" /> */}

      {/* <div className="d-flex justify-content-center" > */}
      {/* <CustomAleart headData={ToastData.headData} statusData={ToastData.statusData} showAlert={showAlter} bodyData={ToastData.bodyData} /> */}
      {/* </div> */}
    </Container>
    // </div>
  );
}
export default Login;
