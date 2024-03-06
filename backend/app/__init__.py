from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config.from_object('config.Config')
CORS(app)

db = SQLAlchemy(app)

from app import routes
