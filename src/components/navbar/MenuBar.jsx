import { NavLink } from "react-router-dom";

export const MenuBar = () => {
  const categories = [
    { key: "films", label: "Films" },
    { key: "people", label: "People" },
    { key: "planets", label: "Planets" },
    { key: "species", label: "Species" },
    { key: "starships", label: "Starships" },
    { key: "vehicles", label: "Vehicles" },
  ];

  return (
    <ul className="nav sw-menu justify-content-between flex-wrap">
      {categories.map(cat => (
        <li className="nav-item" key={cat.key}>
          <NavLink
            to={`/category/${cat.key}`}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {cat.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};