import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Table,
  Card,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loggedInAdmin, dashboardData } from "../redux/actions/productActions";
import { useNavigate } from "react-router";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import { MDBDataTable } from 'mdbreact';

// import Dashboard from "./Dashboard";

function Dashboard(props) {
  // const dashboard = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [modelData, setmodelData] = useState({
    email: "not defined",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let logindetails = useSelector((state) => state.logindetails);
  let data_dashboard = useSelector((state) => state.dashboardData);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  var res = {};
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/dashboard",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    }).then((response) => {
      // console.log(response.data);
      dispatch(dashboardData(JSON.parse(response.data.data)));
      console.log(response.data.count);
      // count = ;
      setCount(JSON.parse(response.data.count)[0]);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    console.log(modelData);
  }, [modelData]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  // console.log(data_dashboard);

  function onFornEdit(e) {
    console.log("formsubmitted");
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log("formDataObj", formDataObj);

    const response = axios({
      method: "post",
      url: "http://127.0.0.1:5000/onUpdate",
      data: formDataObj,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response.data);
        setCount(count + 1);
        // addRow(formDataObj);
        // debugger;
        dispatch(loggedInAdmin(response.data));
        handleClose();
        // navigate("/Dashboard");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  function onEdit(e) {
    // e.preventDefault();

    console.log(e);
    // console.log(data);
    const response = axios({
      method: "post",
      url: "http://127.0.0.1:5000/getEmployee",
      data: { emp_id: e },
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then(function (response) {
        console.log(response.data);
        console.log(JSON.parse(response.data.data));

        setmodelData(JSON.parse(response.data.data));
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    setmodelData({
      emp_id: e,
    });
    setShow(true);
  }

  // const productsGenerator = () => {
  const products = [];
  // const columns = [];
  Object.values(data_dashboard).map(function (keyName, keyIndex) {
    products.push({
      id: keyName.id,
      emp_id: keyName.emp_id,
      full_name: keyName.full_name,
      age: keyName.age,
      email: keyName.email,
      phone_no: keyName.phone_no,
      salary: keyName.salary,
      username: keyName.username,
      cbutton: (
        <Button variant="primary" onClick={() => onEdit(keyName.id)}>
          Edit
        </Button>
      ),
    });
  });

  // console.log(products);
  const columns = [
    {
      dataField: "emp_id",
      text: "S.No",
      sort: true,
    },
    {
      dataField: "id",
      text: "Emp. Id",
      sort: true,
    },
    {
      dataField: "full_name",
      text: "full_name",
      sort: true,
    },
    {
      dataField: "age",
      text: "age",
      sort: true,
    },
    {
      dataField: "email",
      text: "email",
      sort: true,
    },
    {
      dataField: "phone_no",
      text: "phone_no",
      sort: true,
    },
    {
      dataField: "salary",
      text: "salary",
      sort: true,
    },
    {
      dataField: "username",
      text: "username",
      sort: true,
    },
    {
      dataField: "cbutton",
      text: "Edit",
    },
  ];
  const onUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    const response = axios({
      method: "post",
      url: "http://127.0.0.1:5000/onUpdate",
      data: formDataObj,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response.data);
        setCount(count + 1);
        // addRow(formDataObj);
        // debugger;
        dispatch(loggedInAdmin(response.data));
        handleClose();
        // navigate("/Dashboard");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  function updateInput(e, keyName) {
    // var table = document.getElementById("dataTable");
    // console.log(e, keyName);
    const state = { ...modelData };
    // console.log(state);
    state[keyName] = e.target.value;
    // console.log({...state});
    setmodelData({...state});
    // var rowCount = table.rows.length;
    // var row = table.insertRow(rowCount);

    // Object.values(formDataObj).map(function (k, i) {
    //   console.log(k, i);
    //   var cell3 = row.insertCell(i);
    //   cell3.innerHTML = cell3.innerHTML + k;
    // });
  }

  return (
    <Container>
      {/* <Table striped bordered hover id="dataTable">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
      <h1> {count} </h1> */}
      <Button variant="primary" onClick={handleShow}>
        Launch Last modal
      </Button>

      <br></br>

      <Modal size="lg" show={show} onHide={handleClose}>
        <br></br>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFornEdit}>
            <Row>
              {!modelData && modelData !== "" && modelData !== undefined ? (
                <h2> Loading.....</h2>
              ) : (
                Object.keys(modelData).map(function (keyName, keyIndex) {
                  // console.log(keyName, keyIndex);
                  return (
                    <Col sm={6}>
                      <Form.Group
                        className="mb-3"
                        controlId={keyIndex }
                      >
                        <Form.Label>{keyName }</Form.Label>
                        <Form.Control
                          name={keyName }
                          // type="email"
                          placeholder={modelData.keyName }
                          value={modelData[keyName] }
                          onChange={(e) => {
                            updateInput(e, keyName);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  );
                })
              )}
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder={modelData.email}
                    value={modelData.email}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="name_last"
                    type="text"
                    placeholder={modelData.name_last}
                    value={modelData.name_last}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <h2>Employees Details</h2>
      <div className="App">
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={products}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
      </div>
    </Container>
  );
}
export default Dashboard;
