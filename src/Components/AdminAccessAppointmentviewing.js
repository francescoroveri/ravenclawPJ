import React, { useState } from 'react';
import { InsetText, Input, Button } from 'govuk-react';
import "./AdminAccessAppointmentviewing";

function AdminAccessAppointmentviewing() {
    // Define state variables for doctorId using useState hook
    const [doctorId, setDoctorId] = useState('');

    // Define a function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Doctor ID: ${doctorId}`);
    };


    // Render the component
    return (
        <>
            <h1>Admin Access Appointment viewing</h1>
            {/* Create a form and attach the handleSubmit function to the onSubmit event */}
            <form onSubmit={handleSubmit}>
                {/* Display a text message */}
                <InsetText>
                    Enter a doctor id to search upcoming appointments
                </InsetText>
                {/* Label and input for doctorId */}
                <label htmlFor="admin-id">Doctor ID</label>
                <Input
                    className="govuk-input"
                    id="doctor-id"
                    name="doctor-id"
                    type="text"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                />
                {/* Submit button */}
                <Button type="submit">Continue</Button>
                {/* Reset button */}
                <Button type="reset">Back</Button>
            </form>
        </>
    );
};

export default AdminAccessAppointmentviewing;
