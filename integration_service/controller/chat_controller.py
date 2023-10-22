from flask import Flask, Blueprint, request, jsonify, make_response
from service.documents_service import get_document
from service.chat_service import get_answer
from .constants import UNDETECTED_COURSE_ERROR,ERROR_RESPONSE

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')

@chat_bp.route('/course/<course_id>', methods=['GET'])
def create_answer(course_id):
    document=get_document(course_id)
    if document is None:
        make_response(jsonify(UNDETECTED_COURSE_ERROR),400)
        
    question=request.args.get('question')
    
    if question:
        answer=get_answer(document,question=question)
        return make_response(jsonify(answer), 201)
       
    return make_response(jsonify(ERROR_RESPONSE),400)
    