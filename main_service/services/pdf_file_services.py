from queries.pdf_file_queries import get_pdf_file_by_id
import base64

def get_pdf_encoded(id):
    pdf_file = get_pdf_file_by_id(id)
    if not pdf_file:
        return None, False
    
    pdf_encoded = base64.b64encode(pdf_file.pdf_file)
    return pdf_encoded, True