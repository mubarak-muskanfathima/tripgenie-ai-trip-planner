
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

function TripResult() {
  const location = useLocation();

  // Trip data passed from PlanTrip or MyTrips
  const [trip, setTrip] = useState(location.state || null);

  const [loading, setLoading] = useState(
    !location.state?.tripId
  );

  useEffect(() => {
    const loadTrip = async () => {

      // If trip data already exists, no need to fetch
      if (location.state?.from && location.state?.aiResult) {
        setTrip(location.state);
        setLoading(false);
        return;
      }

      const tripId = location.state?.tripId;

      if (!tripId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://tripgenie-ai-trip-planner.onrender.com/api/trips/${tripId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!data.success) {
          alert(data.message || "Unable to load trip.");
          setLoading(false);
          return;
        }

        const savedTrip = data.trip;

        setTrip({
          tripId: savedTrip._id,
          from: savedTrip.from,
          destination: savedTrip.destination,
          days: savedTrip.days,
          travelers: savedTrip.travelers,
          budget: savedTrip.budget,
          interests: savedTrip.interests,
          aiResult: savedTrip.aiResult
        });

      } catch (error) {
        console.error("Load Trip Error:", error);
        alert("Cannot connect to TripGenie server.");
      } finally {
        setLoading(false);
      }
    };

    loadTrip();

  }, [location.state]);


  // Loading
  if (loading) {
    return (
      <div className="result-page">

        <div className="loading-message">
          🤖 Loading your trip...
        </div>

      </div>
    );
  }


  // No trip
  if (!trip) {
    return (
      <div className="result-page">

        <h1>
          No trip found
        </h1>

        <Link
          to="/plan-trip"
          className="edit-trip-btn"
        >
          Plan a Trip
        </Link>

      </div>
    );
  }


  const aiResult = trip.aiResult;


  return (
    <div className="result-page">

      {/* Header */}
      <div className="result-header">

        <div>

          <p className="section-label">
            YOUR TRIPGENIE AI ITINERARY
          </p>

          <h1>
            {trip.days} Days in {trip.destination}
          </h1>

          <p>
            Personalized trip from {trip.from}
          </p>

        </div>

        <Link
          to="/plan-trip"
          className="edit-trip-btn"
        >
          ✏ Edit Trip
        </Link>

      </div>


      {/* Trip Summary */}
      <div className="trip-summary">

        <div>
          <span>📍</span>

          <strong>
            {trip.destination}
          </strong>

          <small>
            Destination
          </small>
        </div>


        <div>
          <span>📅</span>

          <strong>
            {trip.days} Days
          </strong>

          <small>
            Duration
          </small>
        </div>


        <div>
          <span>👥</span>

          <strong>
            {trip.travelers} People
          </strong>

          <small>
            Travelers
          </small>
        </div>


        <div>
          <span>💰</span>

          <strong>
            ₹{Number(trip.budget).toLocaleString()}
          </strong>

          <small>
            Budget
          </small>
        </div>

      </div>


      {/* AI Itinerary */}
      <div className="ai-itinerary">

        <div className="ai-title">

          <span className="ai-icon">
            🤖
          </span>

          <div>

            <h2>
              AI Generated Itinerary
            </h2>

            <p>
              Your personalized day-by-day travel plan
            </p>

          </div>

        </div>


        {aiResult?.itinerary?.map((day) => (

          <div
            className="day-card"
            key={day.day}
          >

            <div className="day-number">
              {String(day.day).padStart(2, "0")}
            </div>


            <div className="day-content">

              <h2>
                {day.title}
              </h2>


              <div className="activity-grid">

                <div className="activity">

                  <span>🌅</span>

                  <div>

                    <h4>
                      Morning
                    </h4>

                    <p>
                      {day.morning}
                    </p>

                  </div>

                </div>


                <div className="activity">

                  <span>☀️</span>

                  <div>

                    <h4>
                      Afternoon
                    </h4>

                    <p>
                      {day.afternoon}
                    </p>

                  </div>

                </div>


                <div className="activity">

                  <span>🌆</span>

                  <div>

                    <h4>
                      Evening
                    </h4>

                    <p>
                      {day.evening}
                    </p>

                  </div>

                </div>


                <div className="activity">

                  <span>🍜</span>

                  <div>

                    <h4>
                      Food
                    </h4>

                    <p>
                      {day.food}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Budget */}
      {aiResult?.budget && (

        <div className="ai-budget-card">

          <p className="section-label">
            ESTIMATED BUDGET
          </p>

          <h2>
            ₹{Number(trip.budget).toLocaleString()}
          </h2>


          <div className="budget-grid">

            <div>

              <span>🏨</span>

              <p>
                Accommodation
              </p>

              <strong>
                ₹{Number(
                  aiResult.budget.accommodation
                ).toLocaleString()}
              </strong>

            </div>


            <div>

              <span>🍽️</span>

              <p>
                Food
              </p>

              <strong>
                ₹{Number(
                  aiResult.budget.food
                ).toLocaleString()}
              </strong>

            </div>


            <div>

              <span>🚕</span>

              <p>
                Transport
              </p>

              <strong>
                ₹{Number(
                  aiResult.budget.transport
                ).toLocaleString()}
              </strong>

            </div>


            <div>

              <span>🎟️</span>

              <p>
                Activities
              </p>

              <strong>
                ₹{Number(
                  aiResult.budget.activities
                ).toLocaleString()}
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* Travel Tips */}
      {aiResult?.tips && (

        <div className="tips-card">

          <h2>
            💡 AI Travel Tips
          </h2>

          <ul>

            {aiResult.tips.map((tip, index) => (

              <li key={index}>
                {tip}
              </li>

            ))}

          </ul>

        </div>

      )}


      {/* Interests */}
      {trip.interests?.length > 0 && (

        <div className="selected-interests">

          <h2>
            Your Interests
          </h2>


          <div className="interest-display">

            {trip.interests.map((interest) => (

              <span key={interest}>
                {interest}
              </span>

            ))}

          </div>

        </div>

      )}


      {/* Actions */}
      <div className="result-actions">

        <Link
          to="/my-trips"
          className="edit-trip-btn"
        >
          ← Back to My Trips
        </Link>

        <Link
          to="/plan-trip"
          className="edit-trip-btn"
        >
          Create Another Trip →
        </Link>

      </div>

    </div>
  );
}

export default TripResult;
