from config import app, db

def initialize_app():
    with app.app_context():
        db.create_all()