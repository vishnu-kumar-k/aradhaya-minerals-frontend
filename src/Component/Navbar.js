import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbaradmin.css";
import  axios  from "../Axios/Axios";
import { useRecoilState } from "recoil";
import { AdminDetails, Load, Width } from "../Atom/Atom";
import Loading from "./Loading";
const Menu = () => {
  const navigate = useNavigate();
  const[admindetails,setAdmindetails]=useRecoilState(AdminDetails);
  const[loading,setLoading]=useRecoilState(Load);
  useEffect(()=>{

    if(admindetails.jwt!==undefined && admindetails.jwt!==null)
    {
      setLoading(true);
        axios.post("/admin/verify",{
            jwt_token:admindetails.jwt
        }).then(async(result)=>{
          setLoading(false)
            if(!result.data.status)
            {
                navigate("/admin/login");
            }
            else
            {
                setAdmindetails({status:true,name:result.data.name,jwt:admindetails.jwt});
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
    localStorage.removeItem("adminJwt");
    navigate("/admin/login");
  };
  return (<>
    {loading?(<></>):(
    <Container>
        <h1 className="admin">Admin Panel</h1>
      <Navbar bg="light" expand="lg" className="position-static">
        <Navbar.Brand>Aradhaya minerals</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            
            <Link to="/admin/addadmin" className="nav-link">
              Add admin 
            </Link>
            <Link to="/admin/viewproduct" className="nav-link">
              Can
            </Link>
            <Link to="/admin" className="nav-link">
               Order
            </Link>
          </Nav>
          <div className="d-flex gap-3">
            <Link className="nav-link">{admindetails.name}</Link>{"  "}
          
            <Link className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Container>)}</>
  );
};

export default Menu;
