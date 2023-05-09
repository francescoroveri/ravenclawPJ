import React, { useState } from 'react';
import { InputField, DateField, Button } from 'govuk-react';

function Patientreg() {
  const [formData, setFormData] = useState({ //initialize the data 
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

  const handleChange = (event) => { //define handleChange function
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => { //define the handlesubmit
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    formData.dob = `${formData.dob.day}${formData.dob.month}${formData.dob.year}`; //conatenate dat, month and year in form.data
    console.log(formData)
    fetch('http://localhost:8000/Server.php', requestOptions) 
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

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
            value={formData.fName} 
            onChange={handleChange} //passing the vale fName in the form.data
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
            value={formData.sName}
            onChange={handleChange} //passing the vale sName in the form.data
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
            value={formData.email}
            onChange={handleChange} //passing the vale email in the form.data
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
            value={formData.password}
            onChange={handleChange} //passing the vale password in the form.data
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
            value={formData.postcode}
            onChange={handleChange} //passing the vale postcode in the form.data
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
                    dob: { ...formData.dob, day: event.target.value }, //setting day for the form.data
                  }),
              },
              month: {
                autoComplete: 'bday-month',
                id: 'birthday-month',
                value: formData.dob.month,
                onChange: (event) =>
                  setFormData({
                    ...formData,
                    dob: { ...formData.dob, month: event.target.value }, //setting month for the form.data
                  }),
              },
              year: {
                autoComplete: 'bday-year',
                id: 'birthday-year',
                value: formData.dob.year,
                onChange: (event) =>
                  setFormData({
                    ...formData,
                    dob: { ...formData.dob, year: event.target.value },//setting year for the form.data
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
    }}
      value={formData.postcode}
      onChange={handleChange} //passing the vale gender in the form.data
    
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
export default Patientreg;

