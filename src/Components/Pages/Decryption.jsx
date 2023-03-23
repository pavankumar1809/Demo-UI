import React, { useState } from "react";
import "../CSS/pages.css";
import CryptoJS from "crypto-js";
import { FaCopy } from "react-icons/fa";

function Decryption() {
  const [plain, setPlain] = useState("");
  const [encoded, setEncoded] = useState("");
  const [error, setError] = useState();

  function handleChange(e) {
    const value = e.target.value;
    setEncoded(value);
  }

  function decrypt() {
    var secret = "AZhFUNsojucFuhzEpL9KWoktezjlL25v";
    var parsedKey = CryptoJS.enc.Utf8.parse(secret);
    var iv = CryptoJS.enc.Utf8.parse(secret.substring(0, 16));
    try {
      var decrypted = CryptoJS.AES.decrypt(encoded, parsedKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      });
      setPlain(decrypted.toString(CryptoJS.enc.Utf8));
      setError("");
    } catch (e) {
      setError(<span>Encrypted text is not hashed properly.....</span>);
    }
  }

  return (
    <div className="box">
      <h3>Decrypt String</h3>
      <br />
      <p className="err-msg">{error}</p>
      <div className="mb-3">
        <label>Encrypted Text</label>
        <textarea
          onChange={handleChange}
          className="hash"
          placeholder="Enter encrypted string "
          value={encoded}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="button-1" onClick={decrypt}>
          Decrypt
        </button>
      </div>
      <br />
      <div className="mb-3">
        <label>Plain Text</label>
        <div className="copy">
          <textarea
            className="plain"
            placeholder="Decrypted text will be displayed here....."
            value={plain}
            disabled
          />
          <button onclick={navigator.clipboard.writeText(plain)}>
            <FaCopy />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Decryption;
