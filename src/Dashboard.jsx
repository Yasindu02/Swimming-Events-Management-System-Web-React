import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/score" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline text-white">Admin Dashboard</span>
              </a>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item">
                  <Link to="/score" className="nav-link align-middle px-0 text-white">
                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Scoreboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/student" className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Manage Students</span>
                  </Link>
                </li>
                <li>
                  <Link to="/task" className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Manage Tasks</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className='header p-2 d-flex justify-content-center shadow '>
              <h4>Event Management System</h4>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
