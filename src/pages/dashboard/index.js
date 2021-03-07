import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Row, Col, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Autocomplete } from "@material-ui/lab";

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

  const graphData = useSelector((state) => state.graph.graph);
  const firstDatetime = useSelector((state) => state.graph.firstDatetime);
  const shopNamesOptions = useSelector((state) => state.graph.shopNamesOptions);
  const nLinesOptions = useSelector((state) => state.graph.nLinesOptions);

  const [rowSelection, setRowSelection] = useState([]);

  const [deviceIdPlotted, setDeviceIdPlotted] = useState("");
  const [nLinesPlotted, setNLinesPlotted] = useState("");

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

      await api
        .get(pathnameDevice)
        .then((res) => {
          dispatch(DevicesActions.setData(res.data));
          dispatch(GraphActions.setOptions(res.data));
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

  async function plotGraph() {
    console.log("plotgraph")
    console.log("deviceIdPlotted", deviceIdPlotted)
    console.log("nLinesPlotted", nLinesPlotted)
    if(deviceIdPlotted && nLinesPlotted){
      console.log("inside")
      const pathname = `/occupancy/graph/${deviceIdPlotted}/${nLinesPlotted}`;

      await api
        .get(pathname)
        .then((res) => {
          dispatch(GraphActions.setData(res.data));
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    }
  }

  return (
    <div>
      <Header />
      <Row style={{ maxWidth: "100vw" }}>
        <Sidebar />
        <Col xs={9} className="ml-sm-auto col-lg-10 pt-3 px-4">
          <Container>
            <section className={styles.graphContainer}>
              <span>Dia e hora {firstDatetime}</span>
              <Line
                data={graphData}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                      hoverRadius: 4,
                    },
                  },
                  hover: {
                    intersect: false,
                    position: "nearest",
                  },
                  tooltips: {
                    mode: "index",
                    intersect: false,
                    position: "nearest",
                  },
                }}
              />
              <div className="d-flex align-items-center">
                <Autocomplete
                  id="combo-box-ids"
                  options={shopNamesOptions}
                  style={{ width: "25%", marginLeft: "30px" }}
                  getOptionLabel={(option) =>
                    option ? option.lable : ""
                  }
                  onChange={(event, value) => {
                    if (value) {
                      setDeviceIdPlotted(value.id);
                    } else {
                      setDeviceIdPlotted("");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Locais" variant="outlined" />
                  )}
                />
                <Autocomplete
                  id="combo-box-nLines"
                  options={nLinesOptions}
                  style={{ width: "25%", marginLeft: "30px" }}
                  getOptionLabel={(option) =>
                    option ? option.lable : ""
                  }
                  defaultValue={nLinesOptions[0]}
                  onChange={(event, value) => {
                    if (value) {
                      setNLinesPlotted(value.nLines);
                    } else {
                      setNLinesPlotted("");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Observações"
                      variant="outlined"
                    />
                  )}
                />
                <Button onClick={plotGraph} className={styles.drawButton}>
                  Desenhar
                </Button>
              </div>
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
