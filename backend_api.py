"""
AutomataTutor AI - Backend Prompt Execution Proxy
SCSE4041 Mini Project - Milestone 2
Authors: Daksh Tyagi & Manik Tyagi
"""

import os
import json
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# System prompt loaded from prompts/final/P1_Automata_Solver.txt
SYSTEM_PROMPT = """
Act as an expert CS professor in Formal Languages and Automata Theory.
Solve the given problem adhering strictly to the following 4 rules:
1. First explain the core logic/intuition.
2. Provide the formal step-by-step derivation, 5-tuple, or state transition table.
3. Test the solution against edge-case inputs (e.g., empty string epsilon).
4. State the final concise answer.
"""

@app.route('/api/solve', methods=['POST'])
def solve_problem():
    data = request.json or {}
    user_problem = data.get('problem', '').strip()
    
    if not user_problem or len(user_problem) < 5:
        return jsonify({
            "status": "error",
            "message": "Invalid input. Please enter a valid automata/computability question."
        }), 400

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return jsonify({
            "status": "demo_mode",
            "result": "API Key not configured on server. Running in static demonstration mode."
        })

    try:
        client = openai.OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Problem: {user_problem}"}
            ],
            temperature=0.2
        )
        return jsonify({
            "status": "success",
            "result": response.choices[0].message.content
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
