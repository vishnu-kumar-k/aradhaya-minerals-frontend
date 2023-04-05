import axios from '../Axios/Axios';
import React, { useContext, useEffect, useState } from 'react'
import Display from './Display';
import { Col, Container, Row } from 'react-bootstrap';
import "../css/Viewproduct.css"
import { useRecoilState } from 'recoil';
import { Load } from '../Atom/Atom';
import Loading from '../Component/Loading';
export const Viewproduct = () => {
    const[loading,setLoading]=useRecoilState(Load);
    const [product,setProduct]=useState();
    useEffect(()=>{
        setLoading(true);
        axios.post("/getproducts").then(async(res)=>
        {
          setLoading(false);
            await setProduct(res.data.result);
        }).catch((err)=>console.log(err))
    },[])
    

  return (<>{loading?(<Loading />):(
    <div>
        <Container fluid>
        <Row className='header-view'>
            <Col xs={2}>Capacity</Col>
            <Col xs={2}>Price </Col>
            <Col xs={3} >minimum</Col>
            <Col xs={2}>Available</Col>
        </Row>
        {product?(<>{product.map((p,i)=>(
            <Display
            products_id= {p.canId}
            products_name={p.canName}
            products_litre={p.litre}
            products_price={p.price}
            products_minimum_quantity={p.MOQ}
            products_available={p.currentAvailable}
            products_img={p.canImage}
             />
        ))}</>):(<></>)}
        
        </Container>
    </div>)}</>

  )
}

export default Viewproduct;