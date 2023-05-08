import React, { useState } from 'react';
import {Input, Button} from 'govuk-react';
import './AdminLoginPage.css';

function AdminLoginPage() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Admin ID: ${adminId}, Password: ${password}`);
  };

  return (
    <><h1>Admin Login</h1>
      <div className="AdminLoginPage-form">
      
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-id">Admin ID</label>
        <Input
          id="admin-id"
          label="Admin ID"
          value={adminId} 
          onChange={(Event) => setAdminId(Event.target.value)} 
          />
          <label htmlFor="admin-id">Password</label>
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(Event) => setPassword(Event.target.value)} 
            />
            <Button type="submit">Continue</Button>
            <Button type="reset">Back</Button>
          </form>
          </div>
          </>
  );
};

export default AdminLoginPage;

