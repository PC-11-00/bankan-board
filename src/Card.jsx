// Card.js

import React from 'react';

function Card({ ticket }) {
  return (
    <div className="kanban-card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      {/* Add other ticket information */}
    </div>
  );
}

export default Card;
