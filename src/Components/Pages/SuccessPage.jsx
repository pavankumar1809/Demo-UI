import React from "react";

function SuccessPage(props) {
  return (
    <div className="success">
      <div className="check-mark">
        <i className="checkmark">✓</i>
      </div>
      <h1>Success</h1>
      <p>{props.message}</p>
    </div>
  );
}

export default SuccessPage;
