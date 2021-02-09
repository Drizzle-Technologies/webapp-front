import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import { DataGrid } from "@material-ui/data-grid";

import Header from "../../components/header"
import Sidebar from "../../components/sidebar"

import api from "../../services/api";

import * as DashboardActions from "../../store/actions/dashboard";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.dashboard.devices);

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
          if(res.response){
            console.log(res.response.data);
          }
        });
    }
    getData();
  }, [dispatch]);

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
              />
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
