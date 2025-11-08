import { useNavigate } from "react-router-dom";
import { FavButton } from "./FavButton.jsx";

const categoryLabelMap = {
  people: "People",
  planets: "Planets",
  starships: "Starships",
  species: "Species",
  vehicles: "Vehicles",
  films: "Films"
};

export const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const title = item.name || item.title || "Unknown";

  const go = () => navigate(`/${item.category}/${item.id}`);

  const onKeyDown = e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  };

  return (
    <article
      className="sw-card"
      onClick={go}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {item.image && (
        <div className="sw-card-img-wrap">
          <img
            src={item.image}
            alt={title}
            className="sw-card-img"
            onError={e => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>
      )}
      <div className="sw-card-content">
        <div className="sw-card-top">
          <h3 className="sw-card-title">{title}</h3>
          <span className="sw-card-tag">
            {categoryLabelMap[item.category] || item.category}
          </span>
        </div>
        <div className="sw-card-bottom">
          <FavButton item={item} />
        </div>
      </div>
    </article>
  );
};