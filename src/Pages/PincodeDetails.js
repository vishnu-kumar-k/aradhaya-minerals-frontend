import React, { useState } from "react";
import { Form, ToastContainer } from "react-bootstrap";
import axios from "../Axios/Axios";
import { toast } from "react-toastify";

export const PincodeDetails = ({ pincode, location, status }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    pincode: pincode,
    location: location,
    status: status,
  });
  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (status === form.status && location === form.location) {
      toast.warning("No changes detected");
    } else {
      axios
        .post("/admin/editpincode", {
          pincode: form.pincode,
          location: form.location,
          status: form.status,
        })
        .then((result) => {
          setEdit(!edit);
          if (result.data.status) {
            toast.success("Updated");
          } else {
            toast.error("Try after sometime");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <tr>
        <td>{pincode}</td>
        <td>{location}</td>
        <td>{status === 1 ? "Yes" : "No"}</td>
        <td>
          <button className="btn btn-outline-primary" onClick={handleEdit}>
            {edit ? "cancel" : "Edit"}
          </button>
        </td>
      </tr>
      {edit ? (
        <tr>
          <td>
            <Form.Control type="text" value={form.pincode} disabled />
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
              {form.status !== 1 ? (
                <option value={0}>No</option>
              ) : (
                <option value={1}>Yes</option>
              )}
              {form.status === 1 ? (
                <option value={0}>No</option>
              ) : (
                <option value={1}>Yes</option>
              )}
            </Form.Select>
          </td>
          <td>
            <button
              className="btn btn-outline-secondary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  );
};
