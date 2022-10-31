import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='content-section'>
      <section>
        <h1 className='sub-heading'>What do you need help with?</h1>
        <p className='sub-paragraph'>Please choose from an option below</p>
      </section>
      <section className='btn-section'>
        <Link to='/new-ticket'>Create New Ticket</Link>
        <Link to='/tickets'>View My Tickets</Link>
      </section>
    </div>
  );
}

export default Home;
