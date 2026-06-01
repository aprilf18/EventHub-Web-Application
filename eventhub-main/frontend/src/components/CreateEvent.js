import React, { useState } from 'react';
import ConfirmPopup from './ConfirmPopup';

function CreateEvent({ onEventCreated }) {
  const predefinedTags = ['Music', 'Party', 'Sports', 'Food', 'Networking', 'Education'];

  const [event, setEvent] = useState({
    name: '',
    description: '',
    pricePerTicket: '',
    maxTickets: '',
    upcomingDate: '',
    upcomingTime: '',
    locationName: '',
    tags: [],
    customTag: '',
    creationDate: '',
    creationTime: ''
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = (tag) => {
    if (tag && !event.tags.includes(tag)) {
      setEvent(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const addCustomTag = () => {
    const tag = event.customTag.trim();

    if (tag !== '') {
      addTag(tag);
      setEvent(prev => ({
        ...prev,
        customTag: ''
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setEvent(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const createEvent = async () => {
    try {
      const { customTag, ...eventToSave } = event;

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventToSave,
          pricePerTicket: parseFloat(event.pricePerTicket)
        }),
      });

      if (response.ok) {
        const newEvent = await response.json();
        onEventCreated(newEvent);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }

    setShowConfirm(false);
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="upcomingDate">Date (MM/DD/YYYY):</label>
          <textarea
            id="upcomingDate"
            name="upcomingDate"
            value={event.upcomingDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="upcomingTime">Time (ex. 12:34 PM):</label>
          <textarea
            id="upcomingTime"
            name="upcomingTime"
            value={event.upcomingTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="locationName">Name of location:</label>
          <textarea
            id="locationName"
            name="locationName"
            value={event.locationName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Event Tags:</label>

          <div className="tag-options">
            {predefinedTags.map(tag => (
              <button
                type="button"
                key={tag}
                className="tag-button"
                onClick={() => addTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="custom-tag-row">
            <input
              type="text"
              name="customTag"
              placeholder="Add custom tag"
              value={event.customTag}
              onChange={handleChange}
            />

            <button type="button" onClick={addCustomTag}>
              Add Tag
            </button>
          </div>

          <div className="selected-tags">
            {event.tags.map(tag => (
              <span key={tag} className="tag-pill">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="pricePerTicket">Price per Ticket:</label>
          <input
            type="number"
            id="pricePerTicket"
            name="pricePerTicket"
            value={event.pricePerTicket}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxTickets">Number of Tickets (leave blank for unlimited):</label>
          <input
            type="number"
            id="maxTickets"
            name="maxTickets"
            value={event.maxTickets}
            onChange={handleChange}
            step="1"
            min="0"
            required
          />
        </div>

        <button type="submit">Create Event</button>
      </form>

      {showConfirm && (
        <ConfirmPopup
          onConfirm={createEvent}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default CreateEvent;
