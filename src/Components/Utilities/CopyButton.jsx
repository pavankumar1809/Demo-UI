import React, { useState } from "react";

function CopyButton(props) {
  const [hover, setHover] = useState(false);
  const tooltip = hover ? "copy" : "copy-lite";

  function handleMouseIn() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }
  return (
    <div className="copy-icon">
      <button onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
        Copy
      </button>
      <div className={tooltip}>this is the tooltip!!</div>
    </div>
  );
}

export default CopyButton;
