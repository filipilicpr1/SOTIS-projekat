from flask import Flask, Blueprint, request, jsonify, make_response
from service.documents_service import pickle_document, save_documents
from .constants import PDF_FILE_ERROR, SUCCESS_RESPONSE

documents_bp = Blueprint('documents', __name__, url_prefix='/api/documents')

@documents_bp.route('/course/<course_id>', methods=['POST'])
def create_documents(course_id):
    if 'file' not in request.files:
        return make_response(jsonify(PDF_FILE_ERROR), 400)
    
    file = request.files['file']
    docs = pickle_document(file)

    save_documents(docs, course_id)

    return make_response(jsonify(SUCCESS_RESPONSE), 201)