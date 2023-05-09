import React from 'react';
import { TopNav } from 'govuk-react';

//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066

const Header = () => {
  return (
    <TopNav>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginLeft: 'auto' }}>
        <TopNav.NavLink href='/main_page'>Home</TopNav.NavLink>
        <TopNav.NavLink href='/patient_login'>Patient</TopNav.NavLink>
        <TopNav.NavLink href='/doctorlogin'>Doctor</TopNav.NavLink>
        <TopNav.NavLink href='/adminloginpage'>Admin</TopNav.NavLink>  
      </div>
    </TopNav>
  );
};

export default Header;


  