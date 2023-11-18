# API Routes go here

# Sample route
from flask import jsonify
from app import app

@app.route("/", methods=['GET'])
def hello_world():
        return jsonify("Hello World")


