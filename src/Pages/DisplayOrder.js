import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Load, Width } from "../Atom/Atom";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import axios from "../Axios/Axios";
import Loading from "../Component/Loading";
import "../css/Order.css";
import { BsArrowRepeat } from 'react-icons/bs';

import { toast , ToastContainer} from "react-toastify";
const DisplayOrder = ({
  id,
  total,
  customerName,
  customerAddress,
  phoneNumber,
  pinCode,
  orderDate,
  deliveryDate,
  status,
}) => {
  const [cart, setCart] = useState();
  const [loading, setLoading] = useRecoilState(Load);
  const[sum,setSum]=useState();
  useEffect(() => {
    setLoading(true);
    axios
      .post("/admin/cart", { orderId: id })
      .then(async (res) => {
        if (res.data.status) {
          await setCart(res.data.data);
          console.log(res);
          await setLoading(false);
          
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();
    let newStatus = 0;
    if (status == 1) {
      newStatus = 2;
    } else if (status ==2) {
      newStatus = 3;
    } else {
      return;
    }
    setLoading(true);
    axios.post("/admin/update", {
        orderId: id,
        status: newStatus
      }).then((res) => {
        console.log(res)
        setLoading(false);
        if (res.data.status) {
          toast.success("Updated Successfully");
        }
      }).catch((err) => console.log(err))
  };
  
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container fluid>
          <Card className="order-details">
            <ListGroup>
              <ListGroup.Item className="card-header">
                <Row>
                  <Col md={1} xs={4}>
                   <span> Name</span>
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                  <span> {customerName}</span>
                  </Col>

                  <Col md={1} xs={4}>
                  <span>Address</span>  
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    {customerAddress}
                  </Col>
                  <Col md={1} xs={4}>
                  <span>ph no</span>
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    <a href={phoneNumber}>{phoneNumber}</a>
                  </Col>
                  <Col md={1} xs={4}>
                  <span>PinCode</span>
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    {pinCode}
                  </Col>
                  <Col md={1} xs={4}>
                  <span>OrderDate</span>
                  </Col>

                  <Col md={1} sm={8} xs={8}>
                    {new Date(orderDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Col>
                  <Col md={1} xs={4}>
                  <span>deliveryDate</span>
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    {new Date(deliveryDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Litre</th>
                      <th scope="col">No of Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart ? (
                      <>
                        {cart.map((ct, i) => (
                          <tr key={i}>
                            <td>{ct.litre} Litre</td>
                            <td>{ct.litre} cans</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colspan="2">No items in cart</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <Row>
                  
                  <Col md={6} xs={6} sm={6}>
                  <Col md={12}>Total Amount:{total}</Col>
                    Status: 
                    {status == 1
                      ? <strong style={{color:"#311023"}}>Not Viewed</strong>
                      : status == 2
                      ? <strong style={{color:"#ba112b"}}>Progress</strong>
                      : <strong style={{color:"#1d8951"}}>Delivered</strong>}
                  </Col>
                  <Col md={6} xs={6} sm={6}>
                    {status==1?(<button onClick={handleUpdate} className="btn btn-primary">Mark as Progress</button>):(status==2?(<button onClick={handleUpdate} className="btn btn-secondary">Mark as Delivered</button>):(<></>))}
                    
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
};

export default DisplayOrder;
