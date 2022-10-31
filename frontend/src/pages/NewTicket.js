import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector(state => state.auth);
  const { isLoading } = useSelector(state => state.tickets);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmitBtn(e) {
    e.preventDefault();
    dispatch(createTicket({ product, description }))
      .unwrap()
      .then(() => {
        navigate('/tickets');
        toast.success('New ticket created!');
      })
      .catch(() => toast.error);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='content-section'>
      <section className='back-btn-section'>
        <BackButton url='/' />
      </section>

      <section>
        <h1 className='sub-heading'>Create New Ticket</h1>
        <p className='sub-paragraph'>Please fill out the form below</p>
      </section>
      <section className='create-new-ticket'>
        <div>
          <label>Customer Name :</label>
          <input
            type='text'
            value={name}
            disabled
            className='create-new-ticket-input'
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type='text'
            value={email}
            disabled
            className='create-new-ticket-input'
          />
        </div>
        <div>
          <form onSubmit={handleSubmitBtn}>
            <div>
              <label>Product :</label>
              <select
                name='product'
                id='product'
                value={product}
                onChange={e => setProduct(e.target.value)}
              >
                <option value='iPhone'>iPhone</option>
                <option value='iMac'>iMac</option>
                <option value='iPad'>iPad</option>
                <option value='Macbook Pro'>Macbook Pro</option>
              </select>
            </div>
            <div>
              <label>Description of the issue :</label>
              <textarea
                onChange={e => setDescription(e.target.value)}
                name='description'
                id='description'
                cols='30'
                rows='5'
                value={description}
                required
              ></textarea>
            </div>
            <div>
              <button className='primary-btn' style={{ 'margin-left': '1rem' }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewTicket;
