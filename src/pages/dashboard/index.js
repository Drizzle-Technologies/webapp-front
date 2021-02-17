import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Row, Col, Button } from "react-bootstrap";
import { DataGrid } from "@material-ui/data-grid";

import styles from "./dashboard.module.css";

import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

import api from "../../services/api";

import * as DashboardActions from "../../store/actions/dashboard";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.dashboard.devices);

  const [rowSelection, setRowSelection] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "shop_name", headerName: "Shop Name", width: 300 },
    { field: "area", headerName: "Area", width: 150 },
    { field: "max_people", headerName: "Max People", width: 150 },
    { field: "current_occupancy", headerName: "Occupancy", width: 150 },
  ];

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

  async function deleteDevice() {
    const pathname = "/device/delete";

    const idList = rowSelection;

    const data = { idList: idList };

    await api.delete(pathname, data)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <Header />
      <Row>
        <Sidebar />
        <Col xs={9} className="ml-sm-auto col-lg-10 pt-3 px-4">
          <Container>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={devices}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onSelectionChange={(select) => {
                  setRowSelection(select.rowIds);
                }}
              />
            </div>
            <Button onClick={deleteDevice} className={styles.deleteButton}>
              Deletar
            </Button>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
