from flask import jsonify, Blueprint,request
from services import new_course_services

bp = Blueprint('newcourse', __name__, url_prefix='/api/newcourse')

@bp.route('/<course_id>/add-pdf', methods=["POST"])
def add_new_pdf(course_id):
    # TODO: validate course

    if 'pdfFile' not in request.files:
        return  jsonify({"result":"No file part"}),400

    pdf_file = request.files['pdfFile']
    
    if pdf_file.filename == '':
        return jsonify({"result":"No selected file"}),400
    
    new_course_services.upload_new_pdf_and_send_to_service(pdf_file, course_id)
    
    return jsonify({"result":"OK"}),200

@bp.route('/<course_id>/answer', methods=['GET'])
def answer_question(course_id):
    question = request.args.get('question')

    # TODO: validate course

    response, status_code = new_course_services.get_answer_from_service(course_id, question)

    return response, status_code