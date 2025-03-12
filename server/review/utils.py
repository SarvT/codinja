from google import genai
from django.conf import settings
import json
import re

print(settings.GEMINI_API_KEY)
client = genai.Client(api_key=settings.GEMINI_API_KEY)
def analyze_code(code, language):
    prompt = f"Analyze this {language} code and provide feedback on best practices, security issues, and optimization:\n\n{code}"
    model = "gemini-2.0-flash"
    response = client.models.generate_content(
    model=model, contents=prompt)
    return response.text if response.text else "No response from AI."

def analyze_code_formatted(code, language):
    prompt = f"""
    Analyze this {language} code and provide structured feedback in JSON format.
    The response should have three keys: 'best_practices', 'security_issues', 'optimization_suggestions', and 'improved_code'. 
    Each key should contain an array of objects with 'id', 'description', and 'severity'. 
    Return only a valid JSON object, without additional text.

    Code:
    {code}
    """

    model = "gemini-2.0-flash"
    response = client.models.generate_content(
    model=model, contents=prompt)

    print(response.text)

    json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
    if json_match:
        json_text = json_match.group(0)  
    else:
        json_text = "{}"  

    try:
        ai_feedback = json.loads(json_text)
    except json.JSONDecodeError:
        ai_feedback = {
            "best_practices": [],
            "security_issues": [],
            "optimization_suggestions": [],
            "improved_code": []
        }

    return ai_feedback  # Always return a dictionary