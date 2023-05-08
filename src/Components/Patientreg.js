import React, { useState } from 'react';  
import { InputField, DateField, Button } from 'govuk-react';

function Patientreg() {  // Defining a functional component named 'Patientreg'.
  //initialize the data
  const [formData, setFormData] = useState({  
    fName: '',  
    sName: '',  
    email: '',  
    password: '',  
    postcode: '',  
    dob: {  
      day: '',  
      month: '',  
      year: '',  
    },
    gender: '',
  });
  //define the handleChange function
  const handleChange = (event) => {  
    const { name, value } = event.target;  
    setFormData({ ...formData, [name]: value }); 
  };

  //define the handelSubmit function
  const handleSubmit = async (event) => {  
    event.preventDefault();  
    const requestOptions = {  
      method: 'POST',  //use the post mothod for writing in the databasex
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify(formData), 
    };

    formData.dob = `${formData.dob.day}${formData.dob.month}${formData.dob.year}`;  // Concatenating the 'day', 'month', and 'year' properties of 'dob' object into a string and updating the 'dob' property of 'formData'.
    console.log(formData);  
    fetch('http://localhost:8000/Server.php', requestOptions)  
      .then((response) => response.json())  
      .then((data) => console.log(data))  
      .catch((error) => console.log(error)); 

  return (
    <>
      <h1>Register With Personal Detail</h1>

      <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="fName">
          <InputField
            input={{
              id: 'fName',
              name: 'fName',
              type: 'text',
              label: 'fName',
            }}
            value={formData.fName} // Set the value of the input field to the 'fName' property of 'formData'
            onChange={handleChange}  // Set the 'onChange' event handler to 'handleChange'
          >
            First Name
          </InputField>
        </div>

        <div className="sName">
          <InputField
            input={{
              id: 'sName',
              name: 'sName',
              type: 'text',
              label: 'sName',
            }}
            value={formData.sName}// Set the value of the input field to the 'sName' property of 'formData'
            onChange={handleChange}  // Set the 'onChange' event handler to 'handleChange'
          >
            Surname
          </InputField>
        </div>

        <div className="email">
          <InputField
            hint="e.g. name@email.com"
            input={{
              autoComplete: 'email',
              name: 'email',
              type: 'email',
              label: 'email',
            }}
            value={formData.email}// Set the value of the input field to the 'email' property of 'formData'
            onChange={handleChange}  // Set the 'onChange' event handler to 'handleChange'
          >
            Email address
          </InputField>
        </div>

        <div className="password">
          <InputField
            hint="Create a strong password"
            input={{
              id: 'password',
              name: 'password',
              type: 'password',
              label: 'password',
            }}
            value={formData.password}// Set the value of the input field to the 'password' property of 'formData'
            onChange={handleChange}  // Set the 'onChange' event handler to 'handleChange'
          >
            Password
          </InputField>
        </div>

        <div className="postcode">
          <InputField
            input={{
              id: 'postcode',
              name: 'postcode',
              type: 'text',
              label: 'postcode',
            }}
            value={formData.postcode}// Set the value of the input field to the 'postcode' property of 'formData'
            onChange={handleChange}  // Set the 'onChange' event handler to 'handleChange'
          >
            Postcode
          </InputField>
        </div>

        <div className="dob">
          <DateField
            inputs={{
              day: {
                autoComplete: 'bday-day',
                id: 'birthday-day',
                value: formData.dob.day,
                onChange: (event) =>
                  setFormData({
                    ...formData,
                    dob: { ...formData.dob, day: event.target.value }, // Set the 'onChange' event handler to update the 'day' property of 'dob' in 'formData' when the value changes
                  }),
              },
              month: {
                autoComplete: 'bday-month',
                id: 'birthday-month',
                value: formData.dob.month,
                onChange: (event) =>
                  setFormData({
                    ...formData,
                    dob: { ...formData.dob, month: event.target.value }, // Set the 'onChange' event handler to update the 'month' property of 'dob' in 'formData' when the value changes
                  }),
              },
              year: {
                autoComplete: 'bday-year',
                id: 'birthday-year',
                value: formData.dob.year,
                onChange: (event) =>
                  setFormData({
                    ...formData,
                    dob: { ...formData.dob, year: event.target.value }, // Set the 'onChange' event handler to update the 'year' property of 'dob' in 'formData' when the value changes
                  }),
              },
            }}
          >
            Date of Birth?
          </DateField>
        </div>

<div className="gender">
  <InputField
    hint="Insert 1 for male or 2 for female"
    input={{
      id: 'gender',
      name: 'gender',
      type: 'text',
      label: 'Gender',
      value: formData.gender,
      onChange: handleChange,
    }}
  >
    Gender
  </InputField>
</div>

<Button type="submit">Submit</Button>

</div>
</form>
</>
);
}
}

export default Patientreg;

