"""
Seed data loader for Glow Quiz Pro.
Loads quiz questions, recommendations, and product data from JSON files.
"""

import json
import os
from pathlib import Path

DATA_DIR = Path(__file__).parent / "data"


def load_questions():
    """Load quiz questions from JSON file."""
    with open(DATA_DIR / "questions.json", "r") as f:
        return json.load(f)


def load_recommendations():
    """Load skin type recommendations from JSON file."""
    with open(DATA_DIR / "recommendations.json", "r") as f:
        return json.load(f)


def load_products():
    """Load product database from JSON file."""
    with open(DATA_DIR / "products.json", "r") as f:
        return json.load(f)


def get_all_data():
    """Load all seed data at once."""
    return {
        "questions": load_questions(),
        "recommendations": load_recommendations(),
        "products": load_products(),
    }


if __name__ == "__main__":
    data = get_all_data()
    print(f"Loaded {len(data['questions'])} questions")
    print(f"Loaded {len(data['recommendations']['skin_types'])} skin types")
    print(f"Loaded {len(data['recommendations']['concerns'])} concerns")
    print(f"Loaded {len(data['products'])} products")
