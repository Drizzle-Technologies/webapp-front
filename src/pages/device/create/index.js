import React, { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";

import api from "../../../services/api";

import styles from "./createDevice.module.css";

import * as AlertsActions from "../../../store/actions/alerts";

import { useDispatch } from "react-redux";

const CreateDevice = () => {
  const [shopName, setShopName] = useState("");
  const [area, setArea] = useState("");

  const dispatch = useDispatch();

  function sendData() {
    const pathname = "/device/create";
    const data = {
      shopName: shopName,
      area: area,
    };

    api
      .post(pathname, data)
      .then((res) => {
        if (res.data) {
          dispatch(
            AlertsActions.setAlert("Dispositivo criado com sucesso!", "success")
          );

          setShopName("");
          setArea("");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error status: ", error.response.status);
        }
      });

    return data;
  }

  const submit = (event) => {
    event.preventDefault();
    sendData();
  };

  return (
    <div>
      <Header />
      <Row>
        <Sidebar />
        <Col xs={9} className="ml-sm-auto col-lg-10 pt-4 px-4">
          <Container className="d-flex justify-content-center">
            <div className="w-50" style={{ minWidth: "500px" }}>
              <Form onSubmit={submit}>
                <Form.Group>
                  <Form.Label>Nome do Estabelecimento</Form.Label>
                  <Form.Control
                    type="text"
                    name="shop_name"
                    placeholder="estabelecimento"
                    aria-label="Nome do Estabelecimento"
                    onChange={(event) => setShopName(event.target.value)}
                    value={shopName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Área do estabelecimento em M^2</Form.Label>
                  <Form.Control
                    type="text"
                    name="area"
                    placeholder="área"
                    aria-label="Área do estabelecimento"
                    onChange={(event) => setArea(event.target.value)}
                    value={area}
                  />
                </Form.Group>
                <Button type="submit" className={styles.button}>
                  Enviar
                </Button>
              </Form>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default CreateDevice;
