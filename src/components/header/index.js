import React from "react";

import { Navbar, Col } from "react-bootstrap";

import styles from "./header.module.css"

const Header = () => {
  return (
    <Navbar
      expand="lg"
      className={styles.header}
    >
      <Col xs={2}>
        <Navbar.Brand href="#home" style={{ color: "white", fontWeight: 600 }}>
          Drizzle Tech
        </Navbar.Brand>
      </Col>
    </Navbar>
  );
};

export default Header;
