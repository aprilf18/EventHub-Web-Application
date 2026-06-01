import React, { useState, useEffect } from 'react';

function ReservationForm({ eventId, onSuccess }) {
  const [reservation, setReservation] = useState({
    customerName: '',
    customerEmail: '',
    customerTickets: '',
    eventId: eventId || ''
  });

  useEffect(() => {
    setReservation((prev) => ({
      ...prev,
      eventId: eventId || ''
    }));
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reservation,
          event: { id: parseInt(reservation.eventId) }
        }),
      });

      if (response.ok) {
        alert('Ticket reserved successfully!');
        setReservation({
          customerName: '',
          customerEmail: '',
          customerTickets: '',
          eventId: ''
        });
        onSuccess();
      } else {
        console.error('Failed to reserve ticket');
      }
    } catch (error) {
      console.error('Error reserving ticket:', error);
    }
  };

  return (
    <div>
      <h2>Reserve Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Your Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={reservation.customerName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="customerEmail">Email:</label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={reservation.customerEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerTickets">Number of Tickets:</label>
          <input
            type="number"
            id="customerTickets"
            name="customerTickets"
            value={reservation.customerTickets}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="eventId">Event ID:</label>
          <input
            type="number"
            id="eventId"
            name="eventId"
            value={reservation.eventId}
            onChange={handleChange}
            required
            readOnly={!!eventId}
          />
        </div>
        
        <button type="submit">Reserve Ticket</button>
      </form>
    </div>
  );
}

export default ReservationForm;
