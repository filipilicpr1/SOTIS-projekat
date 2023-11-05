from models.pdf_file import PDFFileSchema

def prepare_pdf_files(pdfs) :
    prepared_pdfs = []
    
    for pdf in pdfs :
        prepared_pdfs.append({'title':pdf.title,'id':pdf.id})
        
    return prepared_pdfs

def prepare_pdf_json_object(pdfs):
    pdfs_for_course_json = []
    for pdf in pdfs:
        pdf_file_schema = PDFFileSchema()

        pdf_file_json = pdf_file_schema.dump(pdf)
        pdfs_for_course_json.append(pdf_file_json)
    
    return pdfs_for_course_json