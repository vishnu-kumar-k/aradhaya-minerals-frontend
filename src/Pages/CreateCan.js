import axios from "../Axios/Axios";
import React, { useState } from "react";
import { Col, Container, Form, Row, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import "../css/Addproduct.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Load } from "../Atom/Atom";
import Loading from "../Component/Loading";
const CreateCan = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    litre: "",
    minimum_quantity: "",
    img: "",
    available: "",
  });
  const[loading,setLoading]=useRecoilState(Load);
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/admin/addproducts", {
        pro_name: product.name,
        pro_price: product.price,
        pro_litre: product.litre,
        pro_min_quantity: product.minimum_quantity,
        pro_available: product.available,
        pro_img: product.img,
        jwt_token: localStorage.getItem("adminJwt"),
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          toast.success("Product add successfully");
          console.log(res.data);
          setTimeout(()=>{
            navigate("/admin/viewproduct")
            
          },2000)
        } else {
          toast.error("Something went Wrong");
        }
      });
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>{loading?(<Loading />):(
    <div className="product">
      <Container fluid>
        
        <Row><Col md={2}></Col>
          
          <Col md={8} className="product-container">
          <h1 className="text-center">Enter Can Details</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Row>
                  <Col md={4} xs={6} sm={4}><p>Enter Can Name</p></Col>
                  
                  <Col md={8} xs={6} >
                <Form.Control
               
                  type="text"
                  value={product.name}
                  name="name"
                  placeholder="2 litre"
                  required
                  onChange={handle}
                />
                </Col>
                </Row>
              </div>
              <br />
              
              <div className="form-group">
              <Row>
                  <Col  md={4} xs={6}><p>Enter Can Litre</p></Col>
                  <Col md={8} xs={6}>
                <Form.Control
                  type="number"
                  value={product.litre}
                  name="litre"
                  placeholder="2"
                  required
                  onChange={handle}
                /></Col></Row>
              </div>
              <br />
              <div className="form-group">
              <Row>
                  <Col md={4} xs={6}><p>Enter Can Price</p></Col>
                  <Col md={8} xs={6}>
                <Form.Control
                  type="number"
                  value={product.price}
                  name="price"
                  placeholder="25"
                  required
                  onChange={handle}
                /></Col>
                </Row>
              </div>
              <br />
              <div className="form-group">
              <Row>
                  <Col md={4} xs={6}><p>Enter minimum order quantity</p></Col>
                  <Col md={8} xs={6}>
                <Form.Control
                  type="number"
                  value={product.minimum_quantity}
                  name="minimum_quantity"
                  placeholder="10"
                  required
                  onChange={handle}
                /></Col>
                </Row>
              </div>
              <br />
              <div className="form-group">
              <Row>
                  <Col md={4} xs={6}><p>Enter no.of Cans available</p></Col>
                  <Col md={8} xs={6}>
              <Form.Control
                  type="number"
                  value={product.available}
                  name="available"
                  placeholder="100"
                  required
                  onChange={handle}
                /></Col>
                </Row>
              </div>
              <br />
              <div className="form-group">
              <Row>
                  <Col md={4} xs={6}><p>Enter Can Image Link</p></Col>
                  <Col md={8} xs={6}>
                <Form.Control
                  type="url"
                  value={product.img}
                  name="img"
                  placeholder="https://media.istockphoto.com/id/185072125/photo/bottle-of-spring-water.jpg?s=612x612&w=0&k=20&c=8uCYpbrjtHF9Gx-P3zQ27aDafFB_oJcxzXzry9CrnRc="
                  required
                  onChange={handle}
                /></Col>
                </Row>
              </div>
              <br />
              <div className="text-center">
              <button className="btn btn-outline-primary" type="submit">
                Submit
              </button>
              </div>
            </form>
          </Col>
          <Col md={2} ></Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>)}</>
  );
};
export default CreateCan;
