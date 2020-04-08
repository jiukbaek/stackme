import React from "react";
import "../../css/pagination.scss";

function Pagination({ pagination, onChange }) {
  const { page, totalPage, nowGroupStartPage, nowGroupEndPage } = pagination;
  const pages = [];

  for (let i = nowGroupStartPage; i <= nowGroupEndPage; i++) {
    pages.push(
      <button
        key={i}
        className={parseInt(page) === i ? "active" : ""}
        onClick={() => onChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="paginationWrapper">
      <div className="paginationButtons">
        {nowGroupStartPage !== 1 && (
          <>
            <button onClick={() => onChange(1)}>
              <i className="fa fa-angle-double-left"></i>
            </button>
            <button onClick={() => onChange(nowGroupStartPage - 1)}>
              <i className="fa fa-angle-left"></i>
            </button>
          </>
        )}
        {pages}
        {nowGroupEndPage !== totalPage && (
          <>
            <button onClick={() => onChange(nowGroupEndPage + 1)}>
              <i className="fa fa-angle-right"></i>
            </button>
            <button onClick={() => onChange(totalPage)}>
              <i className="fa fa-angle-double-right"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Pagination;
