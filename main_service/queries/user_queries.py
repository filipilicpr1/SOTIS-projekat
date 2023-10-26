from config import db
from models.user import User

def get_user_by_email(email):
    if len(email.strip()) == 0:
        return None
    
    users = User.query.filter_by(email=email)
    return next(iter(users), None)