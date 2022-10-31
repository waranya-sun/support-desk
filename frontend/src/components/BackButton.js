import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BackButton({ url }) {
  return (
    <Link to={url} className='back-btn'>
      <FaChevronLeft className='icon' style={{ marginBottom: '-2px' }} />
      <span>Back</span>
    </Link>
  );
}

export default BackButton;
