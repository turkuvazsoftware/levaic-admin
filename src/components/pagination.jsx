import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages === 0) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="row align-items-center mt-4">
      <div className="col-sm-6">
        <span>{start} ile {end} arası gösteriliyor, toplam {totalItems} kayıt</span>
      </div>
      <div className="col-sm-6 text-sm-end mt-sm-0 mt-3">
        <div className="d-inline-flex align-items-center gap-3 flex-wrap card-navigation">
          <button
            className="btn btn-link text-body link-primary p-0 d-flex align-items-center"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="icon-20 me-1" width="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.5 19L8.5 12L15.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Önceki</span>
          </button>

          <button
            className="btn btn-link text-body link-primary p-0 d-flex align-items-center"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span>Sonraki</span>
            <svg className="icon-20 ms-1" width="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;