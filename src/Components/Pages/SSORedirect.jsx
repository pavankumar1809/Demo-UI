import React, { useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SSORedirect() {
  const navigate = useNavigate();
  axios.defaults.baseURL = "https://localhost:9555/ush-identity";
  axios.defaults.headers.common = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "x-ush-ids-token": Cookie.get("token"),
  };
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    var body = {
      providerName: Cookie.get("providerName"),
      code: queryParameters.get("code"),
    };
    axios.post("/v1/sso/token", body).then((res) => {
      console.log(body);
      Cookie.set("uuid", res.data.detailedResponse.uuid);
      Cookie.set("accessToken", res.data.detailedResponse.accessToken);
      navigate("/success");
    });
  }, [navigate]);
  return <div></div>;
}

export default SSORedirect;
