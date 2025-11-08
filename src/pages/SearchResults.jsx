import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchAll } from "../services/swapi.js";
import { ItemCard } from "../components/common/ItemCard.jsx";

export const SearchResults = () => {
  const [sp] = useSearchParams();
  const q = sp.get("q") || "";
  const [state, setState] = useState({ loading: true, error: "", items: [] });

  useEffect(() => {
    if (!q) {
      setState({ loading: false, error: "", items: [] });
      return;
    }
    const load = async () => {
      setState({ loading: true, error: "", items: [] });
      try {
        const items = await searchAll(q);
        setState({ loading: false, error: "", items });
      } catch (err) {
        setState({ loading: false, error: err.message || "Error", items: [] });
      }
    };
    load();
  }, [q]);

  if (!q) return <div className="sw-loading">Type to search.</div>;
  if (state.loading) return <div className="sw-loading">Searching...</div>;
  if (state.error) return <div className="sw-loading sw-error">{state.error}</div>;

  return (
    <div className="sw-category">
      <div className="sw-category-header">
        <h1>Results for "{q}"</h1>
        <span>{state.items.length} results</span>
      </div>
      <div className="sw-category-grid">
        {state.items.map(item => (
          <ItemCard key={`${item.category}-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  );
};