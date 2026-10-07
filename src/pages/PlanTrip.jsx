import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function PlanTrip() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [trip, setTrip] = useState({
    from: "",
    destination: "",
    days: "",
    travelers: "1",
    budget: "",
    interests: []
  });

  const interests = [
    "🏖️ Beaches",
    "🌿 Nature",
    "🏛️ History",
    "🍜 Food",
    "🛍️ Shopping",
    "🏔️ Adventure",
    "🎭 Culture",
    "📸 Photography"
  ];

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });
  };

  const toggleInterest = (interest) => {
    setTrip((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !trip.from ||
      !trip.destination ||
      !trip.days ||
      !trip.budget
    ) {
      alert("Please fill in all required details.");
      return;
    }

    try {
      setLoading(true);

      // Generate trip using Gemini
      const response = await fetch(
        "https://tripgenie-ai-trip-planner.onrender.com/api/generate-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(trip)
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to generate trip.");
        return;
      }

      // Get logged-in user's JWT token
      const token = localStorage.getItem("token");

      // Save generated trip to MongoDB
      try {
        const saveResponse = await fetch(
          "https://tripgenie-ai-trip-planner.onrender.com/api/trips/save",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              ...trip,
              aiResult: data.result
            })
          }
        );

        const saveData = await saveResponse.json();

        if (!saveData.success) {
          console.error("Trip was not saved:", saveData.message);
        } else {
          console.log("Trip saved successfully!");
        }

      } catch (saveError) {
        console.error("Trip save error:", saveError);
      }

      // Navigate to trip result page
      navigate("/trip-result", {
        state: {
          ...trip,
          aiResult: data.result
        }
      });

    } catch (error) {
      console.error("Generate Trip Error:", error);
      alert("Cannot connect to TripGenie server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plan-page">

      <div className="plan-header">

        <p className="section-label">
          TRIPGENIE AI
        </p>

        <h1>
          Plan your perfect trip
        </h1>

        <p>
          Tell us a little about your journey and we'll create
          a personalized travel plan for you.
        </p>

      </div>

      <form
        className="trip-form"
        onSubmit={handleSubmit}
      >

        {/* Location */}
        <div className="form-section">

          <h2>
            📍 Where are you going?
          </h2>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Starting From
              </label>

              <input
                type="text"
                name="from"
                placeholder="e.g. Hyderabad"
                value={trip.from}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Destination
              </label>

              <input
                type="text"
                name="destination"
                placeholder="e.g. Goa"
                value={trip.destination}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* Trip Details */}
        <div className="form-section">

          <h2>
            🧳 Trip details
          </h2>

          <div className="form-grid three-columns">

            <div className="form-group">

              <label>
                Number of Days
              </label>

              <input
                type="number"
                name="days"
                min="1"
                placeholder="e.g. 4"
                value={trip.days}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Travelers
              </label>

              <input
                type="number"
                name="travelers"
                min="1"
                value={trip.travelers}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Budget (₹)
              </label>

              <input
                type="number"
                name="budget"
                min="1"
                placeholder="e.g. 15000"
                value={trip.budget}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* Interests */}
        <div className="form-section">

          <h2>
            ✨ What do you enjoy?
          </h2>

          <p className="form-description">
            Select the experiences you'd like to include.
          </p>

          <div className="interest-grid">

            {interests.map((interest) => (

              <button
                type="button"
                key={interest}
                className={
                  trip.interests.includes(interest)
                    ? "interest-btn selected"
                    : "interest-btn"
                }
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>

            ))}

          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="generate-trip-btn"
          disabled={loading}
        >

          {loading
            ? "🤖 Creating your perfect itinerary..."
            : "Generate My Trip ✨"}

        </button>

      </form>

    </div>
  );
}

export default PlanTrip;