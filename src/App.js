import { React, useState, useEffect } from "react";
// import Switch from 'react-router'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./containers/ProductListing";
import Header from "./containers/Header";
import "./App.css";
import ProductDetails from "./containers/ProductDetails";
import Category from "./containers/Category";
import CategorySeperate from "./containers/CategorySeperate";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import CustomAleart from "./containers/Aleart";
import { useDispatch, useSelector } from "react-redux";
import PlacementMultiExample from "./containers/Aleart";
import useToken from "./containers/useToken";
// import { history } from './history'

// history=createBrowserHistory()

function App() {
  // const { token, removeToken, setToken } = useToken();
  const userToken = localStorage.getItem("token");

  const dispatch = useDispatch();
  let toast = useSelector((state) => state.toast);

  const [showAlter, setShowAlter] = useState(false);
  const [ToastData, setAlertData] = useState({
    headData: toast.headData,
    statusData: toast.statusData,
    showAlert: toast.showAlert,
    bodyData: toast.bodyData,
  });
  var current = new Date();
  useEffect(() => {
    // console.log("hererere");
    setAlertData({
      headData: toast.headData,
      statusData: toast.statusData,
      showAlert: toast.showAlert,
      bodyData: toast.bodyData,
      time: current.toLocaleTimeString(),
    });
  }, [toast]);
  useEffect(() => {
    // console.log("hererere");
  }, [userToken]);
  return (
    <div className="App">
      {/* <Router> */}
      {console.log(userToken)}
      {!userToken && userToken !== "" && userToken !== undefined ? (
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route>404 Not Found!</Route> */}
          <Route path="*" exact={true} element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/store" element={<ProductListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/" element={<Dashboard token={userToken} />} />

            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route
              path="/category/:CategoryId"
              element={<CategorySeperate />}
            />

            <Route>404 Not Found!</Route>
          </Routes>
        </>
      )}
      {/* </Router> */}
      <CustomAleart
        headData={ToastData.headData}
        statusData={ToastData.statusData}
        showAlert={ToastData.showAlert}
        bodyData={ToastData.bodyData}
        time={ToastData.time}
      />
    </div>
  );
}

export default App;
