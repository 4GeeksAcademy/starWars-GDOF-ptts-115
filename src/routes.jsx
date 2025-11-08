// src/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { CategoryPage } from "./pages/CategoryPage";
import { SearchResults } from "./pages/SearchResults";
import { ItemDetail } from "./pages/ItemDetail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Home />} />
      <Route path="category/:category" element={<CategoryPage />} />
      <Route path="category/:category/:id" element={<ItemDetail />} />
      <Route path="search" element={<SearchResults />} />
      <Route path="demo" element={<Demo />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="*" element={<h1>Not found!</h1>} />
    </Route>
  )
);