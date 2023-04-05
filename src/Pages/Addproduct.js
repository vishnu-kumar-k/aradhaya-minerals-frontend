import axios from "../Axios/Axios";
import React, { useState } from "react";
import { Col, Container, Form, Row, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import "../css/Addproduct.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Load } from "../Atom/Atom";
import Loading from "../Component/Loading";
const Addproduct = () => {
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
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Form.Control
                  type="text"
                  value={product.name}
                  name="name"
                  placeholder="Enter the  name"
                  required
                  onChange={handle}
                />
              </div>
              <br />
              <div className="form-group">
                <Form.Control
                  type="number"
                  value={product.price}
                  name="price"
                  placeholder="Enter the price"
                  required
                  onChange={handle}
                />
              </div>
              <br />
              <div className="form-group">
                <Form.Control
                  type="number"
                  value={product.litre}
                  name="litre"
                  placeholder="Enter the Litre"
                  required
                  onChange={handle}
                />
              </div>
              <br />
              <div className="form-group">
                <Form.Control
                  type="number"
                  value={product.minimum_quantity}
                  name="minimum_quantity"
                  placeholder="Enter the minimum Quantity"
                  required
                  onChange={handle}
                />
              </div>
              <br />
              <div className="form-group">
              <Form.Control
                  type="number"
                  value={product.available}
                  name="available"
                  placeholder="Enter the no of cans available "
                  required
                  onChange={handle}
                />
              </div>
              <br />
              <div className="form-group">
                <Form.Control
                  type="url"
                  value={product.img}
                  name="img"
                  placeholder="Enter the image url"
                  required
                  onChange={handle}
                />
              </div>
              <br />
              <button className="btn btn-outline-primary" type="submit">
                Submit
              </button>
            </form>
          </Col>
          <Col md={2}></Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>)}</>
  );
};
export default Addproduct;
