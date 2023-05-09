import './App.css';
import Patientreg from './Components/Patientreg';
import DeReg from './Components/DeReg';
import './Components/gov.francesco.css';
import {Route, Routes } from "react-router-dom";
import {TopNav} from 'govuk-react';
import { createContext } from 'react';
export const CurrentContext = createContext(null);


function App() {
  return (
    <div className="App">

        <TopNav
            company={<TopNav.Anchor href="https://example.com" target="new"></TopNav.Anchor>}
            serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Gov.uk GP</TopNav.NavLink>}
            >
            <TopNav.NavLink href="/Patientreg">
                Register with personal info
            </TopNav.NavLink>
            <TopNav.NavLink href="/DeReg">
                de reg
            </TopNav.NavLink>
        </TopNav>
          <Routes>
            <Route index element={<Patientreg />} />
            <Route path='/Patientreg' element={<Patientreg />} />
            <Route path='/DeReg' element={<DeReg/>}/>
          </Routes>

    </div>    
  );
}

export default App;
