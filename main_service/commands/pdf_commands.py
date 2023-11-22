from config import db
from models.pdf_file import PDFFile
import psycopg2

def save_pdf_file_for_course(pdf_file,file_name,course):
    pdf_file = PDFFile(file_name,pdf_file)
    pdf_file.course = course
    pdf_file.course_id = (int)(course.id)
    
    db.session.add(pdf_file) 
    db.session.commit()