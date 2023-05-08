import React, { useState } from 'react';
import { InsetText, Input, Button } from 'govuk-react';
import "./AdminAccessAppointmentviewing";

function AdminAccessAppointmentviewing() {
    const [doctorId, setDoctorId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Doctor ID: ${doctorId}`);
    };


    return (
        <>
            <h1>Admin Access Appointment viewing</h1>
            <form onSubmit={handleSubmit}>
                <InsetText>
                    Enter a doctor id to search upcoming appointments
                </InsetText>
                <label htmlFor="admin-id">Doctor ID</label>
                <Input
                    className="govuk-input"
                    id="doctor-id"
                    name="doctor-id"
                    type="text"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                />
                <Button type="submit">Continue</Button>
                <Button type="reset">Back</Button>
            </form>
        </>
    );
};

export default AdminAccessAppointmentviewing;