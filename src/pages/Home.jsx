import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Bienvenido a la Plataforma de Cursos</h1>
        <p>Explora, administra y crea eventos fácilmente.</p>
        <Link to="/courses" className="btn-primary">
          Ver Cursos
        </Link>
      </div>
    </div>
  );
};

export default Home;
