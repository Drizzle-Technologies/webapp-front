import React from 'react';

import {Col, Nav} from "react-bootstrap"
import { HomeRounded } from "@material-ui/icons"

import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <Col xs={2} className={styles.sidebar}>
      <div className={styles.sidebarSticky}>
        <Nav
          className="mr-auto flex-column"
          style={{ color: "var(--theme-text)" }}
        >
          <Nav.Link href="#home" className={styles.link}>
            <HomeRounded className={styles.linkIcon} />
            Dashboard
          </Nav.Link>
        </Nav>
      </div>
    </Col>
  );
};

export default Sidebar;
