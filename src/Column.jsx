
// Column.js

import React from 'react';
import Card from './Card';

function Column({ title, tickets }) {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>
      <div className="card-list">
        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default Column;
