from flask import request, jsonify, Blueprint
from models.user import UserSchema
from commands.user_commands import create_user
from services.users_service import validate_user_fields
from config import db

bp = Blueprint('users', __name__, url_prefix='/api/users')

@bp.route('', methods=["POST"])
def register_user():
    first_name = request.json['firstName']
    last_name = request.json['lastName']
    email = request.json['email']
    password = request.json['password']

    user_is_valid, message = validate_user_fields(first_name, last_name, email, password)
    if not user_is_valid:
        return jsonify({ "error" : message }), 400
    
    user = create_user(first_name, last_name, email, password)
    
    schema = UserSchema(many=False)
    return jsonify(schema.dump(user)), 201