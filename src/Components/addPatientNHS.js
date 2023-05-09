import { useState } from 'react';
import axios from 'axios';
//import './style.css';
import './gov.francesco.css';
import { H2, Input, Label } from 'govuk-react';
import crown from 'govuk-frontend/govuk/assets/images/govuk-logotype-crown.png';

//Author: w1810699

function addPatientNHS() {
  const [NHSnumber, setNHSnumber] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (NHSnumber.length === 0) {
      setErrorMessage('Please enter your NHS number.');
    } else if (Email.length === 0) {
      setErrorMessage('Please enter your email address.');
    } else if (password.length === 0) {
      setErrorMessage('Please enter your password.');
    } else {
      const url = 'http://localhost:4000/addPatient.php/';
      const formData = new FormData();
      formData.append('NHSnumber', NHSnumber);
      formData.append('Email', Email);
      formData.append('password', password);
      axios
        .post(url, formData)
        .then((response) => {
          // Handle success
          console.log(response);
          alert('Form submitted successfully.');
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          setErrorMessage('An error occurred. Please try again later.');
        });
    }
  };
  return (
<>
    <div class="navbar">
    <div className="govuk-header" role="banner" data-testid="header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <a href="/" className="govuk-header__link govuk-header__link--homepage">
            <img src={crown} alt="GOV.UK" className="govuk-header__logotype-crown" />
          </a>
          <div className ="GOVUKtext">GOV.UK</div>
        </div>
      </div>
      </div>
    </div>
    <div className="container">
 <H2>Register via NHS Number</H2>
 <Label htmlFor="NHSnumber">NHS Number</Label>
 <Input type="text" name="NHSnumber" id="NHSnumber" onChange={(e) => setNHSnumber(e.target.value)}/> 
 <Label htmlFor="Email">Email</Label>
 <Input type="Email" name="Email" id="Email" onChange={(e) => setEmail(e.target.value)}/>
 <Label htmlFor="password">password</Label>
 <Input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/> 
 <Input type="button" name="" id="Register" value="Register" onClick={handleSubmit}/>
    </div>
    </>
  );
}

export default addPatientNHS;
