import React from "react";
import { Link } from "react-router-dom";

import { Col, Nav, Button } from "react-bootstrap";
import { HomeRounded, AddCircleRounded, EditRounded } from "@material-ui/icons";

import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <Col xs={2} className={styles.sidebar}>
      <div className={styles.sidebarSticky}>
        <Nav
          className="mr-auto flex-column justify-content-between h-100"
          style={{ color: "var(--theme-text)" }}
        >
          <section>
            <Link to="/dashboard" className={styles.link}>
              <HomeRounded className={styles.linkIcon} />
              dashboard
            </Link>
            <h6 className={`${styles.sidebarHeader} px-3 mt-4 mb-`}>Ações</h6>
            <Link to="/dispositivo/criar" className={styles.link}>
              <AddCircleRounded
                className={styles.linkIcon}
                style={{ fontSize: "1rem" }}
              />
              dispositivo
            </Link>
            <Link to="/dispositivo/editar" className={styles.link}>
              <EditRounded
                className={styles.linkIcon}
                style={{ fontSize: "1rem" }}
              />
              dispositivo
            </Link>
          </section>
          <Link to="/logout" className={styles.logout}>
            <Button className={styles.logoutButton}>Logout</Button>
          </Link>
        </Nav>
      </div>
    </Col>
  );
};

export default Sidebar;
