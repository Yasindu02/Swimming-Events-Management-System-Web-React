import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../src/config';

function Student() {
  const [values, setValues] = useState({
    name: '',
    birthday: '',
    age: '',
    gender: '',
    house: '',
    institute: 'Lyceum International School',
    address: '',
    phone: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    // Update the gender in the values object before sending to the server
    const dataToSend = {
      ...values,
      gender: selectedGender
    };

    axios.post(`${API_BASE_URL}/Students/CreateStudent`, dataToSend)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setSuccessMessage('Student added successfully!');
          setValues({
            name: '',
            birthday: '',
            age: '',
            gender: '',
            house: '',
            institute: 'Lyceum International School',
            address: '',
            phone: ''
          });
          setSelectedGender(''); // Reset gender after submission
          navigate('/score');
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="student" style={{ backgroundColor: "#7fffd4", minHeight: "100vh" }}>
      <div className='d-flex flex-column align-items-center pt-1'>
        <h2>Add Student</h2>

        <div className='text-danger'>
          {error && error}
        </div>

        <div className='text-success'>
          {successMessage && successMessage}
        </div>

        <form className='row g-2 w-50' onSubmit={handleSubmit}>
          <div className='mb-1'>
            <label htmlFor='name'><strong>User Name</strong></label>
            <input
              type='text'
              name='name'
              autoComplete='off'
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder='Enter Name'
              className='form-control rounded-0'
              required
            />
          </div>

          <div className='mb-1'>
            <label htmlFor='birthday'><strong>Birthday</strong></label>
            <input
              type='date'
              name='birthday'
              value={values.birthday}
              onChange={(e) => setValues({ ...values, birthday: e.target.value })}
              placeholder='Enter Birthday'
              className='form-control rounded-0'
              autoComplete='off'
              required
            />
          </div>

          <div className='mb-1'>
            <label htmlFor='age'><strong>Age</strong></label>
            <input
              type='number'
              name='age'
              value={values.age}
              onChange={(e) => setValues({ ...values, age: e.target.value })}
              placeholder='Enter Age'
              className='form-control rounded-0'
              autoComplete='off'
              required
            />
          </div>

          <div className='mb-1'>
            <label htmlFor='gender'><strong>Gender</strong></label>
            <select
              name='gender'
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className='form-control rounded-0'
              required
            >
              <option value='' disabled>
                Choose Gender
              </option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>

          <div className='mb-1'>
            <label htmlFor='house'><strong>House</strong></label>
            <input
              type='text'
              name='house'
              value={values.house}
              onChange={(e) => setValues({ ...values, house: e.target.value })}
              placeholder='Enter House'
              className='form-control rounded-0'
              autoComplete='off'
              required
            />
          </div>

          <div className='mb-1'>
            <label htmlFor='institute'><strong>Institute</strong></label>
            <input
              type='text'
              name='institute'
              value={values.institute}
              onChange={(e) => setValues({ ...values, institute: e.target.value })}
              placeholder='Enter Institute'
              className='form-control rounded-0'
              autoComplete='off'
              required
            />
          </div>

          <div className='mb-1'>
            <label htmlFor='address'><strong>Class</strong></label>
            <input
              type='text'
              name='address'
              value={values.address}
              onChange={(e) => setValues({ ...values, address: e.target.value })}
              placeholder='Enter Class'
              className='form-control rounded-0'
              autoComplete='off'
              required
            />
          </div>

          <div className='mb-1'>
            <label htmlFor='phone'><strong>Phone Number</strong></label>
            <input
              type='text'
              name='phone'
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              placeholder='Enter Phone Number'
              className='form-control rounded-0'
              autoComplete='off'
            />
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Student;
