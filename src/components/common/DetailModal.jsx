import { useEffect, useState } from "react";
import { getDetails } from "../../service/swapi.js"; 
import { addFavorite } from "../../service/favoritesService.js";
import { detailFields } from "./detailFields.js";
import "./DetailModal.css";

export const DetailModal = ({ show, onClose, category, apiId, preset }) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    item: preset || null, 
    raw: null,            
  });

  useEffect(() => {
    if (!show || !category || !apiId) return;
    const abort = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    getDetails(category, apiId, abort.signal)
      .then((res) => setState({ loading: false, error: null, item: res.item, raw: res.raw }))
      .catch((e) => setState({ loading: false, error: e.message || "Error", item: null, raw: null }));
    return () => abort.abort();
  }, [show, category, apiId]);

  // Bloquear scroll del body mientras esté abierto
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  if (!show) return null;

  const { loading, error, item, raw } = state;
  const title = item?.title || raw?.name || raw?.title || "Detalle";
  const subtitle = item?.subtitle || "";
  const img = item?.img || "";
  const fields = detailFields(category);
  const v = (k) => (raw && raw[k] ? String(raw[k]) : "—");

  return (
    <>
      <div className="modal fade show dm-modal" style={{ display: "block" }} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header border-0">
              <div>
                <h5 className="modal-title fw-bold">{title}</h5>
                {subtitle && <div className="text-secondary small">{subtitle}</div>}
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => item && addFavorite({ id: item.id, title: item.title, subtitle: item.subtitle, img: item.img })}
                  title="Añadir a favoritos"
                >
                  <i className="bi bi-star"></i>
                </button>
                <button className="btn btn-outline-light btn-sm" onClick={onClose} aria-label="Cerrar">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="modal-body pt-0">
              {loading && <div className="alert alert-dark mb-0">Cargando…</div>}
              {error && <div className="alert alert-danger mb-0">{error}</div>}

              {!loading && !error && (
                <div className="row g-3">
                  <div className="col-12 col-md-5 col-lg-4">
                    <div className="dm-img-wrap">
                      {img ? (
                        <img src={img} alt={title} className="dm-img" onError={(e)=>{ e.currentTarget.style.visibility="hidden"; }} />
                      ) : (
                        <div className="dm-img ph"></div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-7 col-lg-8">
                    {/* Para films, mostrar el crawl */}
                    {category === "films" && raw?.opening_crawl && (
                      <div className="dm-block mb-3">
                        <div className="dm-block-title">Sinopsis</div>
                        <p className="mb-0 small text-secondary" style={{whiteSpace:"pre-wrap"}}>
                          {raw.opening_crawl}
                        </p>
                      </div>
                    )}

                    <div className="dm-block">
                      <div className="dm-block-title">Detalles</div>
                      <div className="row row-cols-1 row-cols-sm-2 g-2">
                        {fields.map(([label, key]) => (
                          <div className="col" key={key}>
                            <div className="dm-kv">
                              <div className="dm-k">{label}</div>
                              <div className="dm-v">{v(key)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};