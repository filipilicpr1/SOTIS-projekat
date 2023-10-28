from config import db
from models.pdf_file import PDFFile

def does_pdf_already_exists(title):
    pdf = PDFFile.query.filter_by(title=title).all()
    if len(pdf) != 0:
        return True
    
    return False
