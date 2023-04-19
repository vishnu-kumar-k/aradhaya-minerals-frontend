import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "../Axios/Axios";
import { useRecoilState } from "recoil";
import { Status } from "../Atom/Atom";

const FetchCanDetails = ({
  products_id,
  products_name,
  products_litre,
  products_price,
  products_minimum_quantity,
  products_available,
  products_img,
}) => {
  const [inputform, setInputform] = useState(false);
  const [form, setForm] = useState({
    id: products_id,
    litre: products_litre,
    min: products_minimum_quantity,
    price: products_price,
    available: products_available,
  });
  const [status, setStatus] = useRecoilState(Status);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handle = (e) => {
    e.preventDefault();
    setInputform(!inputform);
  };
  const update = (e) => {
    e.preventDefault();
    if (
      products_available === form.available &&
      products_price === form.price &&
      products_minimum_quantity === form.min
    ) {
      toast.warning("No changes");
    } else {
      setStatus((prev) => prev + 1);
      axios
        .put("/admin/edit", {
          form,
        })
        .then((res) => {
          setInputform(false);
          if (res.data.status) {
            toast.success(res.data.msg);
          }
        });
    }
  };
  var t = 10000;
  console.log(t);
  t = 999;
  console.log(t);
  return (
    <>
      <tr>
        <td>{products_litre}</td>
        <td>{products_price}</td>
        <td>{products_minimum_quantity}</td>
        <td>{products_available}</td>
        <td>
          <button className="btn btn-primary" onClick={handle}>
            {inputform ? "Cancel" : "Edit"}
          </button>
        </td>
      </tr>
      {inputform && (
        <tr className="product-edit">
          <td>
            <Form.Control
              value={form.litre}
              name="litre"
              onChange={(e) => handleChange(e)}
            />
          </td>
          <td>
            <Form.Control
              value={form.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
          </td>
          <td>
            <Form.Control
              value={form.min}
              name="min"
              onChange={(e) => handleChange(e)}
            />
          </td>
          <td>
            <Form.Control
              value={form.available}
              name="available"
              onChange={(e) => handleChange(e)}
            />
          </td>
          <td>
            <button className="btn btn-outline-success" onClick={update}>
              Update
            </button>
          </td>
        </tr>
      )}
      <ToastContainer />
    </>
  );
};

export default FetchCanDetails;
