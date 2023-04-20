import React from "react";
import "../css/adminregister.css";
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
const CreateAdmin = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const signup = (e) => {
    e.preventDefault();
    const datas = {
      admin_name: name,
      admin_password: password,
      admin_number: number,
    };
    axios.post("/admin/addadmin", datas).then((res) => {
      console.log(res.data);
      if (res.data.status) {
        toast.success("Added Sucessfully");
      } else {
        toast.error(res.data.msg);
      }
    });
  };
  return (
    <div className="admin-form">
      <Container fluid>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <form onSubmit={signup}>
              <div className="admin-form-container">
                <h1>Add Administator</h1>

                <Form.Control
                  type="text"
                  placeholder="Enter the Name"
                  name="Name"
                  value={name}
                  id="uname"
                  onChange={(e) => setname(e.target.value)}
                />
                <br />
                <Form.Control
                  type="number"
                  name="MobileNumber"
                  placeholder="Enter the Mobile Number"
                  value={number}
                  id="umno"
                  onChange={(e) => setnumber(e.target.value)}
                />
                <br />
                <Form.Control
                  type="password"
                  name="Password"
                  value={password}
                  id="upassword"
                  placeholder="Enter the password"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <br />
                <button className="btn btn-outline-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default CreateAdmin;
