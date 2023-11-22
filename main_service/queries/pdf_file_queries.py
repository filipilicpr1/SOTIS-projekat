from models.pdf_file import PDFFile

def does_pdf_already_exists_in_same_course(title,course):
    pdfs = course.pdfs
    if pdfs is not None and any(pdf_file.title == title for pdf_file in pdfs) :
        return True
    
    return False

def get_pdf_file_by_id(id):
    return PDFFile.query.get(id)

def get_pdf_by_title(course_id, title):
    return PDFFile.query.filter_by(course_id = course_id, title = title).first()