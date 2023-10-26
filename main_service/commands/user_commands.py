from config import db
from models.user import User
from werkzeug.security import generate_password_hash

def create_user(first_name, last_name, email, password):
    password = generate_password_hash(password)
    user = User(first_name, last_name, email, password)

    db.session.add(user) 
    db.session.commit()

    return user