// Campos a mostrar por categoría: [Etiqueta, claveEnSWAPI]
export const detailFields = (cat) => {
  switch (cat) {
    case "people":
      return [
        ["Género", "gender"],
        ["Año de nacimiento", "birth_year"],
        ["Altura (cm)", "height"],
        ["Masa (kg)", "mass"],
        ["Pelo", "hair_color"],
        ["Piel", "skin_color"],
        ["Ojos", "eye_color"],
      ];
    case "starships":
      return [
        ["Modelo", "model"],
        ["Fabricante", "manufacturer"],
        ["Costo (créditos)", "cost_in_credits"],
        ["Longitud", "length"],
        ["Tripulación", "crew"],
        ["Pasajeros", "passengers"],
        ["Hiperimpulsor", "hyperdrive_rating"],
        ["Clase", "starship_class"],
      ];
    case "vehicles":
      return [
        ["Modelo", "model"],
        ["Fabricante", "manufacturer"],
        ["Costo (créditos)", "cost_in_credits"],
        ["Longitud", "length"],
        ["Tripulación", "crew"],
        ["Pasajeros", "passengers"],
        ["Clase", "vehicle_class"],
      ];
    case "planets":
      return [
        ["Clima", "climate"],
        ["Terreno", "terrain"],
        ["Gravedad", "gravity"],
        ["Población", "population"],
        ["Diámetro", "diameter"],
        ["Rotación (h)", "rotation_period"],
        ["Órbita (d)", "orbital_period"],
        ["Agua superficial (%)", "surface_water"],
      ];
    case "species":
      return [
        ["Clasificación", "classification"],
        ["Designación", "designation"],
        ["Altura media", "average_height"],
        ["Colores de piel", "skin_colors"],
        ["Colores de pelo", "hair_colors"],
        ["Colores de ojos", "eye_colors"],
        ["Vida media", "average_lifespan"],
        ["Lengua", "language"],
      ];
    case "films":
      return [
        ["Episodio", "episode_id"],
        ["Director", "director"],
        ["Productor", "producer"],
        ["Estreno", "release_date"],
      ];
    default:
      return [];
  }
};