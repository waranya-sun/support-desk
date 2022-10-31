import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // This useSelector has the state passsed-in
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  function handleChangeElements(e) {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmitBtn(e) {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='content-section'>
      <section className=''>
        <h1 className='sub-heading'>
          <FaUser className='icon' /> Register
        </h1>
        <p className='sub-paragraph'>Please create an account</p>
      </section>
      <section>
        <form onSubmit={handleSubmitBtn}>
          <div>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={handleChangeElements}
              placeholder='Enter your name'
              required
            />
          </div>
          <div>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleChangeElements}
              placeholder='Enter your email'
              required
            />
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleChangeElements}
              placeholder='Enter password'
              required
            />
          </div>
          <div>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              onChange={handleChangeElements}
              placeholder='Confirm password'
              required
            />
          </div>
          <div>
            <button className='primary-btn'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
