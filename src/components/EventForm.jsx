import React, { useState } from 'react';

const EventForm = ({ onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nombreEvento: '',
    lugar: '',
    tipo: '',
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Error creando evento');

      setFormData({
        title: '',
        description: '',
        nombreEvento: '',
        lugar: '',
        tipo: '',
        is_active: true,
      });
      onEventCreated(); // refrescar lista
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
      <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
      <input name="nombreEvento" placeholder="Nombre del Evento" value={formData.nombreEvento} onChange={handleChange} required />
      <input name="lugar" placeholder="Lugar" value={formData.lugar} onChange={handleChange} required />
      <input name="tipo" placeholder="Tipo" value={formData.tipo} onChange={handleChange} required />
      <label>
        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
        Activo
      </label>
      <button type="submit">Crear Evento</button>
    </form>
  );
};

export default EventForm;
