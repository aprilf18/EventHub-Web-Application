import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import ReservationForm from './components/ReservationForm';
import GetStarted from './components/GetStarted';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('getStarted');
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent]);
    setCurrentView('list');
  };

  const handleReserveEvent = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentView('reserve');
  };

  const handleReservationComplete = () => {
    setCurrentView('list');
  };

  return (
    <div className="App">
      {currentView === 'getStarted' ? (
        <GetStarted onGetStarted={() => setCurrentView('home')} />
      ) : (
        <>
          <header className="App-header">
            <h1>EventHub</h1>
            <nav>
              <button onClick={() => setCurrentView('home')}>Home</button>
              <button onClick={() => setCurrentView('list')}>Events</button>
              <button onClick={() => setCurrentView('create')}>Create Event</button>
            </nav>
          </header>

          <main>
            {currentView === 'home' && (
              <HomePage
                onBrowseEvents={() => setCurrentView('list')}
                onCreateEvent={() => setCurrentView('create')}
                onReserveEvent={() => setCurrentView('reserve')}
              />
            )}

            {currentView === 'list' && (
              <EventList events={events} onReserveEvent={handleReserveEvent} />
            )}

            {currentView === 'create' && (
              <CreateEvent onEventCreated={handleEventCreated} />
            )}

            {currentView === 'reserve' && (
              <ReservationForm 
                eventId={selectedEventId} 
                onSuccess={handleReservationComplete}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
