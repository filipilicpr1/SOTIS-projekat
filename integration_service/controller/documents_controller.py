from flask import Flask, Blueprint, request, jsonify, make_response
from service.documents_service import get_documents
from .constants import PDF_FILE_ERROR

documents_bp = Blueprint('documents', __name__, url_prefix='/api/documents')

@documents_bp.route('', methods=['POST'])
def create_documents():
    if 'file' not in request.files:
        return make_response(jsonify(PDF_FILE_ERROR), 400)
    
    file = request.files['file']
    bytes_to_send = get_documents(file)

    return make_response(bytes_to_send)