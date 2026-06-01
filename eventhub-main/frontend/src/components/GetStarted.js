function GetStarted({ onGetStarted }) {
  return (
    <div className="landing-page">
      <h1>Join EventHub Today</h1>

      <button className="get-started-button" onClick={onGetStarted}>
        Get Started
      </button>

      <p className="landing-note">✓ Discover, create, and reserve events easily</p>
    </div>
  );
}

export default GetStarted;