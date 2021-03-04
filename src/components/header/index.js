import React from "react";

import { Navbar, Col } from "react-bootstrap";

import styles from "./header.module.css";

const Header = () => {
  return (
    <Navbar expand="lg" className={styles.header}>
      <Col xs={2} className="px-3 py-2" style={{ backgroundColor: "#151542" }}>
        <Navbar.Brand href="#home" style={{ color: "white", fontWeight: 600 }}>
          <img
            src="/images/drizzle.png"
            alt="Logo"
            style={{ width: "1.4rem", marginRight: "0.5rem" }}
          />
          Drizzle
        </Navbar.Brand>
      </Col>
    </Navbar>
  );
};

export default Header;
