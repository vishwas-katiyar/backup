import React, { useState ,useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const CustomAleart = (props) => {
  const [position, setPosition] = useState("top-start");
  const [show, setShow] = useState(props.showAlert);
  useEffect(()=>{
    setShow(props.showAlert);
  },[props.time])

  return (
    <ToastContainer  position="top-end" className="p-3" style={{zIndex: '1021'}} >
      <Toast onClose={() => setShow(false)} show={show}  delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto"> {props.headData}</strong>
          <small>{props.statusData}</small>
        </Toast.Header>
        <Toast.Body className="text-left">{props.bodyData}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomAleart;
