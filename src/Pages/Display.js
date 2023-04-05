import React, {  useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "../Axios/Axios";

const Display = ({
  products_id,
  products_name,
  products_litre,
  products_price,
  products_minimum_quantity,
  products_available,
  products_img,
}) => {
  const [inputform, setInputform] = useState(false);
  const [form, setForm] = useState({
    id: products_id,
    litre: products_litre,
    min: products_minimum_quantity,
    price: products_price,
    available: products_available,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handle = (e) => {
    e.preventDefault();
    setInputform(!inputform);
  };
  const update=(e)=>{
    e.preventDefault();
    if(products_available===form.available && products_price===form.price && products_minimum_quantity===form.min)
    {
      toast.warning("No changes")
    }
    else{
    axios.put("/admin/edit",{
      form

    }).then((res)=>{
      setInputform(false);
      if(res.data.status)
      {
        toast.success(res.data.msg)
      }
    })
  }
  }
  return (
    <div className="view-product">
      <ToastContainer />
      <Row >
        <Col xs={2}>{products_litre}</Col>
        <Col xs={2}>{products_price}</Col>
        <Col xs={3}>{products_minimum_quantity}</Col>
        <Col xs={2}>{products_available}</Col>
        <Col xs={3}>
          <button className="btn btn-primary" onClick={handle}>
            {inputform ? "Cancel" : "Edit"}
          </button>
        </Col>
      </Row>
      {inputform ? (
        <Row className="product-edit">
          <Col xs={2}>
            <Form.Control
              value={form.litre}
              name="litre"
              onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              value={form.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col xs={3}>
            <Form.Control
              value={form.min}
              name="min"
              onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col xs={2}>
          <Form.Control
              value={form.available}
              name="available"
              onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col xs={3}>
            <button className="btn btn-outline-success" onClick={update}>
              Update
            </button>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Display;
