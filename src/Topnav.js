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
        <TopNav.NavLink>Home</TopNav.NavLink>
        <TopNav.NavLink>Patient</TopNav.NavLink>
        <TopNav.NavLink>Doctor</TopNav.NavLink>
        <TopNav.NavLink>Admin</TopNav.NavLink>  
      </div>
    </TopNav>
  );
};

export default Header;


  