import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Row, Col, Button } from "react-bootstrap";
import { DataGrid } from "@material-ui/data-grid";

import styles from "./dashboard.module.css";

import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

import api from "../../services/api";

import * as DevicesActions from "../../store/actions/devices";
import * as GraphActions from "../../store/actions/graph";
import * as AlertsActions from "../../store/actions/alerts";

import { Line } from "react-chartjs-2";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);
  const graphData = useSelector((state) => state.graph.data);

  const [rowSelection, setRowSelection] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "shop_name", headerName: "Shop Name", width: 300 },
    { field: "area", headerName: "Area", width: 150 },
    { field: "max_people", headerName: "Max People", width: 150 },
    { field: "current_occupancy", headerName: "Occupancy", width: 150 },
  ];

  useEffect(() => {
    async function getData() {
      const pathnameDevice = "/dashboard";
      const pathnameGraph = "/occupancy/graph/2/24";

      await api
        .get(pathnameDevice)
        .then((res) => {
          dispatch(DevicesActions.setData(res.data));
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });

      await api
        .get(pathnameGraph)
        .then((res) => {
          dispatch(GraphActions.setData(res.data));
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    }
    getData();
  }, [dispatch, requestData]);

  async function deleteDevice() {
    const pathname = "/device/delete";

    const idList = rowSelection;

    await api
      .delete(pathname, {
        data: {
          idList: idList,
        },
      })
      .then((res) => {
        dispatch(
          AlertsActions.setAlert("Dispositivo(s) removido(s)!", "success")
        );
        setRequestData(new Date());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <Row style={{ maxWidth: "100vw" }}>
        <Sidebar />
        <Col xs={9} className="ml-sm-auto col-lg-10 pt-3 px-4">
          <Container>
            <section className={styles.graphContainer}>
              <Line data={graphData} />
            </section>
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
