import requests
from decouple import config
from queries.course_queries import get_courses_paginated, get_total_pages
from models.course import CourseSchema
from utils.utils import get_correct_page

PYTHON_SERVICE_API_URI = config('PYTHON_SERVICE_API_URI')

def upload_new_pdf_and_send_to_service(pdf_file, course_id):
    files = {
        'file' : pdf_file
    }

    requests.post(f'{PYTHON_SERVICE_API_URI}/documents/course/{course_id}', files=files)

def send_to_service_pdf_file(pdf_file,course_id):
    files = {
        'file' : pdf_file
    }

    requests.put(f'{PYTHON_SERVICE_API_URI}/documents/course/{course_id}', files=files)

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
    
    return True
    
def get_paginated_response(page):
    page = get_correct_page(page)
    
    courses = get_courses_paginated(page)

    schema = CourseSchema(many=True)
    response = {
        "items" : schema.dump(courses),
        "page" : page,
        "total_pages" : get_total_pages()
    }

    return response

def prepare_course_schema(course) :
    course_schema = CourseSchema()
    course_json = course_schema.dump(course)
    
    return course_json