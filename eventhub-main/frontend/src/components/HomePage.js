function HomePage({ onBrowseEvents, onCreateEvent }) {
  return (
    <div className="home-page">
      <section className="home-card">
        <h1>Welcome to EventHub</h1>
        <p>
          EventHub helps you find events, create new events, and stay connected
          with your community.
        </p>

        <div className="home-buttons">
          <button onClick={onBrowseEvents}>Browse Events</button>
          <button onClick={onCreateEvent}>Create Event</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;