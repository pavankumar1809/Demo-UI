import React, { useState } from "react";

function NavButtons(props) {
  const [page, setPage] = useState(1);

  function previousPage() {
    console.log(props);
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < 3) {
      setPage(page + 1);
    }
  }
  return (
    <div>
      <div className="nav-buttons">
        <button className="nav-button" onClick={previousPage}>
          previous
        </button>
        <button className="nav-button" onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  );
}

export default NavButtons;
