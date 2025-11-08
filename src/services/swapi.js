const API_BASE = "https://swapi.dev/api/";

const imageCategoryMap = {
  people: "characters",
  planets: "planets",
  starships: "starships",
  vehicles: "vehicles",
  species: "species",
  films: "films"
};

const extractId = url => {
  const match = url && url.match(/\/(\d+)\/?$/);
  return match ? match[1] : null;
};

const buildImageUrl = (category, id) => {
  const folder = imageCategoryMap[category];
  if (!folder || !id) return null;
  return `https://starwars-visualguide.com/assets/img/${folder}/${id}.jpg`;
};

export const fetchCategoryList = async (category, page = 1) => {
  const res = await fetch(`${API_BASE}${category}/?page=${page}`);
  if (!res.ok) throw new Error("No se pudo cargar la categoría");
  const data = await res.json();
  const items = data.results.map(item => {
    const id = extractId(item.url);
    return {
      ...item,
      id,
      category,
      image: buildImageUrl(category, id)
    };
  });
  return {
    items,
    total: data.count,
    nextPage: data.next ? page + 1 : null,
    prevPage: data.previous ? page - 1 : null
  };
};

export const fetchDetails = async (category, id) => {
  const res = await fetch(`${API_BASE}${category}/${id}/`);
  if (!res.ok) throw new Error("No se pudo cargar el detalle");
  const data = await res.json();
  return {
    ...data,
    id,
    category,
    image: buildImageUrl(category, id)
  };
};

export const searchAll = async term => {
  const categories = ["people", "planets", "starships", "vehicles", "species", "films"];
  const requests = categories.map(async category => {
    const res = await fetch(`${API_BASE}${category}/?search=${encodeURIComponent(term)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results.map(item => {
      const id = extractId(item.url);
      return {
        ...item,
        id,
        category,
        image: buildImageUrl(category, id)
      };
    });
  });
  const chunks = await Promise.all(requests);
  return chunks.flat();
};