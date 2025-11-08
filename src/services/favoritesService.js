// src/services/favoritesService.js
const KEY = "sw-favs";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setFavorites(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export function hasFavorite(id) {
  return getFavorites().some((x) => x.id === id);
}

export function addFavorite(item) {
  const all = getFavorites();
  if (!all.some((x) => x.id === item.id)) {
    all.push(item);
    setFavorites(all);
  }
  return all;
}

export function removeFavorite(id) {
  const all = getFavorites().filter((x) => x.id !== id);
  setFavorites(all);
  return all;
}

export function clearFavorites() {
  setFavorites([]);
  return [];
}

export function toggleFavorite(item) {
  return hasFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item);
}