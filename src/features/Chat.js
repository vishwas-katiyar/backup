import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import Header from "./Header";
import {
  Button,
  Stack,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectChatData } from "./chatSlice";
import { Form, Card, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMessage } from "./chatSlice";

export function Chat() {
  //   const { register, handleSubmit } = useForm();
  //   const [data, setData] = useState("");
  const dispatch = useDispatch();

  const chat = useSelector(selectChatData);
  const userRoom = localStorage.getItem("room");
  useEffect(() => {
    // first/
    // console.log(chat.value.room);
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/chat/getData",
      //   data: data,
      params: { room: userRoom },
      headers: {},
    })
      .then(function (response) {
        // console.log(response.data);
        dispatch(addMessage(response.data));
        // localStorage.setItem("room", response.data.room);
        // console.log(chat);
        // navigate("/chat");
      })
      .catch(function (response) {
        console.log(response);
      });
    // console.log(chat);
  }, [chat]);

  const onSubmit = (data) => {
    // setData(JSON.stringify(data));
    console.log(data);
  };

  return (
    <Container>
      <br></br>
      <h1>Chat</h1>
      {/* {console.log(JSON.parse(chat.message))} */}
      {chat.message === "None" ? (
        <>Loading ...</>
      ) : (
        Object.values(JSON.parse(chat.message)).map((rowValue, index) => {
          // console.log(JSON.parse(chat.message));
          return (
            <>
              {/* <span key={index}>{cart_products.name}</span> */}
              <Card
                bg={"dark".toLowerCase()}
                key={index}
                text={"dark".toLowerCase() === "light" ? "dark" : "white"}
                style={{ width: "18rem" }}
                className="mb-2"
              >
                <Card.Header>{rowValue.name}</Card.Header>
                <Card.Body>

                  {/* <Card.Title>{"dark"} Card Title </Card.Title> */}
                  <Card.Text>
                    {rowValue.msg}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          );
        })
      )}
    </Container>
  );
}

// export default Chat
