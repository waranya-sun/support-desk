import React from 'react';
import { FaLock, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function handleLogoutBtn() {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <>
      <header>
        <div>
          <Link className='app-title' to='/'>
            Support Desk
          </Link>
        </div>
        <ul className='header-sub-menu'>
          {user ? (
            <li>
              <Link className='headerLink' onClick={handleLogoutBtn}>
                <FaSignOutAlt className='icon' />
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link className='headerLink' to='/login'>
                  <FaLock className='icon' />
                  Login
                </Link>
              </li>
              <li>
                <Link className='headerLink' to='/register'>
                  <FaUser className='icon' />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;
