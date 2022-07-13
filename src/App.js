// import React, { Component }  from 'react';
import React, { useEffect } from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import { Home } from "./features/Home";
import { Chat } from "./features/Chat";
import "./App.css";
import {  Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectChatData } from "./features/chatSlice";

function App() {
  const chat = useSelector(selectChatData);
  const room = localStorage.getItem("room");
  useEffect(() => {
    // first/

    console.log(chat);
  }, [chat]);

  return (
    <div className="App">
      {console.log(room)}
      {chat.value === 0 && !room ? (
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route>404 Not Found!</Route> */}
          <Route path="*" exact={true} element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route></Route>
        </Routes>
      ) : (
        <>
          {/* <Header /> */}
          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/Category" element={<Category />} /> */}
            {/* <Route path="/" element={<Dashboard token={userToken} />} /> */}

            {/* <Route path="/product/:productId" element={<ProductDetails />} /> */}
            {/* <Route */}
            {/* path="/category/:CategoryId" */}
            {/* element={<CategorySeperate />} */}
            {/* /> */}

            <Route>404 Not Found!</Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
