from models.pdf_file import PDFFile

def does_pdf_already_exists_in_same_course(title,course_id):
    pdfs = PDFFile.query.filter_by(title=title).all()
    if pdfs is not None and any(pdf_file.course_id == course_id for pdf_file in pdfs) :
        return True
    
    return False

def check_if_pdf_file_with_course_id_exists(pdfs,course_id) :
    for pdf_file in pdfs :
        if pdf_file.course_id == course_id : 
            return True

    return False
