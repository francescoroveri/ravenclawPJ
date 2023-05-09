import './Asma.css';
import {Label} from '@govuk-react/label';
import {Button, TopNav} from'govuk-react'
import {InsetText} from '@govuk-react/inset-text';
import {LeadParagraph} from '@govuk-react/lead-paragraph';
import Link from '@govuk-react/link';
import { useState } from 'react';
import React from 'react';
import { Breadcrumbs, Breadcrumb } from 'govuk-react';
import { GridRow, GridCol } from 'govuk-react';
import { Panel } from 'govuk-react';
import { Route, useNavigate } from 'react-router-dom';

//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066

function MainPage() {
  const navigate = useNavigate();
  const handelClick = (route) => {
    navigate(route);
  };
  return (
    <>
   
     

      <div style={{ marginTop: '0px', marginBottom: '20px' }}>
        <GridRow>
          <GridCol>
            <h1>Raven Claw GP services</h1>
            <p>Welcome to our GP services page. Here you can find information about the services we offer and how to book an appointment with one of our doctors.</p>
          </GridCol>
          
          <GridCol>
            <img src="https://www.nhsaaa.net/media/9998/hcw_tw-1100-x-620.jpg" alt="no image" style={{ maxWidth: '100%' }} />
          </GridCol>
        </GridRow>

        <GridRow>
        <GridCol >
          <Button onClick={() => handelClick('/patient_login')}>Patient</Button>
        </GridCol>
        <GridCol>
          <Button onClick={() => handelClick('/doctorlogin')}>Doctor</Button>
        </GridCol>
        <GridCol>
          <Button onClick={() => handelClick('/adminloginpage')}>Admin</Button>
        </GridCol>
      </GridRow>

        <InsetText>
        Your health should always be your number one priority, no matter how busy your schedule is. So instead of attending in-person to book appointments at a doctors practice, use our online GP services to access GP records, book appointment and much more  at your convenience. You’ll no longer have to look for a GP near me, as you now have a GP online services at your fingertips, without even having to leave your house.
      </InsetText>
      <GridCol>
            <img src="https://kingsmuirhouse.co.uk/wp-content/uploads/2020/04/NHS-Heroes-5.jpeg" alt="no image" style={{ maxWidth: '100%' }} />
          </GridCol>
        <GridRow>
          <GridCol>
            <h1>Our Doctors</h1>
            <p>We want to make sure everyone can get the right care at the right time, whether that’s online or face-to-face. So Team GP now includes a variety of expert healthcare professionals, including clinical pharmacists, nurse practitioners, first contact physiotherapists, paramedics, and more.</p>
          </GridCol>
          
        </GridRow>



        <GridRow>
          <GridCol>
            <h1>GP services</h1>
            <p>We want to make sure everyone can get the right care at the right time, whether that’s online or face-to-face. So Team GP now includes a variety of expert healthcare professionals, including clinical pharmacists, nurse practitioners, first contact physiotherapists, paramedics, and more.</p>
          </GridCol>
        
        </GridRow>
       {/* hours and location. */}
        <GridRow> 
        
           
            <GridCol>
            <h1> Hours</h1>
            <p>  Monday to Friday: 8am to 6pm
            Saturday: 9am to 1pm
            Sunday: Closed</p>
          </GridCol>
    
          <GridCol>
            <h1>Our Location</h1>
            <p> Raven Claw Medical Centre 1-3 Stanley Avenue, Wembley, Middlesex HA0 4JF</p>
          </GridCol>
          <GridCol>
            <img src="https://cdn-ankjd.nitrocdn.com/OjLCEthUUXPAtvGuKItSofVslLLbuvft/assets/images/optimized/rev-9d4b4f3/wp-content/uploads/2017/05/map-1272165_1280.png" alt="no image" style={{ maxWidth: '70%' }} />
          </GridCol>
        </GridRow>

       
      
      
        <div style={{ marginTop: '50px' }}>
  <GridRow>
    {/* <GridCol>
      <Panel title="Book" style={{ marginBottom: '20px', minHeight: '200px' }}>
        <p>Patient Login</p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/book-appointment"><Button>Book now</Button></Link>
        </div>
      </Panel>
    </GridCol> */}
    <GridCol>
    <Panel title="Contact us" style={{ marginBottom: '20px', minHeight: '200px' }}>
  <p>If you have any questions or concerns, please don't hesitate to get in touch with us.</p>
  <p>Telephone: <a href="tel:03003112233">0300 311 22 33</a></p>
  <p>Email: <a href="mailto:england.contactus@nhs.net">england.contactus@nhs.net</a></p>
  <div style={{ marginTop: '20px' }}>
        
  </div>
</Panel>
    </GridCol>
   
  </GridRow>
</div>

      </div>
    </>
  );
}

export default MainPage;


