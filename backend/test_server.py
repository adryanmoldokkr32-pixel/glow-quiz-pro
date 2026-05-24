"""Tests for Glow Quiz Pro API."""
import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "Glow Quiz Pro" in data["message"]
    assert "version" in data


def test_get_all_questions():
    response = client.get("/api/questions")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 10
    assert len(data["questions"]) == 10


def test_get_questions_by_category():
    response = client.get("/api/questions/skin_type")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 3
    for q in data["questions"]:
        assert q["category"] == "skin_type"


def test_get_questions_invalid_category():
    response = client.get("/api/questions/nonexistent")
    assert response.status_code == 404


def test_submit_quiz_dry_skin():
    answers = [
        {"question_id": 1, "option_id": "a"},
        {"question_id": 2, "option_id": "a"},
        {"question_id": 3, "option_id": "d"},
        {"question_id": 4, "option_id": "d"},
        {"question_id": 5, "option_id": "a"},
        {"question_id": 6, "option_id": "c"},
        {"question_id": 7, "option_id": "c"},
        {"question_id": 8, "option_id": "b"},
        {"question_id": 9, "option_id": "c"},
        {"question_id": 10, "option_id": "a"},
    ]
    response = client.post("/api/quiz/submit", json={"answers": answers})
    assert response.status_code == 200
    data = response.json()
    assert data["skin_type"] == "dry"
    assert data["primary_concern"] == "dehydration"
    assert "skin_type_info" in data
    assert "recommended_routine" in data
    assert "recommended_products" in data


def test_submit_quiz_oily_skin():
    answers = [
        {"question_id": 1, "option_id": "b"},
        {"question_id": 2, "option_id": "b"},
        {"question_id": 3, "option_id": "c"},
        {"question_id": 4, "option_id": "b"},
        {"question_id": 5, "option_id": "b"},
        {"question_id": 6, "option_id": "d"},
        {"question_id": 7, "option_id": "c"},
        {"question_id": 8, "option_id": "c"},
        {"question_id": 9, "option_id": "d"},
        {"question_id": 10, "option_id": "b"},
    ]
    response = client.post("/api/quiz/submit", json={"answers": answers})
    assert response.status_code == 200
    data = response.json()
    assert data["skin_type"] == "oily"
    assert data["primary_concern"] == "acne"


def test_submit_quiz_empty_answers():
    response = client.post("/api/quiz/submit", json={"answers": []})
    assert response.status_code == 400


def test_get_products():
    response = client.get("/api/products")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 12


def test_get_products_filtered():
    response = client.get("/api/products?skin_type=oily&concern=acne")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] > 0
    for product in data["products"]:
        assert "oily" in product["skin_types"] or "all" in product["skin_types"]


def test_get_skin_types():
    response = client.get("/api/skin-types")
    assert response.status_code == 200
    data = response.json()
    assert "dry" in data
    assert "oily" in data
    assert "combination" in data
    assert "sensitive" in data
    assert "normal" in data


def test_get_concerns():
    response = client.get("/api/concerns")
    assert response.status_code == 200
    data = response.json()
    assert "aging" in data
    assert "acne" in data
    assert "hyperpigmentation" in data
    assert "dehydration" in data
    assert "dullness" in data
