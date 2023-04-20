import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbaradmin.css";
import axios from "../Axios/Axios";
import { useRecoilState } from "recoil";
import { AdminDetails, Load, ShowModel, Width } from "../Atom/Atom";
import Loading from "./Loading";
const Menu = () => {
  const navigate = useNavigate();
  const [admindetails, setAdmindetails] = useRecoilState(AdminDetails);
  const [loading, setLoading] = useRecoilState(Load);
  const [showModel, setShowModel] = useRecoilState(ShowModel);
  useEffect(() => {
    if (admindetails.jwt !== undefined && admindetails.jwt !== null) {
      setLoading(true);
      const formdata=new FormData();
      formdata.append('name',12);
      console.log(JSON.stringify(formdata))
      axios
        .post("/admin/verify",formdata,
          {
            headers:{
              jwt_token: admindetails.jwt
            }
            
          }
        )
        .then(async (result) => {
          setLoading(false);
          console.log(JSON.stringify(formdata))

          if (!result.data.status) {
            navigate("/admin/login");
          } else {
            setAdmindetails({
              status: true,
              name: result.data.name,
              jwt: admindetails.jwt,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/admin/login");
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminJwt");
    navigate("/admin/login");
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setShowModel(true);
  };
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Container>
          <h1 className="admin">Admin Panel</h1>
          <Navbar bg="light" expand="lg" className="fixed-top">
            <Container>
              <Navbar.Brand>Aradhaya minerals</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "200px" }}
                  navbarScroll
                >
                  <Link to="/admin/addadmin" className="nav-link">
                    Admins
                  </Link>
                  <Link to="/admin/viewproduct" className="nav-link">
                    Can
                  </Link>
                  <Link to="/admin" className="nav-link">
                    Order
                  </Link>
                  <Link className="nav-link" onClick={handleFilter}>
                    Filter
                  </Link>
                  
                </Nav>

                <div className="d-flex gap-3">
                  <Nav>
                    <Link className="nav-link">{admindetails.name}</Link>
                    {"  "}

                    <Link className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </Nav>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      )}
    </>
  );
};

export default Menu;
