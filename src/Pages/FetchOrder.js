import axios from '../Axios/Axios'
import React, { useEffect, useState } from 'react'
import FetchOrderDetails from './FetchOrderDetails';
 const FetchOrder = () => {
  const [order,setOrder]=useState();
  useEffect(()=>
  {
    axios.post("/admin/orders").then((res)=>{
      setOrder(res.data.res);
    })
  })
  return (
    <div>
      
      {order?(<>{order.map((p,i)=>(
            <FetchOrderDetails
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
      
    </div>
  )
}
export default FetchOrder;