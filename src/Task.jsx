import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../src/config';

function Task() {
  const [values, setValues] = useState({
    eventname: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_BASE_URL}/Tasks/CreateTask`, values) // Use backticks (`) here
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/score');
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="event" style={{ backgroundColor: "#7fffd4", minHeight: "100vh" }}>
      <div className='d-flex flex-column align-items-center pt-2'>
        <h2>Add Event</h2>
        <div className='text-danger'>
          {error && error}
        </div>
        <form className='row g-3 w-50 pt-2' onSubmit={handleSubmit}>
          <div className='mb-1'>
            <label htmlFor='eventname'><strong>Event Name</strong></label>
            <input
              type='eventname'
              name='eventname'
              autoComplete='off'
              onChange={e => setValues({ ...values, eventname: e.target.value })}
              placeholder='Enter Event Name'
              className='form-control rounded-0'
              required
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Task;
