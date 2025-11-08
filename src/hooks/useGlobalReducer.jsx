import { createContext, useContext, useEffect, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  favorites: []
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT_FAVORITES":
      return { ...state, favorites: action.payload };
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.find(f => f.key === action.payload.key);
      const favorites = exists
        ? state.favorites.filter(f => f.key !== action.payload.key)
        : [...state.favorites, action.payload];
      if (typeof window !== "undefined") {
        localStorage.setItem("sw-favs", JSON.stringify(favorites));
      }
      return { ...state, favorites };
    }
    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("sw-favs") || "[]")
        : [];
      dispatch({ type: "INIT_FAVORITES", payload: saved });
    } catch {
      dispatch({ type: "INIT_FAVORITES", payload: [] });
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal debe usarse dentro de GlobalProvider");
  return ctx;
};