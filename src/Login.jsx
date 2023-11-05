import { useState } from 'react';
import './style.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../src/config';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const [error, setError] = useState(' ')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_BASE_URL}/Login/Login`, values)
        .then(res => {
          if(res.data.Status === 'Success') {
            navigate('/score');
        } else {
          setError(res.data.Error);
        }
    })
        .catch(err => console.log(err));
    }
     
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className=' p-3 rounded w-25 border loginForm '>
              <div className='text-danger'>
                {error && error}
              </div>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' name='email' 
                    onChange={e => setValues({...values, email: e.target.value })}
                    placeholder='Enter Email' className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' name='password'
                    onChange={e => setValues({...values, password: e.target.value })}
                    placeholder='Enter Password' className='form-control rounded-0'   />
                </div>

                <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='rememberMe'
            />
            <label className='form-check-label' htmlFor='rememberMe'>
              Remember Me
            </label>
          </div>

                <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
              </form>
            </div>
        </div>
  )
}

export default Login
