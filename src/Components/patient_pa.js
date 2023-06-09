import {ListItem} from '@govuk-react/list-item';
import {InsetText} from '@govuk-react/inset-text';
import Link from '@govuk-react/link';
import {Button} from'govuk-react'
import './Asma.css';
import {useNavigate} from"react-router-dom"

//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066

function Patient_AP() {
  const navigate = useNavigate();
  const handelClick = (route) => {
    navigate(route);
  };


  function handleLogout() {
    localStorage.removeItem('nhsNumber');
    window.location.href = 'http://localhost:3000/Patient_login';
  }
    return (
      <div>
      <InsetText> Patient Access connects you to local health services when you need them most. 
      Book GP appointments, order repeat prescriptions and discover local health services for you or your family via your mobile or home computer.
      </InsetText>


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
      <Link href="/patient_gprecord">
       Update GP record
      </Link>
    </ListItem>
    <ListItem>
      <Link href="/dereg">
        De-register
      </Link>
    </ListItem>
    
   
    <Button className= "bcontrol" onClick={handleLogout}>Logout</Button>
    <InsetText> "Safe, Secure, Together
    All of our services, content and processes follow a strict set of clinical guidelines, ensuring a safe environment for patient care.</InsetText>

      </div>
    );
  }
  
  export default Patient_AP;
  