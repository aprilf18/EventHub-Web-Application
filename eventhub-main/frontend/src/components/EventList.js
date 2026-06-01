import React, { useState } from 'react';

function EventList({ events, onReserveEvent }) {
  const [sortType, setSortType] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [tagFilter, setTagFilter] = useState('');

  const filteredEvents = events.filter(event => {
    if (tagFilter.trim() === '') {
      return true;
    }

    const searchTag = tagFilter.toLowerCase();

    return (
      event.tag?.toLowerCase().includes(searchTag) ||
      event.category?.toLowerCase().includes(searchTag) ||
      event.tags?.join(' ').toLowerCase().includes(searchTag)
    );
  });

  const getEventDateTime = (event) => {
    return new Date(`${event.upcomingDate} ${event.upcomingTime}`);
  };

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortType === 'priceLowHigh') {
      return a.pricePerTicket - b.pricePerTicket;
    }

    if (sortType === 'priceHighLow') {
      return b.pricePerTicket - a.pricePerTicket;
    }

    if (sortType === 'dateAsc' || sortType === 'dateDesc') {
      const aDateTime = getEventDateTime(a);
      const bDateTime = getEventDateTime(b);

      return sortType === 'dateAsc'
        ? aDateTime - bDateTime
        : bDateTime - aDateTime;
    }

    return 0;
  });

  const displayedEvents = sortedEvents.filter(event => {
    const eventDateTime = getEventDateTime(event);
    const now = new Date();

    if (!(eventDateTime instanceof Date) || Number.isNaN(eventDateTime.getTime())) {
      return false;
    }

    return activeTab === 'upcoming'
      ? eventDateTime >= now
      : eventDateTime < now;
  });

  return (
    <div>
      <h2>Available Events</h2>

      <div className="event-tabs">
        <button
          className={activeTab === 'upcoming' ? 'active-tab' : ''}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events
        </button>

        <button
          className={activeTab === 'past' ? 'active-tab' : ''}
          onClick={() => setActiveTab('past')}
        >
          Past Events
        </button>
      </div>

      <div className="filter-section">
        <label htmlFor="tagFilter">Filter by tag: </label>
        <input
          id="tagFilter"
          type="text"
          placeholder="Enter tag"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
      </div>

      <div className="sort-section">
        <label htmlFor="sortEvents">
          Sort {activeTab === 'upcoming' ? 'upcoming' : 'past'} events:
        </label>

        <select
          id="sortEvents"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Default</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="dateAsc">Date/Time: Earliest First</option>
          <option value="dateDesc">Date/Time: Latest First</option>
        </select>
      </div>

      {displayedEvents.length === 0 ? (
        <p>No events match your filter.</p>
      ) : (
        <div className="event-list">
          {displayedEvents.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.locationName}</p>
              <p>{event.upcomingDate} {event.upcomingTime}</p>
              <p>{event.description}</p>

              {event.tags && event.tags.length > 0 && (
                <div className="selected-tags">
                  {event.tags.map(tag => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="price">${event.pricePerTicket}</p>

              <button
                className="reserve-btn"
                onClick={() => onReserveEvent(event.id)}
              >
                Reserve Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
