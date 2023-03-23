import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

function SSOLogin() {
  axios.defaults.baseURL = "https://localhost:9555/ush-identity";
  axios.defaults.headers.common = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "x-ush-ids-token": Cookie.get("token"),
  };
  const [fedApps, setFedApps] = useState([]);

  useEffect(() => {
    var body = {
      appId: Cookie.get("portalId"),
      orgName: Cookie.get("orgName"),
    };
    axios
      .post("/v1/sso/details", body)
      .then((res) => {
        setFedApps(res.data.detailedResponse);
      })
      .catch((err) => {
        setFedApps(undefined);
      });
  }, []);
  return (
    <div className="box">
      <h3>Federated SSO Login</h3>

      {fedApps !== undefined ? (
        fedApps.map((fedApp) => (
          <div className="card">
            <div className="container">
              <h4
                key={fedApp.providerName}
                onClick={() => {
                  Cookie.set("providerName", fedApp.providerName);
                }}
              >
                <a href={fedApp.ssoURL}>{fedApp.providerName}</a>
              </h4>
            </div>
          </div>
        ))
      ) : (
        <p className="sso-link">
          No SSO Applications created or something went wrong
        </p>
      )}
    </div>
  );
}

export default SSOLogin;
