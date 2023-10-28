from config import db
from models.pdf_file import PDFFile

def does_pdf_already_exists_in_same_course(title,course_id):
    pdfs = PDFFile.query.filter_by(title=title,course_id=course_id).all()
    if len(pdfs) != 0:
        return True

    return False
