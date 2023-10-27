from flask import request, jsonify, Blueprint
from models.user import UserSchema, UserType
from commands.user_commands import create_user
from services.users_service import validate_user_fields, validate_login, validate_admin
from queries.user_queries import get_user_by_id, get_user_by_email
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint('users', __name__, url_prefix='/api/users')

@bp.route('', methods=["POST"])
@jwt_required()
def register_user():
    id = get_jwt_identity()

    if not validate_admin(id):
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

    user = get_user_by_email(email)
    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 200

@bp.route('/<user_id>', methods=["GET"])
@jwt_required()
def get_user(user_id):
    user = get_user_by_id(user_id)
    if user is None:
        return jsonify({ "error" : "Not foudn" }), 404
    
    schema = UserSchema(many=False)
    return jsonify(schema.dump(user)), 200