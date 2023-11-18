from flask import Flask

app = Flask(__name__)

# Load configuration from config.py
# config.py will not be visible in the repository, 
# because it is in .gitignore, we will share the file via other means
app.config.from_pyfile('../config.py')

from app.routes import *  # Import all routes

if __name__ == '__main__':
    app.run(debug=True)