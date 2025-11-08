import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchCategoryList } from "../services/swapi.js";
import { ItemCard } from "../components/common/ItemCard.jsx";

export const CategoryPage = () => {
  const { category } = useParams();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || "1");
  const [state, setState] = useState({
    loading: true,
    error: "",
    items: [],
    nextPage: null,
    prevPage: null
  });

  useEffect(() => {
    const load = async () => {
      setState(s => ({ ...s, loading: true, error: "" }));
      try {
        const data = await fetchCategoryList(category, page);
        setState({
          loading: false,
          error: "",
          items: data.items,
          nextPage: data.nextPage,
          prevPage: data.prevPage
        });
      } catch (err) {
        setState({
          loading: false,
          error: err.message || "Error",
          items: [],
          nextPage: null,
          prevPage: null
        });
      }
    };
    load();
  }, [category, page]);

  const goPage = newPage => {
    setSp({ page: String(newPage) });
  };

  if (state.loading) return <div className="sw-loading">Loading...</div>;
  if (state.error) return <div className="sw-loading sw-error">{state.error}</div>;

  return (
    <div className="sw-category">
      <div className="sw-category-header">
        <h1>Databank | {category}</h1>
        <span>Total: {state.items.length}</span>
      </div>
      <div className="sw-category-grid">
        {state.items.map(item => (
          <ItemCard key={`${item.category}-${item.id}`} item={item} />
        ))}
      </div>
      <div className="sw-category-pagination">
        <button
          type="button"
          className="btn btn-outline-light"
          disabled={!state.prevPage}
          onClick={() => goPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          type="button"
          className="btn btn-outline-light"
          disabled={!state.nextPage}
          onClick={() => goPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};