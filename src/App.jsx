import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events'; // Asegúrate que sea "Events", no "Courses"

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <a href="/">Inicio</a>
          <a href="/events">Eventos</a>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
