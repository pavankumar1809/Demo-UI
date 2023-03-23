import React from "react";
import "../CSS/pages.css";
import Cookie from "js-cookie";

function Home() {
  if (Cookie.get("token") === undefined) {
    Cookie.set(
      "token",
      "UR.3386e1d2f8cd5a392c0a90c0f3969ec7.SHU.3c3ff9fe-c0c8-4154-8010-49457d83d49b"
    );
    Cookie.set("portalId", "633bbfdb25c3d308007ce233");
  }
  return (
    <div className="about-section">
      <h1>About Application</h1>
      <br />
      <p>
        This is a simple UI application created to test some of the API flows.
      </p>
      <br />
      <h3>APIs to be Tested using this UI</h3>
      <div className="apis">
        <span>Login API with encryption enabled</span>
        <br />
        <span>Encryption and Decryption tool</span>
        <br />
        <span>MFA login using TOTP</span>
        <br />
        <span>Federated Application Setup (not implemented)</span>
      </div>
    </div>
  );
}

export default Home;
