# ✨ Glow Quiz Pro

A personalized skincare quiz application that recommends products and routines based on your skin type, concerns, and lifestyle.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Data**: JSON seed files for questions, recommendations, and products

## Project Structure

```
glow-quiz-pro/
├── backend/
│   ├── server.py           # FastAPI application
│   ├── seed_data.py        # Data loader utilities
│   ├── requirements.txt    # Python dependencies
│   └── data/
│       ├── questions.json      # Quiz questions
│       ├── recommendations.json # Skin type & concern recommendations
│       └── products.json       # Product database
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── QuizPage.jsx
│       │   └── ResultsPage.jsx
│       └── components/
│           ├── ProgressBar.jsx
│           ├── QuestionCard.jsx
│           ├── SkinTypeCard.jsx
│           ├── RoutineCard.jsx
│           └── ProductCard.jsx
└── README.md
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python server.py
```

The API will be available at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/questions` | Get all quiz questions |
| GET | `/api/questions/{category}` | Get questions by category |
| POST | `/api/quiz/submit` | Submit quiz answers and get results |
| GET | `/api/products` | Get products (with optional filters) |
| GET | `/api/skin-types` | Get all skin type information |
| GET | `/api/concerns` | Get all concern information |

## Features

- 🧪 10-question personalized skin analysis
- 🎯 Intelligent skin type detection (dry, oily, combination, sensitive, normal)
- 💊 Concern-based recommendations (aging, acne, hyperpigmentation, dehydration, dullness)
- 🧴 AM & PM routine builder
- 💄 Budget-aware product recommendations
- 🌿 Lifestyle tips based on habits
- ✨ Beautiful animated UI with smooth transitions
