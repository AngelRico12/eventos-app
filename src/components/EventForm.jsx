import React, { useState, useEffect } from 'react';

const EventForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nombreEvento: '',
    lugar: '',
    tipo: '',
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
      onSave(formData);
      if (!initialData) {
        // Solo limpia el formulario si es creación, no edición
        setFormData({
          title: '',
          description: '',
          nombreEvento: '',
          lugar: '',
          tipo: '',
          is_active: true,
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input 
        name="title" 
        placeholder="Título" 
        value={formData.title} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="description" 
        placeholder="Descripción" 
        value={formData.description} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="nombreEvento" 
        placeholder="Nombre del Evento" 
        value={formData.nombreEvento} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="lugar" 
        placeholder="Lugar" 
        value={formData.lugar} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="tipo" 
        placeholder="Tipo" 
        value={formData.tipo} 
        onChange={handleChange} 
        required 
      />
      <label>
        <input 
          type="checkbox" 
          name="is_active" 
          checked={formData.is_active} 
          onChange={handleChange} 
        />
        Activo
      </label>
      <div className="form-buttons">
        <button type="submit">
          {initialData ? 'Actualizar' : 'Crear'} Evento
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;