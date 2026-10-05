import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          <span>✈</span>
          TripGenie
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#destinations">
            Destinations
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About
          </a>

          {user && (
            <Link to="/my-trips">
              My Trips
            </Link>
          )}

        </div>

        {user ? (

          <div className="user-section">

            <span className="user-name">
              👤 {user.name}
            </span>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        )}

      </nav>


      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">

          <div className="small-title">
            ✨ YOUR PERSONAL AI TRAVEL ASSISTANT
          </div>

          <h1>
            Your journey.
            <br />
            <span>Perfectly planned.</span>
          </h1>

          <p>
            Tell us where you want to go, what you love and your budget.
            TripGenie uses AI to create a personalized travel experience
            just for you.
          </p>

          <div className="hero-buttons">

            <Link
              to="/plan-trip"
              className="primary-btn"
            >
              Plan My Trip <span>→</span>
            </Link>

            <a
              href="#destinations"
              className="secondary-btn"
            >
              Explore Destinations
            </a>

          </div>

        </div>


        {/* Travel Card */}
        <div className="trip-card">

          <div className="card-top">

            <div>

              <p className="card-label">
                PLAN YOUR NEXT ADVENTURE
              </p>

              <h3>
                Where do you want to go?
              </h3>

            </div>

            <div className="globe-icon">
              🌍
            </div>

          </div>


          <div className="search-box">

            <div className="input-group">

              <span>
                📍
              </span>

              <div>

                <small>
                  Destination
                </small>

                <p>
                  Where are you going?
                </p>

              </div>

            </div>


            <div className="input-group">

              <span>
                📅
              </span>

              <div>

                <small>
                  Duration
                </small>

                <p>
                  How many days?
                </p>

              </div>

            </div>


            <Link
              to="/plan-trip"
              className="generate-btn"
            >
              Generate Trip
            </Link>

          </div>

        </div>

      </section>


      {/* Destinations */}
      <section
        className="destinations"
        id="destinations"
      >

        <div className="section-heading">

          <div>

            <p className="section-label">
              GET INSPIRED
            </p>

            <h2>
              Popular destinations
            </h2>

          </div>

          <button className="view-btn">
            View all →
          </button>

        </div>


        <div className="destination-grid">

          <div className="destination-card">

            <div className="destination-image hyderabad">
              <span>🇮🇳</span>
            </div>

            <div className="destination-info">

              <h3>
                Hyderabad
              </h3>

              <p>
                Culture • Food • Heritage
              </p>

            </div>

          </div>


          <div className="destination-card">

            <div className="destination-image goa">
              <span>🌴</span>
            </div>

            <div className="destination-info">

              <h3>
                Goa
              </h3>

              <p>
                Beaches • Adventure • Relax
              </p>

            </div>

          </div>


          <div className="destination-card">

            <div className="destination-image kerala">
              <span>🌿</span>
            </div>

            <div className="destination-info">

              <h3>
                Kerala
              </h3>

              <p>
                Nature • Backwaters • Culture
              </p>

            </div>

          </div>


          <div className="destination-card">

            <div className="destination-image jaipur">
              <span>🏰</span>
            </div>

            <div className="destination-info">

              <h3>
                Jaipur
              </h3>

              <p>
                History • Architecture • Culture
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section
        className="features"
        id="features"
      >

        <div className="section-center">

          <p className="section-label">
            WHY TRIPGENIE
          </p>

          <h2>
            Travel planning, made smarter.
          </h2>

          <p>
            Everything you need to turn your travel ideas into a
            well-planned journey.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              AI-Powered Plans
            </h3>

            <p>
              Get personalized day-by-day itineraries based on your
              destination, interests and travel style.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <h3>
              Smart Budgeting
            </h3>

            <p>
              Plan your trip according to your budget with estimated
              travel, food and activity expenses.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📍
            </div>

            <h3>
              Discover Places
            </h3>

            <p>
              Find interesting attractions, food spots and experiences
              worth exploring.
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer id="about">

        <div className="footer-logo">
          ✈ TripGenie
        </div>

        <p>
          Plan smarter. Travel better.
        </p>

        <p className="copyright">
          © 2026 TripGenie AI. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;