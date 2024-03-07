from flask import Flask
from flask_socketio import SocketIO
from app import app

socketio = SocketIO(app, cors_allowed_origins="*")

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)