import { Link } from "react-router-dom";
import "./NavbarStarWars.css";
import { Logo } from "./Logo";
import { SearchDropdown } from "./SearchDropdown";
import { FavoritesWidget } from "./FavoritesWidget";
import { MenuBar } from "./MenuBar";

export const Navbar = () => {
  return (
    <header className="sw-header sticky-top">
      <nav className="navbar navbar-expand-lg sw-navbar">
        <div className="container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between position-relative">
          <div className="position-absolute start-50 translate-middle-x sw-center-brand mt-4">
            <Link to="/" className="navbar-brand sw-logo-link text-decoration-none">
              <Logo />
            </Link>
          </div>

          <div className="d-flex align-items-center gap-2 ms-auto">
            <SearchDropdown />
            <FavoritesWidget />

            <button
              className="navbar-toggler text-light border-0 ms-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#swMenuBottom"
              aria-controls="swMenuBottom"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list fs-3"></i>
            </button>
          </div>

        </div>
      </nav>

      <div className="sw-subbar">
        <div className="container-fluid px-3 px-lg-4">
          <div className="collapse show" id="swMenuBottom">
            <MenuBar />
          </div>
        </div>
      </div>
    </header>
  );
};