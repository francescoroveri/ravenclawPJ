import {Table} from '@govuk-react/table';
import {InsetText} from '@govuk-react/inset-text';
import InputField from '@govuk-react/input-field';
import {Label} from '@govuk-react/label';
import {Button} from'govuk-react'
import { useState } from 'react';
import { useEffect } from 'react';
import './Asma.css';
//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066


// function named Patient_gprecord
function Patient_gprecord() {
  // Retrieve the NHS number from local storage
  const nhsNumber = localStorage.getItem('nhsNumber');
  // Define state variables using the useState hook
  const [edit, setEdit] = useState(false);
  const [testData, setTestData] = useState({});
  const [editData, setEditData] = useState({});
  const [savingChanges, setSavingChanges] = useState(false);

  //A function to go back in the browser history
  function goBack() {
    window.history.back();
  }
  // A function to handle logging out
  // Remove the NHS number from local storage
  function handleLogout() {
    localStorage.removeItem('nhsNumber');
    // Redirect to the Patient_login page
    window.location.href = 'http://localhost:3000/Patient_login';
  }


 //an asynchronous function to retrieve the patient's data
  async function getPatientData() {
    try {
      // Send a GET request to the PHP script that retrieves the patient's data
      const response = await fetch(
        `http://localhost:8000/getPatientRecord.php?NHSNumber=${nhsNumber}`
      );
      // Parse the response as JSON
      const data = await response.json();
      // Update the state variables with the retrieved data
      setTestData(data);
      setEditData(data);
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  }
// Call the getPatientData function when the component mounts
  useEffect(() => {
    getPatientData();
  }, []);
  // Define an array of editable fields
  const editable = ["Fname", "Sname", "Email", "Postcode"];
  // Define a function to update the editData state variable
  function change(key, value) {
    setEditData((previousData) => ({ ...previousData, [key]: value }));
  }
  //Define an asynchronous function to save changes to the patient's data
  async function saveChanges() {
    try {
      // Set the savingChanges state variable to true
      setSavingChanges(true);
      
      // Send a PATCH request to the PHP script that updates the patient's GP record
      const response = await fetch(
        `http://localhost:8000/updatePatientGPrecord.php?NHSNumber=${nhsNumber}`,
        
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
         
        }
        
      );
      // Parse the response as JSON
      const data = await response.json();
      // Update the state variables with the new data

      setTestData(data);
      setEditData(data);
      //setEdit(false); // Set edit to false here
    } catch (error) {
      console.error(error);
    } finally {
      // Set the savingChanges state variable to false
      setSavingChanges(false); 
      // Set the edit state variable to false
      setEdit(false);
      // Call the getPatientData function after a delay of 1 second
      setTimeout(() => getPatientData(), 1000); // add a delay of 1 second (1000 milliseconds)
    }
      // Set the edit state variable to false
      setEdit(false); // Set edit to false here
  }
  
  return (
    <div>
      <InsetText>
        Patient Access connects you to local health services when you need them
        most. Book GP appointments, order repeat prescriptions and discover
        local health services for you or your family via your mobile or home
        computer.
      </InsetText>

      {/* // This is the start of the Table component */}
<Table>
  { // This is an inline map function to create Table.Row components based on the keys of testData object
    Object.keys(testData).map((key) => (
      <Table.Row key={key}> 
        <Table.Cell>{key}</Table.Cell>
        <Table.Cell>
          {edit && editable.includes(key) ? (
            <InputField
              value={editData[key]}
              onChange={(e) => change(key, e.target.value)} // Call the change function with the edited value whenever the InputField value changes
            />
          ) : ( // Otherwise, display the corresponding value from testData object
            testData[key]
          )}
        </Table.Cell>
      </Table.Row>
    ))
  }
</Table>

      
      {edit ? (
        <>
          <Button className= 'bcontrol' onClick={saveChanges} disabled={savingChanges}>
            {savingChanges ? "Saving Changes..." : "Save Changes"}
          </Button>
          <Button className= "bcontrol" onClick={() => setEdit(false)}>Cancel</Button>
        </>
      ) : (
        <Button className= 'bcontrol' onClick={() => setEdit(true)}>Edit</Button>
      )}
      <Button className= 'bcontrol' onClick={goBack} style={{ marginRight: '10px' }}>Back</Button>
      <Button className= 'bcontrol' onClick={handleLogout}>Logout</Button>
     
    </div>
    
  );
  
}

export default Patient_gprecord;


