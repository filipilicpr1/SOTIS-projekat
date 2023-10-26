from queries.user_queries import get_user_by_email
from werkzeug.security import check_password_hash
from .constants import email_regex
import re

def validate_user_fields(first_name, last_name, email, password):
    if len(first_name.strip()) == 0:
        return False, "Invalid first name"
    
    if len(last_name.strip()) == 0:
        return False, "Invalid last name"
    
    if (len(email.strip()) == 0 or not re.fullmatch(email_regex, email)):
        return False, "Invalid email"
    
    if len(password.strip()) == 0:
        return False, "Invalid password"
    
    user_exists = get_user_by_email(email) != None
    if user_exists:
        return False, f"User with email {email} already exists"

    return True, "Success"

def validate_login(email, password):
    if (len(email.strip()) == 0 or not re.fullmatch(email_regex, email)):
        return False, "Invalid email"
    
    if len(password.strip()) == 0:
        return False, "Invalid password"
    
    user = get_user_by_email(email)
    if user is None:
        return False, f"User with email {email} does not exist"
    
    if not check_password_hash(user.password, password):
        return False, "Incorrect password"
    
    return True, "Success"