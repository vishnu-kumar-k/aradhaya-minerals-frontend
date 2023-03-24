import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AdminDetails } from "./Context";
import "../css/Navbaradmin.css";
import  axios  from "../Axios/Axios";
const Menu = () => {
  const navigate = useNavigate();
  const adminDetails = useContext(AdminDetails);
  
  useEffect(()=>{

    if(localStorage.getItem("admin_jwt")!==null && localStorage.getItem("admin_jwt")!==undefined)
    {
        axios.post("/admin/verify",{
            jwt_token:localStorage.getItem("admin_jwt")
        }).then(async(result)=>{
            if(!result.data.status)
            {
                navigate("/admin/login");
            }
            else
            {
                console.log(result.data);
                adminDetails.setName(result.data.name) ;
                adminDetails.setStatus(true);
                console.log(adminDetails.name )
            }
        }).catch((err)=>console.log(err));
    }
    else
    {
        navigate("/admin/login");
    }
  },[])



  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_jwt");
    navigate("/admin/login");
  };
  return (
    <Container>
        <h1 className="admin">Admin Panel</h1>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Aradhaya minerals</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/admin" className="nav-link">
              Add new Product
            </Link>
            <Link to="/admin/adduser" className="nav-link">
              Add new admin user
            </Link>
            <Link to="/admin/viewproduct" className="nav-link">
              View products
            </Link>
          </Nav>
          <div className="d-flex gap-3">
            <Link className="nav-link">{adminDetails.name}</Link>{"  "}
          
            <Link className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Menu;
