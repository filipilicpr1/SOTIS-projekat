from queries.pdf_file_queries import get_pdf_file_by_id, get_pdf_by_title
from models.pdf_file import PDFFileSchema
import base64

def get_pdf_encoded(id):
    pdf_file = get_pdf_file_by_id(id)
    if not pdf_file:
        return None, False
    
    pdf_encoded = base64.b64encode(pdf_file.pdf_file)
    return pdf_encoded, True

def get_pdf_file(course_id, pdf_title):
    pdf_file = get_pdf_by_title(course_id, pdf_title)

    if not pdf_file:
        return None

    schema = PDFFileSchema(many = False)
    return schema.dump(pdf_file)