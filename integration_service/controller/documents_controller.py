from flask import Flask, Blueprint, request, jsonify, make_response
from service.documents_service import pickle_document, save_documents,update_course_materials,get_course_from_id,create_chunks
from .constants import PDF_FILE_ERROR, SUCCESS_RESPONSE, UNDETECTED_COURSE_ERROR

documents_bp = Blueprint('documents', __name__, url_prefix='/api/documents')

@documents_bp.route('/course/<course_id>', methods=['POST'])
def create_documents(course_id):
    if 'file' not in request.files:
        return make_response(jsonify(PDF_FILE_ERROR), 400)
    
    file = request.files['file']
    
    docs = pickle_document(file,course_id)

    save_documents(docs, course_id)

    return make_response(jsonify(SUCCESS_RESPONSE), 201)

@documents_bp.route('/course/<course_id>', methods=['PUT'])
def add_new_pdf_to_course(course_id):
    if get_course_from_id(course_id) is None :
        return make_response(UNDETECTED_COURSE_ERROR, 400)
        
    if 'file' not in request.files:
        return make_response(jsonify(PDF_FILE_ERROR), 400)
    
    file = request.files['file']
    
    docs = pickle_document(file,course_id)

    update_course_materials(docs, course_id)

    return make_response(jsonify(SUCCESS_RESPONSE), 201)
