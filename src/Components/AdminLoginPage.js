//Armela Cupi w1936404


import React, { useState } from 'react';
import {Input, Button} from 'govuk-react';
import './AdminLoginPage.css';

function AdminLoginPage() {

  // Define state variables for adminId and password using useState hook

  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Admin ID: ${adminId}, Password: ${password}`);
  };

  // Render the component
  return (
    <><h1>Admin Login</h1>
      <div className="AdminLoginPage-form">
      {/* Create a form and attach the handleSubmit function to the onSubmit event */}
        <form onSubmit={handleSubmit}>
          {/* Label and input for adminId */}
          <label htmlFor="admin-id">Admin ID</label>
        <Input
          id="admin-id"
          label="Admin ID"
          value={adminId} 
          onChange={(Event) => setAdminId(Event.target.value)} 
          />
          {/* Label and input for password */}
          <label htmlFor="admin-id">Password</label>
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(Event) => setPassword(Event.target.value)} 
            />
            {/* Submit button */}
            <Button type="submit">Continue</Button>
            {/* Reset button */}
            <Button type="reset">Back</Button>
          </form>
          </div>
          </>
  );
};

export default AdminLoginPage;

