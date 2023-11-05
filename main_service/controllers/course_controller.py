from flask import jsonify, Blueprint,request
from services.course_services import upload_new_pdf_and_send_to_service,is_course_valid,get_answer_from_service,is_pdf_valid, get_paginated_response, send_to_service_pdf_file, prepare_course_schema
from services.document_service import prepare_pdf_files,prepare_pdf_json_object
from commands.course_commands import create_new_course
from commands.pdf_commands import save_pdf_file_for_course
from queries.course_queries import get_course,does_course_already_exists,does_course_exists
from queries.pdf_file_queries import does_pdf_already_exists_in_same_course
from flask_jwt_extended import jwt_required

bp = Blueprint('course', __name__, url_prefix='/api/course')

@bp.route('/<course_id>/', methods=["GET"])
def get_course_with_course_id(course_id):
    if not does_course_exists(course_id) :
        return jsonify({'result':"Course with that id doesn't exists"})
    
    course = get_course(course_id)
    
    pdfs = prepare_pdf_files(course.pdfs)
    
    pdfs_for_course_json = prepare_pdf_json_object(pdfs)
    
    course_json = prepare_course_schema(course)
    
    return jsonify(course_json,pdfs_for_course_json),200

@bp.route('', methods=["GET"])
def get_courses():
    page = request.args.get('page')
    
    response = get_paginated_response(page)
    return jsonify(response),200

@jwt_required()
@bp.route('', methods=["POST"])
def add_new_course():
    title = request.form.get('title')
    description = request.form.get('description')
    
    if 'pdfFile' not in request.files:
        return  jsonify({"result":"No file part"}),400

    pdf_file = request.files['pdfFile']
    pdf_data=pdf_file.read()
    pdf_file.seek(0)

    if is_course_valid(title,description) and is_pdf_valid(pdf_file) and not(does_course_already_exists(title)) :
        new_course = create_new_course(title,description)
        
        save_pdf_file_for_course(pdf_data,pdf_file.filename,new_course)
        
        upload_new_pdf_and_send_to_service(pdf_file,new_course.id)
        
        return jsonify({"result":"OK"}),201
    
    return jsonify({'result':'ERROR'}),400

@jwt_required()
@bp.route('/<course_id>/', methods=["PUT"])
def add_new_pdf_to_course(course_id):
    if not does_course_exists(course_id) :
        return  jsonify({"result":"Course doesn not exists"}),400
    
    if 'pdfFile' not in request.files:
        return  jsonify({"result":"No file part"}),400

    pdf_file = request.files['pdfFile']
    
    if not is_pdf_valid(pdf_file) :
        return jsonify({"result":"file is unavailable"}),400
    
    course = get_course(course_id)
    
    if does_pdf_already_exists_in_same_course(pdf_file.filename,course) :
        return jsonify({"result":"This file already exists"}),400
    
    pdf_data=pdf_file.read()
    pdf_file.seek(0)
    
    send_to_service_pdf_file(pdf_file, course_id)
    
    save_pdf_file_for_course(pdf_data,pdf_file.filename,course_id)
    
    return jsonify({"result":"OK"}),200


@bp.route('/<course_id>/add-pdf', methods=["POST"])
def add_new_pdf(course_id):
    # TODO: validate course

    if 'pdfFile' not in request.files:
        return  jsonify({"result":"No file part"}),400

    pdf_file = request.files['pdfFile']
    
    if pdf_file.filename == '':
        return jsonify({"result":"No selected file"}),400
    
    upload_new_pdf_and_send_to_service(pdf_file, course_id)
    
    return jsonify({"result":"OK"}),200

@bp.route('/<course_id>/answer', methods=['GET'])
def answer_question(course_id):
    question = request.args.get('question')

    # TODO: validate course

    response, status_code = get_answer_from_service(course_id, question)

    return response, status_code