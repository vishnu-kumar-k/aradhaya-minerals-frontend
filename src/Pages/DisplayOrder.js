import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Load, Width } from "../Atom/Atom";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import axios from "../Axios/Axios";
import Loading from "../Component/Loading";
import "../css/Order.css";
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
  var sum;
  useEffect(() => {
    setLoading(true);
    axios
      .post("/admin/cart", { orderId: id })
      .then(async (res) => {
        if (res.data.status) {
          await setCart(res.data.data);
          console.log(res);
          await setLoading(false);
          sum = cart.litre.reduce((total, number) => total + number, 0);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(status);
  
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
                    Name:
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    {customerName}
                  </Col>

                  <Col md={1} xs={4}>
                    Address:
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    {customerAddress}
                  </Col>
                  <Col md={1} xs={4}>
                    phoneNumber:
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    <a href={phoneNumber}>{phoneNumber}</a>
                  </Col>
                  <Col md={1} xs={4}>
                    PinCode:
                  </Col>
                  <Col md={1} sm={8} xs={8}>
                    {pinCode}
                  </Col>
                  <Col md={1} xs={4}>
                    OrderDate:
                  </Col>

                  <Col md={1} sm={8} xs={8}>
                    {new Date(orderDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Col>
                  <Col md={1} xs={4}>
                    deliveryDate:
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
                <Col md={12}>Total:{total}</Col>
                <Col md={12}>Sum:{sum}</Col>
                  <Col>
                    Status
                    {status == 1
                      ? "Not Viewed"
                      : status == 2
                      ? "Progress"
                      : "Delivered"}
                  </Col>
                  <Col>
                    <button className="btn btn-primary" >
                      {status == 1
                        ? "Accept"
                        : status == 2
                        ? "Delieverd"
                        : "Delivered"}
                    </button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default DisplayOrder;
