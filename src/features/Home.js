import React from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import Header from "./Header";

import { Button, Stack, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { updateChatData } from "./chatSlice";
import { useNavigate } from "react-router-dom";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const onSubmit = (data) => {
    setData(JSON.stringify(data));
    console.log(data);

    axios({
      method: "post",
      url: "http://127.0.0.1:5000/chat/Login",
      data: data,
      headers: {},
    })
      .then(function (response) {
        console.log(response.data);
        dispatch(updateChatData(response.data));
        localStorage.setItem("room", response.data.room);
        navigate("/chat");
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <Container>
      <br></br>
      {/* <h3>{chatRoomState}</h3> */}
      <Stack
        gap={2}
        className="col-md-5 mx-auto shadow-lg p-3 mb-5 bg-white rounded"
      >
        {/* <div border="primary" > */}
        <br></br>
        <h2>Login To Chat</h2>
        {/* <Button variant="secondary">Save changes</Button>
        <Button variant="outline-secondary">Cancel</Button> */}

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <Header /> */}

          <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              {...register("name")}
              placeholder="Enter name"
              // required
            />
          </Form.Group>

          {/* <input {...register("name")} placeholder="Name" /> */}
          <Form.Group className="mb-3" controlId="formBasicroom">
            <Form.Label>Room Number </Form.Label>
            <Form.Select
              {...register("room")}
              aria-label="Default select example"
              // name="please select"
              placeholder="Open this select menu"
              // required
            >
              <option value="0" placeholder="Open this select menu"></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>

          {/* <select >
        <option value="">Select Room...</option>
        <option value="A">Room A</option>
        <option value="B">Room B</option>
      </select> */}
          {/* <textarea {...register("aboutYou")} placeholder="About you" /> */}
          <p>{data}</p>
          <Button type="submit" varient="primary">
            Submit
          </Button>
        </Form>
      </Stack>
    </Container>
  );
}

// export default Home
