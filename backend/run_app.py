from app import app
from app import socketio
import os

if not os.path.exists("backend/instance/site.db"):
    from app import db

    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    socketio.run(app=app)
