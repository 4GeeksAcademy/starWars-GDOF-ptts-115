import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobalReducer.jsx";

export const FavoritesWidget = () => {
  const { state, dispatch } = useGlobal();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const toggleOpen = () => setOpen(v => !v);

  useEffect(() => {
    const handle = e => {
      if (!btnRef.current) return;
      const panel = document.getElementById("sw-favs-panel");
      if (
        !btnRef.current.contains(e.target) &&
        (!panel || !panel.contains(e.target))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const goTo = fav => {
    setOpen(false);
    navigate(`/${fav.category}/${fav.id}`);
  };

  const remove = fav => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: fav });
  };

  const total = state.favorites.length;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="sw-favs-btn-inline"
        onClick={toggleOpen}
      >
        Favorites
        {total > 0 && <span className="sw-favs-count">{total}</span>}
      </button>

      {open && (
        <div id="sw-favs-panel" className="sw-favs-panel-fixed">
          <div className="sw-favs-header">Favorites</div>

          {total === 0 ? (
            <div className="sw-favs-empty">No favorites yet.</div>
          ) : (
            <ul className="sw-favs-list">
              {state.favorites.map(fav => (
                <li
                  key={fav.key || `${fav.category}-${fav.id}-${fav.name}`}
                  className="sw-favs-item"
                  onClick={() => goTo(fav)}
                >
                  {fav.image && (
                    <img
                      src={fav.image}
                      alt={fav.name}
                      className="sw-favs-thumb"
                      onError={e => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  )}

                  <div className="sw-favs-text">
                    <div className="sw-favs-name">
                      {fav.name || fav.title || "Unknown"}
                    </div>
                    <div className="sw-favs-meta">
                      {fav.category
                        ? fav.category.toUpperCase()
                        : ""}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="sw-favs-remove"
                    onClick={e => {
                      e.stopPropagation();
                      remove(fav);
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};