import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AccountCircle, Lock } from "@material-ui/icons";
import { Alert } from "@material-ui/lab"

import styles from "./login.module.css";

const Login = () => {
  return (
    <section className={styles.login}>
      <Container className="d-flex justify-content-center">
        <Row>
          <Col xs={12} className="mt-5">
            <h1 style={{ fontWeight: 800, color: "#FEFEFE" }}>
              Drizzle
              <em style={{ color: "#000", fontStyle: "normal" }}>
                Technologies
              </em>
            </h1>
            <Form className="mt-5">
              <Form.Group className="mt-3 d-flex align-items-center">
                <AccountCircle className={styles.icons} />
                <Form.Control
                  type="text"
                  placeholder="usuário"
                  autoComplete="username"
                  autoCapitalize="none"
                  required={true}
                  onChange={(username) =>
                    this.props.setUsername(username.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mt-3 d-flex align-items-center">
                <Lock className={styles.icons} />
                <Form.Control
                  type="text"
                  placeholder="senha"
                  autoComplete="password"
                  autoCapitalize="none"
                  required={true}
                  onChange={(username) =>
                    this.props.setUsername(username.target.value)
                  }
                />
              </Form.Group>
              <Button className="btn-dark w-100">Entrar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
