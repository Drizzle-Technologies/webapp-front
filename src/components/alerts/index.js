import React from "react";

import { Slide, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import styles from "./alerts.module.css"

import { useDispatch, useSelector } from "react-redux";

import * as AlertsActions from "../../store/actions/alerts";

const Alerts = (props) => {
  const dispatch = useDispatch();  
  const alerts = useSelector((state) => state.alerts);

  if(alerts !== null && alerts.length > 0){
    const alertList = alerts.map((alert) => {
        return (
          <Slide
            key={alert.id}
            in={true}
            direction="right"
            mountOnEnter
            className={styles.alert}
          >
            <Alert
              severity={alert.severity}
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    dispatch(AlertsActions.removeAlert(alert.id));
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.message}
            </Alert>
          </Slide>
        );
      });
    console.log("Alerts: ", alerts)
    
    
    return alertList;  
  }

  
  return null;
};

export default Alerts;
