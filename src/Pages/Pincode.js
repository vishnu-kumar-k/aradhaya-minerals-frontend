import React, { useEffect, useState } from "react";
import axios from "../Axios/Axios";
import { useRecoilState } from "recoil";
import { Load } from "../Atom/Atom";
import Loading from "../Component/Loading";
import { Container, Form, Table } from "react-bootstrap";
import { PincodeDetails } from "./PincodeDetails";
import { toast , ToastContainer} from "react-toastify";

export const Pincode = () => {
  const [pinCode, setPincode] = useState();
  const [loading, setLoading] = useRecoilState(Load);
  const [add, setAdd] = useState(false);
  const [form, setForm] = useState({
    pincode: "",
    location: "",
    status: 1,
  });
  useEffect(() => {
    axios
      .get("/pincode")
      .then((result) => {
        setPincode(result.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleAdd = (e) => {
    e.preventDefault();
    setAdd(!add);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleForm = (e) => {
    e.preventDefault();
    
    if (form.pincode.length !== 6) {
      toast.error("Invalid pincode");
    }
    else if(form.location===0)
    {
        toast.error("Fill the Location")
    }
     else {
      
      axios
        .post("/admin/addpincode", {
          pincode: form.pincode,
          location: form.location,
          status: form.status,
        })
        .then((result) => {
          if (result.data.status) {
            setAdd(!add);
            toast.success("Product add successfully");
          }
          else
          {
            toast.error("Already pincode  Exists")
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
    <ToastContainer />
      {loading ? (
        <>
          <ToastContainer />
          <Loading />
        </>
      ) : (
        <>
          <Container>
            <ToastContainer />
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Pincode</th>
                  <th>Location</th>
                  <th>Deliverable</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pinCode ? (
                  <>
                    {pinCode.map((p, i) => (
                      <PincodeDetails
                        pincode={p.pincode}
                        location={p.Location}
                        status={p.status}
                      />
                    ))}
                  </>
                ) : (
                  <>No Pincodes</>
                )}
                {add ? (
                  <tr>

                    <td>
                      <Form.Control
                        type="text"
                        name="pincode"
                        onChange={handleInputChange}
                        value={form.pincode}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="location"
                        onChange={handleInputChange}
                        value={form.location}
                      />
                    </td>
                    <td>
                      <Form.Select onChange={handleInputChange} name="status">
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </Form.Select>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleForm}
                      >
                        Upload
                      </button>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
            {add ? (
              <button className="btn btn-outline-success" onClick={handleAdd}>
                cancel
              </button>
            ) : (
              <button className="btn btn-outline-success" onClick={handleAdd}>
                Add Pincode
              </button>
            )}
          </Container>
        </>
      )}
    </>
  );
};
