import requests
from decouple import config
from queries.course_queries import does_course_already_exists
from queries.pdf_file_queries import does_pdf_already_exists

PYTHON_SERVICE_API_URI = config('PYTHON_SERVICE_API_URI')

def upload_new_pdf_and_send_to_service(pdf_file, course_id):
    files = {
        'file' : pdf_file
    }

    requests.post(f'{PYTHON_SERVICE_API_URI}/documents/course/{course_id}', files=files)

def get_answer_from_service(course_id, question):
    response = requests.get(f'{PYTHON_SERVICE_API_URI}/chat/course/{course_id}?question={question}')
    
    return response.json(), response.status_code

def is_course_valid(title,description):
    if title is None or title == "" :
        return False
    
    if description is None or description == "" :
        return False
    
    return True

def is_pdf_valid(pdf_file):
    if pdf_file.filename == '':
        return False
    
    if does_pdf_already_exists(pdf_file.filename) : 
        return False
    
    return True
    
    
    
