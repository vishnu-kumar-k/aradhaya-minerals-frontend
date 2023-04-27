import React, { useEffect, useState } from "react";
import axios from "../Axios/Axios";
import { useRecoilState } from "recoil";
import { Load, Reload } from "../Atom/Atom";
import Loading from "../Component/Loading";
import { Container, Table } from "react-bootstrap";
import { ViewAdmin } from "./ViewAdmin";
import CreateAdmin from "./CreateAdmin";

const Admin = () => {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useRecoilState(Load);
  const[add,setAdd]=useState(true);
  const [reload,setReload]=useRecoilState(Reload)
    useEffect(() => {
     setLoading(true);
    
    axios.get("/admin/viewadmin").then((result) => {
      if (result.data.status) {
        setLoading(false);
        setAdd(true)
        setAdmin(result.data.result);
      }
    });
  }, [reload]);
  const handleAdd=(e)=>
  {
    e.preventDefault();
    setAdd(!add);
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>ph.No</th>
                
                <th>SuperAdmin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <>
                {admin ? (
                  admin.map((p, i) => (
                    <ViewAdmin name={p.admin_name} superAdmin={p.superAdmin} number={p.admin_number} id={p.admin_id} i={i}/>
                  ))
                ) : (
                  <></>
                )}
              </>
            </tbody>
          </Table>
          <button className="btn btn-outline-primary" onClick={handleAdd}>{add?"Add Admin":"Cancel"}</button>
          {add?(<></>):(<CreateAdmin />)}
        </Container>
      )}
    </>
  );
};

export default Admin;
