import {Table} from '@govuk-react/table';
import {InsetText} from '@govuk-react/inset-text';
import InputField from '@govuk-react/input-field';
import {Label} from '@govuk-react/label';
import {Button} from'govuk-react'
import { useState } from 'react';
import { useEffect } from 'react';

//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066

function Patient_gprecord() {
  const nhsNumber = localStorage.getItem('nhsNumber');
  const [edit, setEdit] = useState(false);
  const [testData, setTestData] = useState({});
  const [editData, setEditData] = useState({});
  const [savingChanges, setSavingChanges] = useState(false);

  function goBack() {
    window.history.back();
  }
  function handleLogout() {
    localStorage.removeItem('nhsNumber');
    window.location.href = 'http://localhost:3000/Patient_login';
  }

  async function getPatientData() {
    try {
      const response = await fetch(
        `http://localhost:8000/getPatientRecord.php?NHSNumber=${nhsNumber}`
      );

      const data = await response.json();
      setTestData(data);
      setEditData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPatientData();
  }, []);

  const editable = ["Fname", "Sname", "Email", "Postcode"];

  function change(key, value) {
    setEditData((previousData) => ({ ...previousData, [key]: value }));
  }

  async function saveChanges() {
    try {
      setSavingChanges(true);
      handleInputChange();
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
  
      const data = await response.json();
      setTestData(data);
      setEditData(data);
      //setEdit(false); // Set edit to false here
    } catch (error) {
      console.error(error);
    } finally {
      setSavingChanges(false); 
      setEdit(false);
      setTimeout(() => getPatientData(), 1000); // add a delay of 1 second (1000 milliseconds)
    }
      setEdit(false); // Set edit to false here
  }
  // 
  function handleInputChange(key, value) {
    // Perform input validation here based on the key value
    if (key === "Email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        console.error("Invalid email address");
        // Display an error message or take some action
      }
    } else if (key === "Postcode") {
      if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(value)) {
        // Postcode is invalid
        // Display an error message or take some action
      }
    }
  
    setEditData((previousData) => ({ ...previousData, [key]: value }));
  }
  return (
    <div>
      <InsetText>
        Patient Access connects you to local health services when you need them
        most. Book GP appointments, order repeat prescriptions and discover
        local health services for you or your family via your mobile or home
        computer.
      </InsetText>

      <Table>
        {Object.keys(testData).map((key) => (
          <Table.Row key={key}>
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>
              {edit && editable.includes(key) ? (
                <InputField
                  value={editData[key]}
                  onChange={(e) => change(key, e.target.value)}
                />
              ) : (
                testData[key]
              )}
            </Table.Cell>
          </Table.Row>
        ))}
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


