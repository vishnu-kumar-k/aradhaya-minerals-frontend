import axios from "../Axios/Axios";
import React, { useContext, useEffect, useState } from "react";
import FetchCanDetails from "./FetchCanDetails";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import "../css/Viewproduct.css";
import { useRecoilState } from "recoil";
import { Load } from "../Atom/Atom";
import Loading from "../Component/Loading";
import CreateCan from "./CreateCan";
export const FetchCan = () => {
  const [loading, setLoading] = useRecoilState(Load);
  const [product, setProduct] = useState();
  const [addProduct, setAddProduct] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post("/getproducts")
      .then(async (res) => {
        setLoading(false);
        await setProduct(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const handle = (e) => {
    e.preventDefault();
    setAddProduct(!addProduct);
  };
  console.log(addProduct);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Container>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Litre</th>
                  <th>Price</th>
                  <th>Minimum Quantity</th>
                  <th>Available</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {product ? (
                  <>
                    {product.map((p, i) => (
                      <FetchCanDetails
                        products_id={p.canId}
                        products_name={p.canName}
                        products_litre={p.litre}
                        products_price={p.price}
                        products_minimum_quantity={p.MOQ}
                        products_available={p.currentAvailable}
                        products_img={p.canImage}
                      />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
            <button
              className="btn btn-outline-secondary d-flex right"
              onClick={handle}
            >
              {addProduct ? "Cancel" : "Add a product"}
            </button>
            {addProduct ? <CreateCan /> : <></>}
          </Container>
        </div>
      )}
    </>
  );
};

export default FetchCan;
