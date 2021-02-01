import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../../services/api";

import * as DashboardActions from "../../store/actions/dashboard";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.dashboard.devices);

  useEffect(() => {
    async function getData() {
      const pathname = "/dashboard";

      await api
        .get(pathname)
        .then((res) => {
          dispatch(DashboardActions.setData(res.data));
        })
        .catch((res) => {
          console.log(res.response.data);
        });
    }
    getData();

  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      {devices.map((device, index) => {
        return <span key={index}>{device.ID}</span>;
      })}
    </div>
  );
};

export default Dashboard;
