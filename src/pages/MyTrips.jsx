import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function MyTrips() {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/trips/my-trips",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!data.success) {
          alert(data.message || "Unable to load trips.");
          return;
        }

        setTrips(data.trips);

      } catch (error) {
        console.error("Fetch Trips Error:", error);
        alert("Cannot connect to TripGenie server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [navigate]);

  // Open saved trip
  const openTrip = (trip) => {
  navigate("/trip-result", {
    state: {
      tripId: trip._id,
      from: trip.from,
      destination: trip.destination,
      days: trip.days,
      travelers: trip.travelers,
      budget: trip.budget,
      interests: trip.interests,
      aiResult: trip.aiResult
    }
  });
};

  // Delete saved trip
  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/trips/${tripId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Unable to delete trip.");
        return;
      }

      // Remove deleted trip from the screen
      setTrips((prevTrips) =>
        prevTrips.filter((trip) => trip._id !== tripId)
      );

      alert("Trip deleted successfully! 🗑️");

    } catch (error) {
      console.error("Delete Trip Error:", error);
      alert("Cannot connect to TripGenie server.");
    }
  };

  if (loading) {
    return (
      <div className="my-trips-page">
        <div className="loading-message">
          🤖 Loading your trips...
        </div>
      </div>
    );
  }

  return (
    <div className="my-trips-page">

      {/* Header */}
      <div className="my-trips-header">

        <div>
          <p className="section-label">
            YOUR TRAVEL HISTORY
          </p>

          <h1>
            My Trips
          </h1>

          <p>
            All your AI-generated travel plans in one place.
          </p>
        </div>

        <Link
          to="/plan-trip"
          className="primary-btn"
        >
          + Plan New Trip
        </Link>

      </div>


      {/* No Trips */}
      {trips.length === 0 ? (

        <div className="empty-trips">

          <div className="empty-icon">
            ✈️
          </div>

          <h2>
            No trips yet
          </h2>

          <p>
            Start planning your first adventure with TripGenie AI.
          </p>

          <Link
            to="/plan-trip"
            className="primary-btn"
          >
            Plan My First Trip →
          </Link>

        </div>

      ) : (

        /* Trips */
        <div className="my-trips-grid">

          {trips.map((trip) => (

            <div
              className="history-card"
              key={trip._id}
            >

              <div className="history-card-top">

                <div className="history-icon">
                  📍
                </div>

                <span className="history-days">
                  {trip.days} Days
                </span>

              </div>


              <h2>
                {trip.destination}
              </h2>


              <p className="history-route">
                {trip.from} → {trip.destination}
              </p>


              <div className="history-details">

                <span>
                  👥 {trip.travelers} Travelers
                </span>

                <span>
                  💰 ₹{Number(trip.budget).toLocaleString()}
                </span>

              </div>


              {/* Interests */}
              {trip.interests?.length > 0 && (

                <div className="history-interests">

                  {trip.interests
                    .slice(0, 3)
                    .map((interest) => (

                      <span key={interest}>
                        {interest}
                      </span>

                    ))}

                </div>

              )}


              {/* Actions */}
              <div className="history-actions">

                <button
                  className="view-trip-btn"
                  onClick={() => openTrip(trip)}
                >
                  View Trip →
                </button>

                <button
                  className="delete-trip-btn"
                  onClick={() => handleDelete(trip._id)}
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyTrips;