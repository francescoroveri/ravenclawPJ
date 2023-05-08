import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TopNav } from 'govuk-react';
import AdminLoginPage from './Components/AdminLoginPage';
import AdminAccessAppointmentManagement from './Components/AdminAccessAppointmentManagement';
import AdminAccessAppointmentviewing from './Components/AdminAccessAppointmentviewing';

const App = () => {
  return (
    <Router>
      <div>
        <TopNav
          company={<TopNav.Anchor href="https://example.com" target="new"></TopNav.Anchor>}
          serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Gov.uk GP</TopNav.NavLink>}
        >
          <TopNav.NavLink href="/AdminLoginPage">Admin Login</TopNav.NavLink>
          <TopNav.NavLink href="/AdminAccessAppointmentviewing">Admin Access Appointment viewing</TopNav.NavLink>
          <TopNav.NavLink href="/AdminAccessAppointmentManagement">Admin Access (Appointment Management)</TopNav.NavLink>
        </TopNav>
        <Routes>
          <Route path="/" element={<AdminLoginPage />} />
          <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
          <Route path="/AdminAccessAppointmentviewing" element={<AdminAccessAppointmentviewing />} />
          <Route path="/AdminAccessAppointmentManagement" element={<AdminAccessAppointmentManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


