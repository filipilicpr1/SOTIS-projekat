from config import db
from models.pdf_file import PDFFile

def does_pdf_already_exists_in_same_course(title,course_id):
    pdfs = PDFFile.query.filter_by(title=title).all()
    if len(pdfs) != 0:
        for pdf_file in pdfs :
            if pdf_file.course_id == course_id : 
                return True

    return False
