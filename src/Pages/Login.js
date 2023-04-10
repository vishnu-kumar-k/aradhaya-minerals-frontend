import React, { useContext } from 'react';
import '../css/adminregister.css'
import {Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import axios from '../Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { AdminDetails, Load } from '../Atom/Atom';
import Loading from '../Component/Loading';

 const Login=()=>{
    const navigate=useNavigate()
    const[password,setpassword]=useState("")
    const[number,setnumber]=useState("")
    const[adminDetails,setAdminDetails]=useRecoilState(AdminDetails)  
    const[loading,setLoading]=useRecoilState(Load)  
    const signup=(e)=>{
        e.preventDefault();
        setLoading(true);
        axios.post("/admin/login",{
            adminpassword:password,
            adminnumber:number
        }).then((res)=>{
            console.log(res.data)
            setLoading(false);
            if(res.data.status){
                localStorage.setItem("adminJwt",res.data.admin_jwt);
                toast.success(`Login successfull`);
                setAdminDetails({status:true,name:res.data.name,jwt:res.data.admin_jwt});
                
                console.log("Done")
                setTimeout(() => {
                    navigate("/admin")
                }, 3000);
                
            }
            else{
                toast.error(res.data.msg)
            }
        })
    }
    return(<>{loading?(<Loading />):(
        <div className='admin-form'><Container>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <form onSubmit={signup}>
                        <div className='admin-form-container'>
                        <h1> Administator Login</h1>
                    
                            <Form.Control type="number" name="MobileNumber" required placeholder="Enter the Mobile Number"value={number} id="umno" onChange={(e)=>setnumber(e.target.value)}/><br />
                            <Form.Control type="password" name="Password" required value={password} id="upassword" placeholder='Enter the password' onChange={(e)=>setpassword(e.target.value)}/><br />
                            <button className='btn btn-outline-primary'  type="submit">Submit</button>
                            </div>
                    </form>
                </Col>
            </Row>
        </Container>
        <ToastContainer />
        </div>)}</>
    )
}

export default Login;