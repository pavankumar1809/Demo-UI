import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

function FederationSetup() {
  const navigate = useNavigate();
  const [fedApp, SetFedApp] = useState({
    orgName: "",
    providerName: "",
    providerType: "",
    oidc_issuer: "",
    client_id: "",
    client_secret: "",
    attributes_request_method: "",
    MetadataURL: "",
  });
  const [spDetails, SetSpDetails] = useState({
    domainUrl: "",
    odicAuthUrl: "",
    samlEntityId: "",
    samlAcsUrl: "",
  });
  const [page, setPage] = useState(1);
  const [orgs, setOrgs] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  axios.defaults.baseURL = "https://localhost:9555/ush-identity";
  axios.defaults.headers.common = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "x-ush-ids-token": Cookie.get("token"),
  };

  function showAlert() {
    if (alert.show === true) {
      return (
        <Alert variant={alert.type} onClose={closeAlert} dismissible>
          <p>{alert.message}</p>
        </Alert>
      );
    }
  }

  function closeAlert() {
    setAlert({
      show: false,
      message: "",
      type: "",
    });
  }

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < 3) {
      setPage(page + 1);
    }
  }

  function navButtons() {
    return (
      <div className="nav-buttons">
        <button className="prev-button" onClick={previousPage}>
          previous
        </button>
        <button
          className="next-button"
          onClick={page === 3 ? handleSubmit : nextPage}
        >
          {page === 3 ? "save" : "next"}
        </button>
      </div>
    );
  }
  function currentPage() {
    switch (page) {
      case 1:
        return serviceProiderDetails();
      case 2:
        return basicDetails();
      case 3:
        if (fedApp.providerType === "OIDC") {
          return idpOIDCDetails();
        }
        return idpSAMLDetails();
      default:
        return finalPage();
    }
  }

  function getorgs() {
    axios.get("/v1/orgs").then((res) => {
      setOrgs(res.data.detailedResponse);
    });
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
  }

  function serviceProiderDetails() {
    return (
      <div>
        <h5>SP Configuration Details</h5>
        <div className="mb-3">
          <label>Domain URL</label>
          <input
            type="text"
            className="form-control"
            value={spDetails.domainUrl}
            disabled
          />
          <button className="cpy" onClick={copy(spDetails.domainUrl)}>
            <FaCopy />
          </button>
        </div>
        <div className="mb-3">
          <label>OIDC AUTH REDIRECT URL</label>
          <input
            type="text"
            className="form-control"
            value={spDetails.odicAuthUrl}
            disabled
          />
          <button className="cpy" onClick={copy(spDetails.odicAuthUrl)}>
            <FaCopy />
          </button>
        </div>
        <div className="mb-3">
          <label>SAML ENTITY ID</label>
          <input
            type="text"
            className="form-control"
            value={spDetails.samlEntityId}
            disabled
          />
          <button className="cpy" onClick={copy(spDetails.samlEntityId)}>
            <FaCopy />
          </button>
        </div>
        <div className="mb-3">
          <label>SAML ACS URL</label>
          <input
            type="text"
            className="form-control"
            value={spDetails.samlAcsUrl}
            disabled
          />
          <button className="cpy" onClick={copy(spDetails.samlAcsUrl)}>
            <FaCopy />
          </button>
        </div>
      </div>
    );
  }

  function basicDetails() {
    return (
      <div>
        <h5>Basic Details</h5>
        <div className="mb-3">
          <label>Organization</label>
          <select
            className="form-control"
            name="orgName"
            onChange={handleChange}
            defaultValue={fedApp.orgName}
            required
          >
            <option value="" disabled hidden>
              --select--
            </option>
            {orgs.map((org) => (
              <option key={org.organizationName} value={org.organizationName}>
                {org.organizationName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>ProviderName</label>
          <input
            type="text"
            name="providerName"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Federated application name ...."
            value={fedApp.providerName}
          />
        </div>
        <div className="mb-3">
          <label>Provider Type</label>
          <select
            className="form-control"
            name="providerType"
            onChange={handleChange}
            defaultValue={fedApp.providerType}
            required
          >
            <option value="" disabled hidden>
              --provider type--
            </option>
            <option value="OIDC">OIDC</option>
            <option value="SAML">SAML</option>
          </select>
        </div>
      </div>
    );
  }
  function idpOIDCDetails() {
    return (
      <div>
        <h5>OIDC provider Details</h5>
        <div className="mb-3">
          <label>ClientId</label>
          <input
            type="text"
            name="client_id"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter IDP clientId ...."
            value={fedApp.client_id}
          />
        </div>
        <div className="mb-3">
          <label>ClientSecret</label>
          <input
            type="text"
            name="client_secret"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter IDP client secret ...."
            value={fedApp.client_secret}
          />
        </div>
        <div className="mb-3">
          <label>OIDC Issuer Url</label>
          <input
            type="text"
            name="oidc_issuer"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter OIDC Issuer url ...."
            value={fedApp.oidc_issuer}
          />
        </div>
        <div className="mb-3">
          <label>Attributes Request Method</label>
          <select
            className="form-control"
            name="attributes_request_method"
            onChange={handleChange}
            defaultValue={fedApp.attributes_request_method}
            required
          >
            <option value="" disabled hidden>
              --select--
            </option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </div>
      </div>
    );
  }
  function idpSAMLDetails() {
    return (
      <div>
        <h5>SAML provider Details</h5>
        <div className="mb-3">
          <label>Metadata Url</label>
          <input
            type="text"
            name="MetadataURL"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Saml Metadata url ...."
            value={fedApp.MetadataURL}
          />
        </div>
      </div>
    );
  }

  function finalPage() {
    return (
      <div>
        {serviceProiderDetails()}
        {basicDetails()}
        {fedApp.providerType === "OIDC" ? idpOIDCDetails() : idpSAMLDetails()}
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;

    SetFedApp((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    var providerDetails = {};
    if (fedApp.providerType === "OIDC") {
      providerDetails = {
        client_id: fedApp.client_id,
        client_secret: fedApp.client_secret,
        oidc_issuer: fedApp.oidc_issuer,
        attributes_request_method: fedApp.attributes_request_method,
      };
    } else {
      providerDetails = {
        MetadataURL: fedApp.MetadataURL,
      };
    }
    var body = {
      providerName: fedApp.providerName,
      providerType: fedApp.providerType,
      orgName: fedApp.orgName,
      providerDetails: providerDetails,
    };
    e.preventDefault();
    await axios
      .post("/v1/idp", body)
      .then((res) => {
        setAlert({
          show: true,
          message: res.data.detailedResponse.message,
          type: "success",
        });
        navigate("/success");
      })
      .catch((err) => {
        setAlert({
          show: true,
          message: err.response.data.message,
          type: "danger",
        });
      });
    console.log(alert);
  }

  useEffect(() => {
    axios.get("/v1/sp/config").then((res) => {
      SetSpDetails({
        domainUrl: res.data.detailedResponse.oidc.domainUrl,
        odicAuthUrl: res.data.detailedResponse.oidc.authRedirectURL,
        samlEntityId: res.data.detailedResponse.saml.entityId,
        samlAcsUrl: res.data.detailedResponse.saml.acsUrl,
      });
    });
    getorgs();
  }, []);

  return (
    <div className="box-fed">
      <h3>Create Federated Application</h3>
      {showAlert()}
      {currentPage()}
      {navButtons()}
    </div>
  );
}

export default FederationSetup;
