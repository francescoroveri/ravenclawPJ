import {ListItem} from '@govuk-react/list-item';
import {InsetText} from '@govuk-react/inset-text';
import Link from '@govuk-react/link';
import {Button} from'govuk-react'
import './Asma.css';

//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066


function Patient_AP() {
  // function to logout patient, this will redirect user into the login page or main page
  function handleLogout() {
    localStorage.removeItem('nhsNumber');
    window.location.href = 'http://localhost:3000/Patient_login';
  }
    return (
      <div>
      {/* paragraph */}
      <InsetText> Patient Access connects you to local health services when you need them most. 
      Book GP appointments, order repeat prescriptions and discover local health services for you or your family via your mobile or home computer.
      </InsetText>

      {/* // list item used to display service options for user  */}
    <ListItem>
      <Link href="https://design-system.service.gov.uk">
       Book Appointment
      </Link>
    </ListItem>
    <ListItem>
      <Link href="https://design-system.service.gov.uk">
       View medical record
      </Link>
    </ListItem>
    <ListItem>
      
    <Link href="https://design-system.service.gov.uk">
      View your appointment 
      </Link>
    </ListItem>
    <ListItem>
      <Link href="http://localhost:3000/Patient_gprecord">
       Update GP record
      </Link>
    </ListItem>
    <ListItem>
      <Link href="https://design-system.service.gov.uk">
        De-register
      </Link>
    </ListItem>
   {/* calling the logout function */}
    <Button className= "bcontrol" onClick={handleLogout}>Logout</Button>
    <InsetText> "Safe, Secure, Together
    All of our services, content and processes follow a strict set of clinical guidelines, ensuring a safe environment for patient care.</InsetText>

      </div>
    );
  }
  
  export default Patient_AP;
  