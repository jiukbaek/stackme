import React from "react";
import "../../css/modal.scss";

function ModalBox({ children }) {
  return (
    <div className="modalWrapper">
      <div className="modalInner">{children}</div>
    </div>
  );
}

export default ModalBox;
