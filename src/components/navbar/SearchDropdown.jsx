import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchDropdown = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="dropdown">
      <button
        className="btn sw-search-btn d-flex align-items-center"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <i className="bi bi-search me-1"></i>
        <span className="d-none d-sm-inline">Search</span>
      </button>

      <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 280 }}>
        <form className="sw-search" onSubmit={submit}>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button className="btn sw-search-btn" type="submit">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};