import React from 'react';
import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
  return (
    <>
      <div className='ticket-details'>
        <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
        <div>{ticket.product}</div>
        <div className={`status-${ticket.status}`}>
          {ticket.status[0].toUpperCase() + ticket.status.substring(1)}
        </div>
        <Link to={`/ticket/${ticket._id}`} className='view-btn'>
          View
        </Link>
      </div>
    </>
  );
}

export default TicketItem;
