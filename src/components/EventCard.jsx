import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p><strong>Descripción:</strong> {event.description}</p>
      <p><strong>Nombre del Evento:</strong> {event.nombreEvento}</p>
      <p><strong>Lugar:</strong> {event.lugar}</p>
      <p><strong>Tipo:</strong> {event.tipo}</p>
      <p><strong>Estado:</strong> {event.is_active ? 'Activo' : 'Inactivo'}</p>
    </div>
  );
};

export default EventCard;
