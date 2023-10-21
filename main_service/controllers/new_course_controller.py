from flask import jsonify, Blueprint,request,json,Flask
from services import new_course_services

bp = Blueprint('api/newcourse', __name__, url_prefix='/api/newcourse')

@bp.route('/addpdf',methods=["POST"])
def add_new_pdf():
    print(request)
    if 'pdfFile' not in request.files:
        return  jsonify({"result":"No file part"}),400

    pdf_file = request.files['pdfFile']
    
    if pdf_file.filename == '':
        return jsonify({"result":"No selected file"}),400
    
    new_course_services.upload_new_pdf_and_send_to_service(pdf_file)
    
    return jsonify({"result":"OK"}),200

