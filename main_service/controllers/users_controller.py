from flask import request, jsonify, Blueprint
from models.user import UserSchema, UserType
from commands.user_commands import create_user
from services.users_service import validate_user_fields, validate_login, validate_admin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint('users', __name__, url_prefix='/api/users')

@bp.route('', methods=["POST"])
@jwt_required()
def register_user():
    jwt_email = get_jwt_identity()

    if not validate_admin(jwt_email):
        return jsonify({ "error" : "Forbidden" }), 403

    first_name = request.json['firstName']
    last_name = request.json['lastName']
    email = request.json['email']
    password = request.json['password']

    user_is_valid, message = validate_user_fields(first_name, last_name, email, password)
    if not user_is_valid:
        return jsonify({ "error" : message }), 400
    
    user = create_user(first_name, last_name, email, password, UserType.teacher)
    
    schema = UserSchema(many=False)
    return jsonify(schema.dump(user)), 201

@bp.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    login_is_valid, message = validate_login(email, password)
    if not login_is_valid:
        return jsonify({ "error" : message }), 400

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200