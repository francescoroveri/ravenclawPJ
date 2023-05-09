import DeReg from './Components/DeReg';
import './Components/gov.francesco.css';
import './Components/Asma.css';
import { Page} from 'govuk-react'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/Patient_login';
import Patient_AP from './Components/patient_pa';
import Patient_gprecord from './Components/Patient_gprecord';
import React from 'react';
import Header from './Topnav';
import MainPage from './Components/main_page';
import Patientreg from './Components/Patientreg';
import AddPatientNHS from './Components/AddPatientNHS';
import AddPatiAdminAccessAppointmentManagemententNHS from './Components/AdminAccessAppointmentManagement';
import AdminAccessAppointmentManagement from './Components/AdminAccessAppointmentManagement';
import AdminLoginPage from './Components/AdminLoginPage';
import DoctorLogin from './Components/DoctorLogin';



import { createContext } from 'react';
export const CurrentContext = createContext(null);




function App() {
 
  
  return (
    <div className="App">
      <div>
      <Page header={<Header></Header>}>
        <Routes>
        <Route index element={<MainPage />} />
          <Route path='/main_page' element={<MainPage/>}/>
          <Route path='/patient_login' element={<Login/>}/>
          <Route path='/patient_PA' element={<Patient_AP/>}/>
          <Route path='/patient_gprecord' element={<Patient_gprecord/>}/>
          <Route path='/patientreg' element={<Patientreg />} />
          <Route path='/dereg' element={<DeReg/>}/>
          <Route path='/addpatientnhs' element={<AddPatientNHS/>}/>
          <Route path='/addpatiadminaccessappointmentmanagemententnhs' element={<AddPatiAdminAccessAppointmentManagemententNHS/>}/>
          <Route path='/adminaccessappointmentmanagement' element={<AdminAccessAppointmentManagement/>}/>
          <Route path='/adminloginpage' element={<AdminLoginPage/>}/>
          <Route path='/doctorlogin' element={<DoctorLogin/>}/>
          <Route path='/addpatientnhs' element={<AddPatientNHS/>}/>
       
        

        </Routes>
      </Page>
      </div>
    </div>

  
  );
}

export default App;
