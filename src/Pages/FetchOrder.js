import axios from "../Axios/Axios";
import React, { useEffect, useState } from "react";
import FetchOrderDetails from "./FetchOrderDetails";
import { useRecoilState, useRecoilValue } from "recoil";
import { Fetch, Filter, FilterStatus, Load } from "../Atom/Atom";
import Loading from "../Component/Loading";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Mode } from "./Mode";
const FetchOrder = () => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useRecoilState(Load);
  const [count, setCount] = useState(0);
  const [len, setLen] = useState(0);
  const [filterStatus, setFilterStatus] = useRecoilState(FilterStatus);
  const filter = useRecoilValue(Filter);
  const fetch = useRecoilValue(Fetch);
  useEffect(() => {
    setLoading(true);
    setCount(0);
    axios
      .post("/admin/orders", {
        fetchCount: true,
        filterStatus,
        date: filter.date,
        status: filter.status,
        pincode: filter.pincode,
      })
      .then(async (res) => {
        await setLen(res.data.res);
        setLoading(false);
      });
    axios
      .post("/admin/orders", {
        count,
        filterStatus,
        date: filter.date,
        status: filter.status,
        pincode: filter.pincode,
      })
      .then(async (res) => {
        await setOrder(res.data.res);
      });
  }, [filter, fetch]);

  const handleNext = async (e) => {
    e.preventDefault();
    await setLoading(true);

    setCount((prev) => prev + 1);
    axios
      .post("/admin/orders", {
        count: count + 1,
        filterStatus,
        date: filter.date,
        status: filter.status,
        pincode: filter.pincode,
      })
      .then(async (res) => {
        await setOrder(res.data.res);
        setLoading(false);
        console.log(res.data);
      });
  };
  const handleBack = async (e) => {
    e.preventDefault();
    setLoading(true);

    await setCount((prev) => prev - 1);
    axios
      .post("/admin/orders", {
        count: count - 1,
        filterStatus,
        date: filter.date,
        status: filter.status,
        pincode: filter.pincode,
      })
      .then(async (res) => {
        setLoading(false);
        await setOrder(res.data.res);
        console.log(res.data);
      });
  };
  console.log(count + "  " + len);
  return (
    <div>
      {order && !loading ? (
        <>
          <Mode />
          {len === 0 ? (
            <>No orders</>
          ) : (
            <>
              {order.map((p, i) => (
                <FetchOrderDetails
                  id={p.orderId}
                  customerName={p.customerName}
                  customerAddress={p.customerAddress}
                  phoneNumber={p.phoneNumber}
                  orderDate={p.orderDate}
                  deliveryDate={p.deliveryDate}
                  pinCode={p.pinCode}
                  total={p.total}
                  status={p.orderStatus}
                />
              ))}
            </>
          )}
          <div className="d-flex justify-content-evenly order">
            {len > 10 && count > 0 ? (
              <button className="btn btn-outline-primary" onClick={handleBack}>
                Back
              </button>
            ) : (
              <></>
            )}
            {len > 10 && len - count * 10 > 10 ? (
              <button className="btn btn-outline-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default FetchOrder;
