import DeReg from './Components/DeReg';
import './Components/gov.francesco.css';
import './Asma.css';
import { Page} from 'govuk-react'
import {Routes, Route} from 'react-router-dom'
import Login from './Patient_login';
import Patient_AP from './patient_pa';
import Patient_gprecord from './Patient_gprecord';
import React from 'react';
import Header from './Topnav';
import MainPage from './main_page';
import Patientreg from './Components/Patientreg';

import { createContext } from 'react';
export const CurrentContext = createContext(null);




function App() {
 
  
  return (
    <div className="App">
      <div>
      <Page header={<Header></Header>}>
        <Routes>
          <Route path='/'/>
          <Route path='/main_page' element={<MainPage/>}/>
          <Route path='/patient_login' element={<Login/>}/>
          <Route path='/patient_PA' element={<Patient_AP/>}/>
          <Route path='/patient_gprecord' element={<Patient_gprecord/>}/>
          <Route path='/Patientreg' element={<Patientreg />} />
          <Route path='/PatientRegNHS' element={<PatientRegNHS/>}/>
          <Route path='/DeReg' element={<DeReg/>}/>
          <Route path='/addpatientnhs' element={<addPatientNH/>}/>
        </Routes>
      </Page>
      </div>
    </div>

  
  );
}

export default App;
