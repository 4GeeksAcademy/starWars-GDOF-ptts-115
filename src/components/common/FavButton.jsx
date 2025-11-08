import { useGlobal } from "../../hooks/useGlobalReducer.jsx";

export const FavButton = ({ item, size = "sm" }) => {
  const { state, dispatch } = useGlobal();
  const key = `${item.category}:${item.id}`;
  const isFav = state.favorites.some(f => f.key === key);

  const toggle = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: {
        key,
        id: item.id,
        category: item.category,
        name: item.name || item.title || "",
        image: item.image || null
      }
    });
  };

  const cls = isFav
    ? `btn btn-${size} btn-warning`
    : `btn btn-${size} btn-outline-warning`;

  return (
    <button type="button" className={cls} onClick={toggle}>
      {isFav ? "★" : "☆"}
    </button>
  );
};