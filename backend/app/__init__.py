from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_mail import Mail, Message

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config.from_object('config.Config')
CORS(app, resources={r"/*": {"origins": "*"}})

mail = Mail(app)
db = SQLAlchemy(app)

from app import routes
