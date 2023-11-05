
def does_pdf_already_exists_in_same_course(title,course):
    pdfs = course.pdfs
    if pdfs is not None and any(pdf_file.title == title for pdf_file in pdfs) :
        return True
    
    return False

