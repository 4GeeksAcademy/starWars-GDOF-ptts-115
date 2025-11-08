import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../services/swapi.js";
import { FavButton } from "../components/common/FavButton.jsx";

export const Single = () => {
  const { category, id } = useParams();
  const [state, setState] = useState({ loading: true, error: "", item: null });

  useEffect(() => {
    const load = async () => {
      setState({ loading: true, error: "", item: null });
      try {
        const item = await fetchDetails(category, id);
        setState({ loading: false, error: "", item });
      } catch (err) {
        setState({ loading: false, error: err.message || "Error", item: null });
      }
    };
    load();
  }, [category, id]);

  if (state.loading) return <div className="sw-loading">Loading...</div>;
  if (state.error) return <div className="sw-loading sw-error">{state.error}</div>;
  if (!state.item) return null;

  const item = state.item;
  const title = item.name || item.title || "Unknown";
  const meta = buildMeta(category, item);

  return (
    <main className="sw-detail">
      <div className="container py-4">
        <header className="sw-detail-header">
          <h1>Databank</h1>
        </header>
        <section className="sw-detail-hero">
          <div className="sw-detail-image-wrap">
            {item.image && (
              <img
                src={item.image}
                alt={title}
                className="sw-detail-image"
                onError={e => {
                  e.currentTarget.style.visibility = "hidden";
                }}
              />
            )}
          </div>
          <div className="sw-detail-summary">
            <div className="sw-detail-title-row">
              <h2>{title}</h2>
              <FavButton item={item} />
            </div>
            <p className="sw-detail-text">
              {buildDescription(category, item)}
            </p>
          </div>
        </section>
        <section className="sw-detail-meta">
          {meta.map(m => (
            <div key={m.label} className="sw-detail-meta-col">
              <div className="sw-detail-meta-label">{m.label}</div>
              <div className="sw-detail-meta-value">{m.value}</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

const buildMeta = (category, item) => {
  if (category === "people") {
    return [
      { label: "Birth year", value: item.birth_year || "-" },
      { label: "Gender", value: item.gender || "-" },
      { label: "Height", value: item.height ? item.height + " cm" : "-" },
      { label: "Mass", value: item.mass ? item.mass + " kg" : "-" }
    ];
  }
  if (category === "planets") {
    return [
      { label: "Climate", value: item.climate || "-" },
      { label: "Terrain", value: item.terrain || "-" },
      { label: "Population", value: item.population || "-" },
      { label: "Gravity", value: item.gravity || "-" }
    ];
  }
  if (category === "starships" || category === "vehicles") {
    return [
      { label: "Model", value: item.model || "-" },
      { label: "Manufacturer", value: item.manufacturer || "-" },
      { label: "Class", value: item.starship_class || item.vehicle_class || "-" },
      { label: "Crew", value: item.crew || "-" }
    ];
  }
  if (category === "species") {
    return [
      { label: "Classification", value: item.classification || "-" },
      { label: "Language", value: item.language || "-" },
      { label: "Average lifespan", value: item.average_lifespan || "-" },
      { label: "Average height", value: item.average_height || "-" }
    ];
  }
  if (category === "films") {
    return [
      { label: "Episode", value: item.episode_id || "-" },
      { label: "Director", value: item.director || "-" },
      { label: "Producer", value: item.producer || "-" },
      { label: "Release date", value: item.release_date || "-" }
    ];
  }
  return [];
};

const buildDescription = (category, item) => {
  if (category === "films") return item.opening_crawl || "";
  return "";
};