import { useEffect, useState } from "react";
import { fetchCategoryList } from "../services/swapi.js";
import { CategoryCarousel } from "../components/common/CategoryCarousel.jsx";

export const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [people, films, starships, planets] = await Promise.all([
          fetchCategoryList("people", 1),
          fetchCategoryList("films", 1),
          fetchCategoryList("starships", 1),
          fetchCategoryList("planets", 1)
        ]);

        setBlocks([
          {
            title: "Databank | Characters",
            category: "people",
            items: people.items.slice(0, 10)
          },
          {
            title: "Databank | Films",
            category: "films",
            items: films.items.slice(0, 10)
          },
          {
            title: "Databank | Starships",
            category: "starships",
            items: starships.items.slice(0, 10)
          },
          {
            title: "Databank | Planets",
            category: "planets",
            items: planets.items.slice(0, 10)
          }
        ]);
      } catch (err) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="sw-loading">Loading...</div>;
  if (error) return <div className="sw-loading sw-error">{error}</div>;

  return (
    <main className="sw-main">
      {blocks.map(block => (
        <CategoryCarousel
          key={block.category}
          title={block.title}
          category={block.category}
          items={block.items}
        />
      ))}
    </main>
  );
};