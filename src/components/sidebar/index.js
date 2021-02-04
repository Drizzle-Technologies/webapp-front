import React from "react";
import { Link } from "react-router-dom";

import { Col, Nav, Button } from "react-bootstrap";
import { HomeRounded } from "@material-ui/icons";

import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <Col xs={2} className={styles.sidebar}>
      <div className={styles.sidebarSticky}>
        <Nav
          className="mr-auto flex-column justify-content-between h-100"
          style={{ color: "var(--theme-text)" }}
        >
          <div>
            <Link to="/dashboard" className={styles.link}>
              <HomeRounded className={styles.linkIcon} />
              Dashboard
            </Link>
          </div>
          <Link to="/logout" className={styles.logout}>
            <Button className={styles.logoutButton}>Logout</Button>
          </Link>
        </Nav>
      </div>
    </Col>
  );
};

export default Sidebar;
