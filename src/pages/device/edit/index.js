import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { EditRounded } from "@material-ui/icons";

import api from "../../../services/api";

import styles from "./editDevice.module.css";

import * as DashboardActions from "../../../store/actions/dashboard";
import * as AlertsActions from "../../../store/actions/alerts";

import { useSelector, useDispatch } from "react-redux";

const EditDevice = (props) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.dashboard.devices);

  const [value, setValue] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    async function getData() {
      const pathname = "/dashboard";

      await api
        .get(pathname)
        .then((res) => {
          dispatch(DashboardActions.setData(res.data));
        })
        .catch((res) => {
          if (res.response) {
            console.log(res.response.data);
          }
        });
    }
    getData();
  }, [dispatch]);

  async function sendData() {
    const pathname = "/device/edit";
    const data = { deviceID: value.id, newArea: area };

    await api
      .patch(pathname, data)
      .then((res) => {
        if (res.data) {
          dispatch(
            AlertsActions.setAlert("Dispositivo foi editado!", "success")
          );
          setValue("");
          setArea("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const submit = (event) => {
    event.preventDefault();
    sendData();
    console.log(value);
  };

  return (
    <div>
      <Header />
      <Row>
        <Sidebar />
        <Col xs={9} className="ml-sm-auto col-lg-10 pt-3 px-4">
          <Container className="d-flex justify-content-center">
            <div className="w-50" style={{ minWidth: "500px" }}>
              <h2 className="d-flex align-items-center mb-4">
                Editar Área
                <EditRounded
                  className={styles.linkIcon}
                  style={{ fontSize: "1.5rem" }}
                />
              </h2>
              <Form onSubmit={submit}>
                <Form.Group>
                  <Autocomplete
                    id="device-selection"
                    options={devices}
                    getOptionLabel={(option) =>
                      option ? option.shop_name : ""
                    }
                    style={{ width: "100%" }}
                    value={value}
                    onChange={(event, newValue) => {
                      console.log(newValue);
                      if (newValue) {
                        setValue(newValue);
                        setArea(newValue.area);
                      } else {
                        setArea("");
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Dispositivo"
                        variant="outlined"
                      />
                    )}
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
                  Salvar
                </Button>
              </Form>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default EditDevice;
