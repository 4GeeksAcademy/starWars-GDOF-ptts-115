import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../services/swapi.js";
import "./ItemDetail.css";

const FIELDS = {
  people: [
    ["Altura", "height"],
    ["Masa", "mass"],
    ["Género", "gender"],
    ["Año de nacimiento", "birth_year"],
    ["Color de piel", "skin_color"],
    ["Color de ojos", "eye_color"],
    ["Color de cabello", "hair_color"],
  ],
  starships: [
    ["Modelo", "model"],
    ["Fabricante", "manufacturer"],
    ["Costo (créditos)", "cost_in_credits"],
    ["Longitud", "length"],
    ["Tripulación", "crew"],
    ["Pasajeros", "passengers"],
    ["Clase", "starship_class"],
    ["Hipermotor", "hyperdrive_rating"],
  ],
  planets: [
    ["Clima", "climate"],
    ["Terreno", "terrain"],
    ["Diámetro", "diameter"],
    ["Rotación (h)", "rotation_period"],
    ["Órbita (d)", "orbital_period"],
    ["Población", "population"],
    ["Gravedad", "gravity"],
  ],
  species: [
    ["Clasificación", "classification"],
    ["Designación", "designation"],
    ["Altura promedio", "average_height"],
    ["Color de piel", "skin_colors"],
    ["Color de ojos", "eye_colors"],
    ["Lengua", "language"],
  ],
  vehicles: [
    ["Modelo", "model"],
    ["Fabricante", "manufacturer"],
    ["Costo (créditos)", "cost_in_credits"],
    ["Longitud", "length"],
    ["Tripulación", "crew"],
    ["Pasajeros", "passengers"],
    ["Clase", "vehicle_class"],
  ],
  films: [
    ["Episodio", "episode_id"],
    ["Director", "director"],
    ["Productor", "producer"],
    ["Estreno", "release_date"],
  ],
};

const LABELS = {
  people: "PEOPLE",
  starships: "STARSHIPS",
  planets: "PLANETS",
  species: "SPECIES",
  vehicles: "VEHICLES",
  films: "FILMS",
};

export const ItemDetail = () => {
  const { category, id } = useParams();
  const [state, setState] = useState({ loading: true, item: null, raw: null, error: null });

  useEffect(() => {
    const abort = new AbortController();
    setState({ loading: true, item: null, raw: null, error: null });

    getDetails(category, id, abort.signal)
      .then(({ item, raw }) => setState({ loading: false, item, raw, error: null }))
      .catch((e) => setState({ loading: false, item: null, raw: null, error: e.message || "Error" }));

    return () => abort.abort();
  }, [category, id]);

  const title = useMemo(() => {
    const map = {
      people: "Personajes", starships: "Naves", planets: "Planetas",
      species: "Especies", vehicles: "Vehículos", films: "Películas",
    };
    return map[category] || category;
  }, [category]);

  if (state.loading) {
    return (
      <div className="container py-4">
        <div className="detail-hero skeleton">
          <div className="detail-img sk" />
          <div className="detail-body">
            <div className="sk sk-line mb-2" style={{ width: "70%" }} />
            <div className="sk sk-line mb-2" style={{ width: "40%" }} />
            <div className="sk sk-line" style={{ width: "90%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="container py-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Link to={`/category/${category}`} className="btn btn-outline-light btn-sm">← Volver</Link>
          <span className="badge bg-secondary">{LABELS[category] || category}</span>
        </div>
        <div className="alert alert-danger">{state.error}</div>
      </div>
    );
  }

  const { item, raw } = state;
  const fields = FIELDS[category] || [];
  const description =
    category === "films"
      ? raw.opening_crawl
      : item.subtitle || "";

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to={`/category/${category}`} className="btn btn-outline-light btn-sm">← Volver</Link>
        <span className="badge bg-secondary">{LABELS[category] || category}</span>
      </div>

      <div className="detail-hero">
        <div className="detail-img-wrap">
          {item.img ? (
            <img
              src={item.img}
              alt={item.title}
              className="detail-img"
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            />
          ) : (
            <div className="detail-img fallback" />
          )}
        </div>

        <div className="detail-body">
          <h1 className="h3 mb-1">{item.title}</h1>
          {description && <p className="text-muted mb-3">{description}</p>}

          <div className="detail-grid">
            {fields.map(([label, key]) => {
              const value = raw?.[key];
              if (!value) return null;
              return (
                <div className="detail-row" key={key}>
                  <div className="detail-label">{label}</div>
                  <div className="detail-value">{String(value)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};