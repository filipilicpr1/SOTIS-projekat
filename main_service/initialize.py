from config import app, db
from queries.user_queries import get_user_by_email
from commands.user_commands import create_user
from models.user import UserType

def initialize_app():
    with app.app_context():
        db.create_all()

        admin_exists = get_user_by_email("admin@admin.com") != None
        if admin_exists:
            return
        
        create_user("Admin", "Admin", "admin@admin.com", "admin", UserType.admin)