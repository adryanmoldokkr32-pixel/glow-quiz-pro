"""
Glow Quiz Pro - Backend API
A personalized skincare quiz that recommends products and routines.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json
from seed_data import load_questions, load_recommendations, load_products

app = FastAPI(
    title="Glow Quiz Pro API",
    description="Personalized skincare quiz and recommendation engine",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data on startup
questions = load_questions()
recommendations = load_recommendations()
products = load_products()


class QuizAnswer(BaseModel):
    question_id: int
    option_id: str


class QuizSubmission(BaseModel):
    answers: List[QuizAnswer]


class QuizResult(BaseModel):
    skin_type: str
    skin_type_info: Dict[str, Any]
    primary_concern: str
    concern_info: Dict[str, Any]
    recommended_routine: Dict[str, List[str]]
    recommended_products: List[Dict[str, Any]]
    lifestyle_tips: List[str]


@app.get("/")
async def root():
    return {
        "message": "Welcome to Glow Quiz Pro API",
        "version": "1.0.0",
        "endpoints": {
            "questions": "/api/questions",
            "submit": "/api/quiz/submit",
            "products": "/api/products",
        },
    }


@app.get("/api/questions")
async def get_questions():
    """Get all quiz questions."""
    return {"questions": questions, "total": len(questions)}


@app.get("/api/questions/{category}")
async def get_questions_by_category(category: str):
    """Get questions filtered by category."""
    filtered = [q for q in questions if q["category"] == category]
    if not filtered:
        raise HTTPException(status_code=404, detail=f"Category '{category}' not found")
    return {"questions": filtered, "total": len(filtered)}


@app.post("/api/quiz/submit", response_model=QuizResult)
async def submit_quiz(submission: QuizSubmission):
    """Process quiz answers and return personalized recommendations."""
    if not submission.answers:
        raise HTTPException(status_code=400, detail="No answers provided")

    # Calculate skin type scores
    skin_type_scores = {"dry": 0, "oily": 0, "combination": 0, "sensitive": 0, "normal": 0}
    concern_scores = {"aging": 0, "acne": 0, "hyperpigmentation": 0, "dehydration": 0, "dullness": 0}
    routine_level = "basic"
    budget = "medium"
    lifestyle_factors = []

    for answer in submission.answers:
        question = next((q for q in questions if q["id"] == answer.question_id), None)
        if not question:
            continue

        option = next((o for o in question["options"] if o["id"] == answer.option_id), None)
        if not option:
            continue

        scores = option.get("scores", {})

        # Aggregate scores by category
        if question["category"] == "skin_type":
            for key, value in scores.items():
                if key in skin_type_scores and isinstance(value, (int, float)):
                    skin_type_scores[key] += value

        elif question["category"] == "concerns":
            for key, value in scores.items():
                if key in concern_scores and isinstance(value, (int, float)):
                    concern_scores[key] += value

        elif question["category"] == "routine":
            if "routine_level" in scores:
                routine_level = scores["routine_level"]
            if "spf_need" in scores and scores["spf_need"] >= 2:
                lifestyle_factors.append("Prioritize daily sunscreen - it's the #1 anti-aging product")

        elif question["category"] == "lifestyle":
            if "hydration_need" in scores and scores["hydration_need"] >= 2:
                lifestyle_factors.append("Increase water intake for better skin hydration from within")
            if "sleep_deprived" in scores and scores["sleep_deprived"] >= 2:
                lifestyle_factors.append("Try to get 7-8 hours of sleep - skin repairs overnight")

        elif question["category"] == "preferences":
            if "budget" in scores:
                budget = scores["budget"]

    # Determine primary skin type
    primary_skin_type = max(skin_type_scores, key=skin_type_scores.get)
    skin_type_info = recommendations["skin_types"].get(primary_skin_type, {})

    # Determine primary concern
    primary_concern = max(concern_scores, key=concern_scores.get)
    concern_info = recommendations["concerns"].get(primary_concern, {})

    # Get recommended routine
    recommended_routine = recommendations["routines"].get(routine_level, recommendations["routines"]["basic"])

    # Filter products by skin type, concern, and budget
    budget_order = {"low": 0, "medium": 1, "high": 2, "luxury": 3}
    user_budget_level = budget_order.get(budget, 1)

    recommended_products = []
    for product in products:
        product_budget_level = budget_order.get(product.get("budget", "medium"), 1)

        # Check if product matches skin type
        skin_match = "all" in product.get("skin_types", []) or primary_skin_type in product.get("skin_types", [])

        # Check if product addresses concern
        concern_match = primary_concern in product.get("concerns", [])

        # Check budget compatibility
        budget_match = product_budget_level <= user_budget_level

        if skin_match and (concern_match or not recommended_products) and budget_match:
            recommended_products.append({
                "name": product["name"],
                "category": product["category"],
                "price": product["price"],
                "key_ingredients": product["key_ingredients"],
            })

    # Add default lifestyle tips
    if not lifestyle_factors:
        lifestyle_factors = [
            "Stay consistent with your routine",
            "Always apply sunscreen as the last step in AM",
            "Give new products 4-6 weeks to show results",
        ]

    return QuizResult(
        skin_type=primary_skin_type,
        skin_type_info=skin_type_info,
        primary_concern=primary_concern,
        concern_info=concern_info,
        recommended_routine=recommended_routine,
        recommended_products=recommended_products[:6],
        lifestyle_tips=lifestyle_factors,
    )


@app.get("/api/products")
async def get_products(
    skin_type: Optional[str] = None,
    concern: Optional[str] = None,
    budget: Optional[str] = None,
    category: Optional[str] = None,
):
    """Get products with optional filtering."""
    filtered = products

    if skin_type:
        filtered = [p for p in filtered if skin_type in p.get("skin_types", []) or "all" in p.get("skin_types", [])]

    if concern:
        filtered = [p for p in filtered if concern in p.get("concerns", [])]

    if budget:
        filtered = [p for p in filtered if p.get("budget") == budget]

    if category:
        filtered = [p for p in filtered if p.get("category") == category]

    return {"products": filtered, "total": len(filtered)}


@app.get("/api/skin-types")
async def get_skin_types():
    """Get all skin type information."""
    return recommendations["skin_types"]


@app.get("/api/concerns")
async def get_concerns():
    """Get all skin concern information."""
    return recommendations["concerns"]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
