import React, { useState, useEffect } from 'react';
import { Table, Button } from 'govuk-react';
import axios from 'axios';

const AdminAccessAppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the server
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`/api/appointments/${appointmentId}`);
      // Refresh appointments after successful cancellation
      fetchAppointments();
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  return (
    <>
      <h1>Admin Access (Appointment Management)</h1>
      <Table
        headers={['Appointment ID', 'Doctor', 'Patient', 'Date', 'Time', 'Actions']}
        rows={appointments.map(appointment => ({
          cells: [
            appointment.id,
            appointment.doctor,
            appointment.patient,
            appointment.date,
            appointment.time,
            <>
              <Button type="submit">cancelAppointment</Button>
              <Button type="reset">Back</Button>
            </>
          ]
        }))}
      />
    </>
  );
};

export default AdminAccessAppointmentManagement;
