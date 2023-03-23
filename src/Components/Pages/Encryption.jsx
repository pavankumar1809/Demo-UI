import React, { useState } from "react";
import "../CSS/pages.css";
import CryptoJS from "crypto-js";
import { FaCopy } from "react-icons/fa";

function Encryption() {
  const [plain, setPlain] = useState("");
  const [encoded, setEncoded] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setPlain(value);
  }

  function encrypt() {
    var secret = "AZhFUNsojucFuhzEpL9KWoktezjlL25v";
    var parsedKey = CryptoJS.enc.Utf8.parse(secret);
    var iv = CryptoJS.enc.Utf8.parse(secret.substring(0, 16));
    var encrypted = CryptoJS.AES.encrypt(plain, parsedKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    setEncoded(encrypted.toString());
  }

  return (
    <div className="box">
      <h3>Encrypt String</h3>
      <br />
      <div className="mb-3">
        <label>Plain Text</label>
        <textarea
          onChange={handleChange}
          className="text-top"
          placeholder="Enter Text..."
          value={plain}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="button-1" onClick={encrypt}>
          Encrypt
        </button>
      </div>
      <br />
      <div className="mb-3">
        <label>Encrypted Text</label>
        <div className="copy">
          <textarea
            className="text-bottom"
            placeholder="Encrypted text will be displayed here...."
            value={encoded}
            disabled
          />
          <button onclick={navigator.clipboard.writeText(encoded)}>
            <FaCopy />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Encryption;
