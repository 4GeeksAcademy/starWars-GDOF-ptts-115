import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home.jsx";
import { CategoryPage } from "./CategoryPage.jsx";
import { SearchResults } from "./SearchResults.jsx";
import { Single } from "./Single.jsx";
import { Navbar } from "../components/navbar/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { GlobalProvider } from "../hooks/useGlobalReducer.jsx";

const Layout = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/:category/:id" element={<Single />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default Layout;