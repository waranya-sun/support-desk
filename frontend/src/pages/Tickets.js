import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const { tickets } = useSelector(state => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (!tickets) {
    return <Spinner />;
  }

  return (
    <div className='content-section'>
      <section className='back-btn-section'>
        <BackButton url='/' />
      </section>

      <section>
        <h1 className='sub-heading'>Tickets</h1>
      </section>

      <div className='ticket-heading-table'>
        <div>Date</div>
        <div>Product</div>
        <div>Status</div>
        <div></div>
      </div>
      {tickets.map(ticket => {
        return <TicketItem key={ticket._id} ticket={ticket} />;
      })}
    </div>
  );
}

export default Tickets;
