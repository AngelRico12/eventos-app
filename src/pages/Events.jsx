import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import './Eventos.css';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [eventoEditando, setEventoEditando] = useState(null);

  const fetchEventos = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://localhost:3000/api/eventos');
      const data = await res.json();
      setEventos(data);
    } catch (err) {
      setError('Error al cargar los eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleDelete = async (id) => {
    alert("Funcionalidad de eliminar aún no implementada");
  };

  const handleEdit = (evento) => {
    setEventoEditando(evento);
  };

  const handleToggleActive = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/evento/${id}/toggle`, {
        method: 'PATCH'
      });
      const data = await res.json();
      setEventos(eventos.map(ev => ev.id === id ? { ...ev, is_active: data.is_active } : ev));
    } catch (err) {
      alert('Error al cambiar estado del evento');
    }
  };

  const handleUpdate = async (formData) => {
    if (!eventoEditando) return;

    try {
      const res = await fetch(`http://localhost:3000/api/evento/${eventoEditando.id}`, {
        method: 'PUT', // Usa PATCH si tu backend soporta actualizaciones parciales
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Error al actualizar el evento');
      const updated = await res.json();

      setEventos(eventos.map(ev => ev.id === updated.id ? updated : ev));
      setEventoEditando(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="eventos-page">
      <div className="eventos-header">
        <h1>Eventos</h1>
        <button onClick={fetchEventos}>Actualizar</button>
      </div>

      <div className="eventos-main">
        <div className="eventos-form">
          <h2>{eventoEditando ? 'Editar Evento' : 'Crear Nuevo Evento'}</h2>
          <EventForm
            onEventCreated={fetchEventos}
            onEventUpdated={handleUpdate}
            initialValues={eventoEditando}
            onCancel={() => setEventoEditando(null)}
          />
        </div>

        <div className="eventos-list">
          {loading ? (
            <div className="eventos-loading">Cargando eventos...</div>
          ) : error ? (
            <div className="eventos-error">
              <strong>Error:</strong> {error}
              <button onClick={fetchEventos}>Reintentar</button>
            </div>
          ) : eventos.length === 0 ? (
            <div className="eventos-empty">
              <div>📅</div>
              <h3>No hay eventos disponibles</h3>
              <p>Crea tu primer evento usando el formulario de la izquierda</p>
            </div>
          ) : (
            eventos.map(evento => (
              <EventCard
                key={evento.id}
                evento={evento}
                onDelete={handleDelete}
                onEdit={() => handleEdit(evento)}
                onToggleActive={handleToggleActive}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Eventos;
