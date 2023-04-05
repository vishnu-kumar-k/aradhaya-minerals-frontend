import axios from '../Axios/Axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import DisplayOrder from './DisplayOrder';

 const ViewOrder = () => {
  const [order,setOrder]=useState();
  useEffect(()=>
  {
    axios.post("/admin/orders").then((res)=>{
      setOrder(res.data.res);
    })
  })
  return (
    <div>
      <Container fluid>
      {order?(<>{order.map((p,i)=>(
            <DisplayOrder
            id={p.orderId}
            customerName={p.customerName}
            customerAddress={p.customerAddress}
            phoneNumber={p.phoneNumber}
            orderDate={p.orderDate}
            deliveryDate={p.deliveryDate}
            pinCode={p.pinCode}
            total={p.total}
            status={p.orderStatus}
             />
        ))}</>):(<></>)}
      </Container>
    </div>
  )
}
export default ViewOrder;