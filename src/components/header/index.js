import React from "react";

import { Navbar } from "react-bootstrap";

import styles from "./header.module.css"

const Header = () => {
  return (
    <Navbar
      expand="lg"
      className={`${styles.header} col-2`}
    >
      <Navbar.Brand href="#home" style={{ color: "white", fontWeight: 600 }}>
        Drizzle Tech
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
