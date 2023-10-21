from flask import jsonify, Blueprint,request,json,Flask
from services import new_course_services

bp = Blueprint('newcourse', __name__, url_prefix='/newcourse')

@bp.route('/addpdf',methods=["POST"])
def add_new_pdf():
    print(request)
    if 'pdfFile' not in request.files:
        return  jsonify({"result":"No file part"})

    pdf_file = request.files['pdfFile']
    
    if pdf_file.filename == '':
        return jsonify({"result":"No selected file"})
    
    new_course_services.add_new_pdf_function(pdf_file)
    
    return jsonify({"result":"OK"})

