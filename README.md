# ✈️ TripGenie — AI Trip Planner

TripGenie is a full-stack AI-powered travel planning application that creates personalized travel itineraries based on the user's destination, duration, budget, number of travelers, and interests.

## 🌍 Features

- 🔐 User Registration & Login
- 🔑 JWT-based Authentication
- 🛡️ Protected Routes
- 🤖 AI-powered itinerary generation using Google Gemini
- 📍 Personalized destination planning
- 📅 Day-by-day travel itinerary
- 💰 AI-generated budget breakdown
- 💡 AI travel tips
- 💾 Save trips to MongoDB
- 📚 View saved trips in My Trips
- 🗑️ Delete saved trips
- 🔄 Refresh-safe trip viewing
- 📱 Responsive and modern UI

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- bcryptjs

### AI
- Google Gemini API

## 📂 Project Structure

```text
tripgenie-ai-trip-planner/
│
├── public/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── PlanTrip.jsx
│   │   ├── TripResult.jsx
│   │   └── MyTrips.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── ProtectedRoute.jsx
│
├── server/
│   ├── models/
│   │   ├── Trip.js
│   │   └── UserTemp.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── tripRoutes.js
│   │
│   └── server.js
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/tripgenie-ai-trip-planner.git
```

### 2. Open the project

```bash
cd tripgenie-ai-trip-planner
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd server
npm install
```

### 5. Create the backend `.env` file

Inside the `server` folder, create:

```text
.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Never upload the `.env` file to GitHub.

## ▶️ Run the Application

### Start the backend

From the `server` folder:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 🔄 Application Flow

```text
User
  ↓
Register / Login
  ↓
JWT Authentication
  ↓
Plan Trip
  ↓
Enter destination, budget, duration & interests
  ↓
Gemini AI
  ↓
Personalized Itinerary
  ↓
Save Trip
  ↓
MongoDB
  ↓
My Trips
  ↓
View / Delete Saved Trip
```

## 🤖 AI Trip Generation

TripGenie sends the user's travel requirements to Google Gemini and generates:

- Daily itinerary
- Morning activities
- Afternoon activities
- Evening activities
- Food recommendations
- Estimated accommodation cost
- Food cost
- Transportation cost
- Activity cost
- Travel tips

## 🔐 Security

TripGenie uses:

- JWT tokens for authentication
- bcryptjs for password hashing
- Protected API routes
- Environment variables for API keys and database credentials

Sensitive credentials are excluded from Git using `.gitignore`.

## 🚀 Future Improvements

Possible future enhancements include:

- 🌦️ Live weather information
- 🗺️ Interactive maps
- 📍 Google Maps integration
- 🏨 Hotel recommendations
- ✈️ Flight information
- 📄 Downloadable itinerary
- 🔗 Trip sharing

## 👩‍💻 Developer

**Muskan Mubarak**

B.Tech Computer Science & Engineering

### ⭐ Project

**TripGenie — AI Trip Planner**

Built as a full-stack web development project using React, Node.js, Express, MongoDB and Google Gemini AI.