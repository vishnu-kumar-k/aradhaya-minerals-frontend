import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { Filter, FilterStatus, ShowModel } from "../Atom/Atom";
import axios from "../Axios/Axios";

export const Mode = () => {
  const [showModal, setShowModel] = useRecoilState(ShowModel);
  const [pinCode, setPinCode] = useState();
  const [form, setForm] = useRecoilState(Filter);
  useEffect(() => {
    axios
      .get("/pincode")
      .then((res) => setPinCode(res.data.result))
      .catch((err) => console.log(err));
  }, []);
  const handleCloseModal = () => {
    setShowModel(false);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission
    handleCloseModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleReset = (e) => {
    e.preventDefault();
    setForm({ status: 0, date: "yyyy-mm-dd", pincode: 0 });
  };

  console.log(form);
  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              onChange={handleInputChange}
              value={form.status}
            >
              <option value={0}>All</option>
              <option value={1}>Not viewed</option>
              <option value={2}>Progress</option>
              <option value={3}>Delivered</option>
            </Form.Select>

            <Form.Label>PinCode</Form.Label>
            <Form.Select
              name="pincode"
              onChange={handleInputChange}
              value={form.pincode}
            >
              <option value={0}>All</option>
              {pinCode ? (
                <>
                  {pinCode.map((p, i) => (
                    <option value={p.pincode}>
                      {p.pincode + "   " + p.Location}
                    </option>
                  ))}
                </>
              ) : (
                <></>
              )}
            </Form.Select>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
