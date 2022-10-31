import React from 'react';
import { useSelector } from 'react-redux';

function NoteItem({ note }) {
  const { user } = useSelector(state => state.auth);
  return (
    <>
      <div className='note-item'>
        <h4>
          Note from{' '}
          {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
        </h4>
        <p>{note.text}</p>
        <h5>{new Date(note.createdAt).toLocaleString('en-US')}</h5>
      </div>
    </>
  );
}

export default NoteItem;
