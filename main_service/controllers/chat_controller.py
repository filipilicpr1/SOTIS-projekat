from flask import jsonify, Blueprint, request
from services.course_services import get_answer_from_service
from queries.course_queries import does_course_exists

bp = Blueprint('chat', __name__, url_prefix='/api/chat')

@bp.route('/course/<course_id>', methods=['GET'])
def answer_question(course_id):
    if not does_course_exists(course_id) :
        return jsonify({'result':"Course doesn't exists"}), 400
    
    question = request.args.get('question')

    if question == '' or question is None :
        return jsonify({'result':"Question is an empty string"}), 400

    response, status_code = get_answer_from_service(course_id, question)

    return jsonify({'result':response}), status_code