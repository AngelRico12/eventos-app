import React from 'react';

const EventCard = ({ evento, onEdit, onDelete, onToggleActive }) => {
  if (!evento) return null; // evita errores si es undefined

  return (
    <div className="event-card">
      <h2>{evento.title}</h2>
      <p><strong>Descripción:</strong> {evento.description}</p>
      <p><strong>Nombre del Evento:</strong> {evento.nombreEvento}</p>
      <p><strong>Lugar:</strong> {evento.lugar}</p>
      <p><strong>Tipo:</strong> {evento.tipo}</p>
      <p><strong>Estado:</strong> {evento.is_active ? 'Activo' : 'Inactivo'}</p>

      <div className="event-card-actions">
        <button onClick={() => onToggleActive(evento.id)}>
          {evento.is_active ? 'Desactivar' : 'Activar'}
        </button>
        <button onClick={() => onEdit(evento)}>Editar</button>
        <button onClick={() => onDelete(evento.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default EventCard;
