import React, { useState } from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Slide, IconButton } from "@material-ui/core";
import { AccountCircle, Lock, Close } from "@material-ui/icons";

import { Alert } from "@material-ui/lab";

import api from "../../services/api";

import styles from "./login.module.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  function login() {
    let pathname = "/login";

    const data = { username: username, password: password };
    api
      .post(pathname, data)
      .then((res) => {
        const { authorization, timestamp } = res.data;

        localStorage.setItem("token", authorization);
        localStorage.setItem("time", timestamp);

        props.history.push("/dashboard");
      })
      .catch((res) => {
        if (res.response) {
          const error = res.response.data;
          setAlertMessage(error.description);
          setShowAlert(true);
        } else {
          setAlertMessage(
            "Não foi possível se conectar ao servidor. Verifique a sua conexão."
          );
          setShowAlert(true);
        }
      });
  }

  const submit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <section className={styles.login}>
      <Slide in={showAlert} direction="right" mountOnEnter>
        <Alert
          severity="error"
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {alertMessage}
        </Alert>
      </Slide>
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
