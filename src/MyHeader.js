import React from "react";
import logo from './taxlogo.jpg';
function MyHeader() {
    return (
        <>
           <div className="row">
              <div className="column">
                <img src={logo} alt="logo" width="50" height="120" align="right"/>
              </div>
              <div className="column">
                <h1 align="left">My Income Calculator</h1>
              </div>
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
              </div>
            </div>
            <br/>
        </>
    );
}
export default MyHeader;