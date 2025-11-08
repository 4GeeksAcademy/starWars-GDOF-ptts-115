import { Link } from "react-router-dom";
import { ItemCard } from "./ItemCard.jsx";

export const CategoryCarousel = ({ title, category, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="sw-section">
      <div className="sw-section-header">
        <h2>{title}</h2>
        <Link to={`/category/${category}`} className="sw-section-seeall">
          See all
        </Link>
      </div>
      <div className="sw-section-row">
        {items.map(item => (
          <div key={`${item.category}-${item.id}`} className="sw-section-card-wrap">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};