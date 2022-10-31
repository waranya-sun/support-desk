import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    state => state.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
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
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='content-section'>
      <section>
        <h1 className='sub-heading'>
          <FaLock className='icon' />
          Login
        </h1>
        <p className='sub-paragraph'>Please login to get support</p>
      </section>
      <section className='form-section'>
        <form onSubmit={handleSubmitBtn}>
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
            <button className='primary-btn'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
