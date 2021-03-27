import React, { useState } from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AccountCircle, Lock } from "@material-ui/icons";

import api from "../../services/api";

import styles from "./login.module.css";

import * as AlertsActions from "../../store/actions/alerts";

import { useDispatch } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    let pathname = "/login";

    const data = { username: username, password: password };
    await api
      .post(pathname, data)
      .then((res) => {
        const { authorization, refreshToken } = res.data;

        localStorage.setItem("accessToken", authorization);
        localStorage.setItem("refreshToken", refreshToken);

        props.history.push("/dashboard");
      })
      .catch((res) => {
        if (res.response) {
          const error = res.response.data;
          dispatch(AlertsActions.setAlert(error.description, "error"));
        } else {
          dispatch(
            AlertsActions.setAlert(
              "Não foi possível se conectar ao servidor. Verifique a sua conexão.",
              "error"
            )
          );
        }
      });
  }

  const submit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <section className={styles.login}>
      <Container className="d-flex justify-content-center pt-5">
        <Row>
          <Col xs={12} className="mt-5">
            <h1 style={{ fontWeight: 800, color: "#FEFEFE" }}>
              Drizzle
              <em style={{ color: "#D0BAF3", fontStyle: "normal" }}>
                Technologies
              </em>
            </h1>
            <Form className="mt-5" onSubmit={submit}>
              <Form.Group className="mt-3 d-flex align-items-center">
                <AccountCircle className={styles.icons} />
                <Form.Control
                  type="text"
                  placeholder="usuário"
                  autoComplete="username"
                  autoCapitalize="none"
                  required={true}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-3 d-flex align-items-center">
                <Lock className={styles.icons} />
                <Form.Control
                  type="password"
                  placeholder="senha"
                  autoComplete="password"
                  autoCapitalize="none"
                  required={true}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Button className="btn-dark w-100" type="submit">
                Entrar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
