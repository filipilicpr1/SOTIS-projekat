import requests
from decouple import config

PYTHON_SERVICE_API_URI = config('PYTHON_SERVICE_API_URI')

def upload_new_pdf_and_send_to_service(pdf_file, course_id):
    files = {
        'file' : pdf_file
    }

    requests.post(f'{PYTHON_SERVICE_API_URI}/documents/course/{course_id}', files=files)

def get_answer_from_service(course_id, question):
    response = requests.get(f'{PYTHON_SERVICE_API_URI}/chat/course/{course_id}?question={question}')
    
    return response.json, response.status_code