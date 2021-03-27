import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import { RemoveAuth } from "../../services/Auth";

const Logout = (props) => {
  const history = useHistory();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    api
      .post("/logout", { refreshToken: refreshToken })
      .then((data) => {
        RemoveAuth();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <div />;
};

export default Logout;
