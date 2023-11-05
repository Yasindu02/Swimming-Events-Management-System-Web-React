import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import { API_BASE_URL } from '../src/config'; 

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');
  const [taskOptions, setTaskOptions] = useState([]); 
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [showTimingData, setShowTimingData] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');

  const handleChange = (e) => {
    setSelectedAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleHouseChange = (e) => {
    setSelectedHouse(e.target.value);
  };


 /*
  useEffect(() => {
    axios
      .get('http://localhost:8081/student?age=' + selectedAge)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setUsers(res.data.Result);
        } else {
          
        }
      })
      .catch((err) => console.log(err));
  }, [selectedAge]);
  */

/*
useEffect(() => {
  axios
    .get('http://localhost:8081/student', {
      params: {
        age: selectedAge,
        gender: selectedGender,
        house: selectedHouse
      }
    })
    .then((res) => {
      if (res.data.Status === 'Success') {
        setUsers(res.data.Result);
      } else {
        
      }
    })
    .catch((err) => console.log(err));
}, [selectedAge, selectedGender, selectedHouse]);
*/

useEffect(() => {
  axios
    .get(`${API_BASE_URL}/Students/GetStudents`, {
      params: {
        age: selectedAge,
        gender: selectedGender,
        house: selectedHouse
      }
    })
    .then((res) => {
      if (res.data.Status === 'Success') {
        // Filter the data based on the selected age group
        let filteredData = res.data.Result;
        if (selectedAge === '20') {
          filteredData = filteredData.filter(item => item.age > 16);
        } else if (selectedAge === '16') {
          filteredData = filteredData.filter(item => item.age >= 14 && item.age <= 16 );
        } else if (selectedAge === '14') {
          filteredData = filteredData.filter(item => item.age >= 12 && item.age <= 14);
        } else if (selectedAge === '12') {
          filteredData = filteredData.filter(item => item.age >= 10 && item.age <= 12);
        } else if (selectedAge === '10') {
          filteredData = filteredData.filter(item => item.age >= 8 && item.age <= 10);
        } else if (selectedAge === '08') {
          filteredData = filteredData.filter(item => item.age <= 8);
        }

        setUsers(filteredData);
      } else {
        // Handle error
      }
    })
    .catch((err) => console.log(err));
}, [selectedAge, selectedGender, selectedHouse]);



  const [modifiedTimings, setModifiedTimings] = useState({});

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Tasks/GetTasks`)
      .then((res) => {
        
        //if (res.status === 'Success') {
          setTaskOptions(res.data);
        //} else {
        //  alert('Error');
        //}
      })
      .catch((err) => console.log(err));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const saveAllData = () => {
    const updatedUsersData = users.map((user) => ({
      studentid: user.id,
      date: selectedDate,
      eventname: selectedEvent,
      name: user.name,
      age: user.age,
      gender: user.gender,
      house: user.house,
      birthday: user.birthday,
      classes: user.address,
      timing: user.timing
    }));

    axios.post(`${API_BASE_URL}/SaveAllToData/SaveAllToData`, updatedUsersData)
      .then((res) => {
        console.log(res.data);
        alert('Data saved to MySQL table.');
      })
      .catch((error) => console.log(error));
  };

  const handleTimingChange = (index, newValue) => {
    const updatedUsers = [...users]; 
    updatedUsers[index].timing = newValue; 
    setUsers(updatedUsers); 
  };
  
  const showAllData = () => {
    axios.get(`${API_BASE_URL}/SavedData/GetSavedData`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          const filteredData = res.data.Result.filter(
            (item) => new Date(item.date).toLocaleDateString() === selectedDate.toLocaleDateString()
          );
          setUsers(filteredData);
          setShowTimingData(true);
        } else {
          
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home" style={{ backgroundColor: '#7fffd4', minHeight: '1000vh' }}>
       <div className="d-flex flex-column align-items-center "></div>

        <div className="dropdown-container ">
        <div className="d-flex flex-column align-items-center pt-2">
            <div className="px-0 py-0">
          <select className="custom-dropdown"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}>
            <option value="" disabled selected>
              Choose Event
            </option>
            {taskOptions.map((tasks, index) => (
              <option key={index} value={tasks.eventname}>
                {tasks.eventname}
              </option>
            ))}
          </select>
          </div>
          </div>

          

            <div className="d-flex flex-column align-items-center pt-1">
            <div className="px-0 py-0">    
            <select className="custom-dropdown" value={selectedAge} onChange={handleChange}>
              <option value="" disabled>
                Choose Age Group
              </option>
              <option value="20">Over 16</option>
              <option value="16">Under 16</option>
              <option value="14">Under 14</option>
              <option value="12">Under 12</option>
              <option value="10">Under 10</option>
              <option value="08">Under 08</option>
            </select>
              </div>
              </div>

            

          <div className="d-flex flex-column align-items-center pt-1">
            <div className="px-0 py-0">
            <select className="custom-dropdown" value={selectedGender} onChange={handleGenderChange}>
              <option value="" disabled>
                Choose Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            </div>
            </div>
           

            <div className="d-flex flex-column align-items-center pt-1">
            <div className="px-0 py-0">
            <select className="custom-dropdown" value={selectedHouse} onChange={handleHouseChange}>
              <option value="" disabled>
                Choose House
              </option>
              <option value="Cygnus">Cygnus</option>
              <option value="Ursa">Ursa</option>
              <option value="Aquila">Aquila</option>
              <option value="Cetus">Cetus</option>
            </select>
            </div>
            </div>

            <div className="d-flex flex-column align-items-center ">
            <div className="px-0 py-0">
              <div className="mt-2">
                <table className="table" onSubmit={handleSubmit}>
                  <thead>
                    <tr>    
                      <th className="wide-column no-wrap">Event Name</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>House</th>
                      <th className="wide-column no-wrap">Birth Year</th>
                      <th>Class</th>
                      <th>Timing</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((student, index) => (
                      <tr key={index}>
                        <td style={{ display: 'none' }}>{new Date(student.date).toLocaleDateString('en-GB')}</td>
                        <td style={{ display: 'none' }}>{student.id}</td>
                        <td className="wide-column no-wrap">{selectedEvent}</td>
                        <td className="wide-column no-wrap">{student.name}</td>
                        <td className="wide-column no-wrap">{student.age}</td>
                        <td className="wide-column no-wrap">{student.gender}</td>
                        <td className="wide-column no-wrap">{student.house}</td>
                        <td className="wide-column no-wrap">{new Date(student.birthday).getFullYear()}</td>
                        <td className="wide-column no-wrap">{student.address}</td>
                        <td className="wide-column no-wrap">
                          <input
                            type="number"
                            value={student.timing}
                            onChange={(e) => handleTimingChange(index, e.target.value)}
                            placeholder=""
                            className="form-control rounded-0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               
             
                
              <div className="d-grid gap-3 col-4 mx-auto"> 
                <div className="btn-group">
                  <Link to="/saveAllToData" onClick={saveAllData} className="btn btn-primary me-4 rounded btn-lg" type="submit">
                    Save
                  </Link>

                  <Link to="/getSavedData" className="btn btn-primary me-4 rounded btn-lg" type="button">
                    Show
                  </Link>
                </div>
              </div>
              </div>
              


            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
