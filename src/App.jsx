// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header.jsx';

// // Simple placeholder pages
// const PropertySearch = () => <h2>Property Search Page</h2>;
// const PropertyList = () => <h2>Property List Page</h2>;

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<PropertySearch />} />
//         <Route path="/property-list" element={<PropertyList />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import PropertyDetail from "./components/PropertyDetail.jsx";
import "./index.css"
import SearchForm from "./components/SearchForm";
import PropertyListPage from "./components/PropertyListPage.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

const App = () => {
  // State to manage favorites, initialized with saved data from localStorage if available
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  return (
    // DndProvider enables drag-and-drop functionality across the app
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={
              <SearchPage favorites={favorites} setFavorites={setFavorites} />
            }
          />
          {/* Property list page route with favorites and setFavorites props */}
          <Route
            path="/property-list"
            element={
              <PropertyListPage
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          {/* Property detail page route, passing property ID via the URL */}
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>

        <Footer />
      </Router>
    </DndProvider>
  );
}

export default App;
