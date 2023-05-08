import React, { useState } from 'react';
import {InputField, Button} from 'govuk-react';

function DeReg(){

    const [password, setPassword] = useState('');
    

    const handleDeletion = () => {
      const data = { password };
  
      fetch('http://localhost:8000/Server.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Handle the response accordingly
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    return(
    <>
      <h1>Deregister</h1>
      <div className="container">
        <div className="Password">
          <InputField
            hint="Insert your password"
            input={{
              id: 'Password',
              name: 'Password',
              type: 'password',
              label: 'Password',
            }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            >
            Insert Password
        </InputField>
        <InputField
        input={{
          id: 'repPassword',
          name: 'repPassword',
          type: 'password',
          label: 'Reinsert Password',
        }}
      >
        Reinsert Password
      </InputField>

      <div className="Confirm">
        <Button onClick={handleDeletion}>Confirm</Button>
      </div>
        </div>
    </div>
    </>
    )
}
export default DeReg;