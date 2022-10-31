import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote } from '../features/notes/noteSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';

Modal.setAppElement('#root');

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isError, message } = useSelector(
    state => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    state => state.notes
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const customStyles = {
    content: {
      width: '500px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, dispatch, ticketId]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  // Close ticket
  function handleCloseTicketBtn() {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  }

  // Open/Close modal
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  // Create note submit
  function handleNoteSubmitBtn(e) {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  }

  return (
    <div className='ticket-page'>
      <section className='back-btn-section'>
        <BackButton url='/tickets' />
      </section>
      {/* It is _id because it is how is formatted in MongoDB */}
      <div className='ticket-id'>
        <h2>Ticket ID: ${ticket._id}</h2>
        <h2 className={`status-${ticket.status} right`}>{ticket.status}</h2>
      </div>
      <h3>
        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
      </h3>
      <h3>Product: {ticket.product}</h3>
      <div className='discription-issue'>
        <h3>Description of issue</h3>
        <p>{ticket.description}</p>
      </div>

      <h2>Notes</h2>
      {ticket.state !== 'closed' && (
        <button onClick={openModal} className='add-note-btn'>
          <FaPlus className='icon' />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Add Note'
        style={customStyles}
      >
        <div className='modal-header'>
          <h2>Add Note</h2>
          <button onClick={closeModal} className='close-btn'>
            X
          </button>
        </div>

        <form onSubmit={handleNoteSubmitBtn}>
          <textarea
            className='modal-textarea'
            name='noteText'
            id='noteText'
            placeholder='Note text'
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
          ></textarea>
          <button type='submit' className='modal-submit'>
            Submit
          </button>
        </form>
      </Modal>
      {notes.map(note => {
        return <NoteItem key={note._id} note={note} />;
      })}
      <div>
        {ticket.status !== 'closed' && (
          <button className='close-ticket-btn' onClick={handleCloseTicketBtn}>
            Close Ticket
          </button>
        )}
      </div>
    </div>
  );
}

export default Ticket;
