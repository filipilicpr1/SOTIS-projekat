from flask import Flask
from controller.documents_controller import documents_bp
from controller.chat_controller import chat_bp
from database.config import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:password@localhost:5432/postgres'

db.init_app(app)

app.register_blueprint(documents_bp)
app.register_blueprint(chat_bp)

with app.app_context():
    db.create_all()
        
if __name__ == "__main__":
    app.run(port=5002)