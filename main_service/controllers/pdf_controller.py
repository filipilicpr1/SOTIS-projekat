from flask import make_response, Blueprint, jsonify
from services.pdf_file_services import get_pdf_encoded

bp = Blueprint('pdf', __name__, url_prefix='/api/pdf')

@bp.route('/<pdf_id>', methods=["GET"])
def get_pdf_by_id(pdf_id):
    pdf_encoded, success = get_pdf_encoded(pdf_id)
    if not success:
        return jsonify({"result" : "Pdf does not exist"}), 400
    
    return make_response(pdf_encoded)