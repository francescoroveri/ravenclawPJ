

// export default Login;
import './Asma.css';
import React, { useState } from 'react';
import {
 InputField,
 Label,
 Button,
 InsetText,
 HintText,
 LabelText,
} from 'govuk-react';
import {useNavigate} from"react-router-dom"




//AUTHOR
//ASMA KAHSAY


// STUDENT ID:
// W17840066


function Login() {
 const navigate = useNavigate()
 const [nhsNumber, setNhsNumber] = useState('');
 const [password, setPassword] = useState('');


 const handleNhsNumberChange = (event) => {
   setNhsNumber(event.target.value);
 };


 const handlePasswordChange = (event) => {
   setPassword(event.target.value);
 };


 const handleSubmit = (event) => {
   event.preventDefault();


   if (nhsNumber === '' || password === '') {
     alert('Please enter your NHS number and password.');
   } else {
     handleLogin();
   }
 };
 const [error, setError] = useState('');


// Define a function to update the state with an error message
const handleError = (message) => {
 setError(message);
};




 const handleLogin = () => {
   // Check if the user has entered their NHS number and password
   if (nhsNumber === '' || password === '') {
     setError('Please enter your NHS number and password');
     return;
   }
  
 
   // Call the PHP function to validate the user's input
   fetch('http://localhost:8000/patientLogin.php', {
     method: 'POST',
     body: JSON.stringify({ nhsNumber, password }),
   })
     .then((response) => response.json())
     .then((data) => {
       // Handle the response from the server
       if(data){
         localStorage.setItem('nhsNumber', nhsNumber);
         navigate("/Patient_pa")
       }
     })
     .catch((error) => {
       console.log(error)
       setError('An error occurred while logging in');
     });
 };


 return (
   <form onSubmit={handleSubmit}>
     <div>
       <Label htmlFor="nhsNumber">
         <LabelText>NHS Number</LabelText>
       </Label>
       <InputField id="nhsNumber" name="nhsNumber" type="text" value={nhsNumber} onChange={handleNhsNumberChange} />
     </div>
     <div>
       <Label htmlFor="password">
         <LabelText>Password</LabelText>
       </Label>
       <InputField id="password" name="password" type="password" value={password} onChange={handlePasswordChange} />
     </div>
     <div>
       <Button className= "bcontrol">Login</Button>
     </div>
     <div>
       <HintText>Don't have an NHS number?</HintText>
       <Button as="a" href="#">
         Register with NHS number
       </Button>
       <HintText>Prefer to register with personal details?</HintText>
       <Button as="a" href="#">
         Register with personal details
       </Button>
     </div>
   </form>
 );
}








export default Login;






