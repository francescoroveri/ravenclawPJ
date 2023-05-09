import React, { useState } from 'react';
import { TopNav, Input, Button } from 'govuk-react';
import './doctorlogin.css';

function DoctorLogin() {
  const navigate = useNavigate();
  const handelClick = (route) => {
    navigate(route);
  };
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Doctor ID: ${doctorId}, Password: ${password}`);
    // Make a POST request to the PHP script that handles the doctor's login authentication
    fetch('http://localhost:8000/DoctorLogin.php', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ doctorId: doctorId, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // If the login credentials are valid, redirect to the doctor dashboard page
      if (data.success) {
        window.location.href = ' /DoctorDashboard.php';
      } else {
        // Display error message to user
        console.log('Invalid credentials. Please try again.');
      }
  })
    .catch(error => console.error('Error:', error));
  };

  return (
    <>
      {/* <div className="top-bar"><TopNav /></div> */}
      <div className="doctor-login-form">
        <h1>Doctor Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="doctor-id">Doctor ID</label>
          <Input
            id="doctor-id"
            label="Doctor ID"
            value={doctorId}
            onChange={(event) => setDoctorId(event.target.value)} />
          <label htmlFor="doctor-id">Password</label>
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </>
  );
}

export default DoctorLogin;
