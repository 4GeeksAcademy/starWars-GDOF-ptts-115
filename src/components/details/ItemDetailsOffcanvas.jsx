import { useEffect, useMemo, useState } from "react";
import "./ItemDetails.css";
import { getDetails } from "../../services/swapi.js";

const FIELDS_BY_CAT = {
  people: [
    ["name", "Nombre"],
    ["birth_year", "Año de nacimiento"],
    ["gender", "Género"],
    ["height", "Altura"],
    ["mass", "Masa"],
    ["skin_color", "Piel"],
    ["eye_color", "Ojos"],
    ["hair_color", "Cabello"],
  ],
  starships: [
    ["name", "Nombre"],
    ["model", "Modelo"],
    ["manufacturer", "Fabricante"],
    ["cost_in_credits", "Costo"],
    ["length", "Longitud"],
    ["crew", "Tripulación"],
    ["passengers", "Pasajeros"],
    ["hyperdrive_rating", "Hiperimpulsor"],
  ],
  planets: [
    ["name", "Nombre"],
    ["climate", "Clima"],
    ["terrain", "Terreno"],
    ["population", "Población"],
    ["diameter", "Diámetro"],
    ["gravity", "Gravedad"],
    ["rotation_period", "Rotación"],
    ["orbital_period", "Órbita"],
  ],
  species: [
    ["name", "Nombre"],
    ["classification", "Clasificación"],
    ["designation", "Designación"],
    ["average_height", "Altura media"],
    ["skin_colors", "Piel"],
    ["hair_colors", "Cabello"],
    ["eye_colors", "Ojos"],
    ["average_lifespan", "Vida media"],
    ["language", "Idioma"],
  ],
  vehicles: [
    ["name", "Nombre"],
    ["model", "Modelo"],
    ["manufacturer", "Fabricante"],
    ["cost_in_credits", "Costo"],
    ["length", "Longitud"],
    ["crew", "Tripulación"],
    ["passengers", "Pasajeros"],
  ],
  films: [
    ["title", "Título"],
    ["episode_id", "Episodio"],
    ["director", "Director"],
    ["producer", "Productor"],
    ["release_date", "Estreno"],
    ["opening_crawl", "Introducción"],
  ],
};

const pretty = (v) => {
  if (v === null || v === undefined) return "—";
  const s = String(v).trim();
  if (!s || ["unknown","n/a"].includes(s.toLowerCase())) return "—";
  return s;
};

export const ItemDetailsOffcanvas = ({ selected, onClose }) => {
  const [state, setState] = useState({ loading: false, raw: null, item: null, error: null });
  const cat = selected?.cat || null;
  const apiId = selected?.apiId || null;

  useEffect(() => {
    if (!cat || !apiId) return;
    const abort = new AbortController();
    setState({ loading: true, raw: null, item: selected, error: null });
    getDetails(cat, apiId, abort.signal)
      .then((res) => setState({ loading: false, raw: res.raw, item: res.item, error: null }))
      .catch((e) => setState({ loading: false, raw: null, item: selected, error: e.message || "Error" }));
    return () => abort.abort();
  }, [cat, apiId]);

  const fields = useMemo(() => FIELDS_BY_CAT[cat] || [], [cat]);

  return (
    <div
      className="offcanvas offcanvas-end text-bg-dark item-details"
      tabIndex="-1"
      id="itemDetailsPanel"
      aria-labelledby="itemDetailsLabel"
      data-bs-scroll="true"
      onHidden={() => onClose?.()}
    >
      <div className="offcanvas-header border-bottom border-secondary">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning text-dark text-uppercase">{cat || "—"}</span>
          <h5 className="offcanvas-title m-0" id="itemDetailsLabel">
            {state.item?.title || "Detalles"}
          </h5>
        </div>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body">
        {state.loading && <div className="alert alert-dark mb-3">Cargando detalles…</div>}
        {state.error && <div className="alert alert-danger mb-3">{state.error}</div>}

        <div className="details-grid">
          {state.item?.img && (
            <div className="details-media">
              <img
                src={state.item.img}
                alt={state.item.title}
                className="img-fluid rounded border border-secondary"
                onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              />
            </div>
          )}

          <div className="details-info">
            <div className="row g-2">
              {fields.map(([key, label]) => (
                <div key={key} className="col-12 col-md-6">
                  <div className="details-field">
                    <div className="details-label">{label}</div>
                    <div className="details-value">
                      {pretty((state.raw && state.raw[key]) ?? "—")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cat === "films" && state.raw?.opening_crawl && (
              <div className="mt-3">
                <div className="details-label">Sinopsis</div>
                <div className="details-value small">{state.raw.opening_crawl}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};