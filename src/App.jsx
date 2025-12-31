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

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';   // <-- Import Footer

// Simple placeholder pages
const PropertySearch = () => <h2>Property Search Page</h2>;
const PropertyList = () => <h2>Property List Page</h2>;

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<PropertySearch />} />
        <Route path="/property-list" element={<PropertyList />} />
      </Routes>

      <Footer />   {/* <-- Add Footer here */}
    </Router>
  );
}

export default App;
