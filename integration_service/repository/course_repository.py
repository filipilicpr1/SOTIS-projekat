from database.models.course import Course
from database.config import db
import pickle

def get_course_from_id(id):
    return Course.query.get(id)

def save_new_course_document(course):
    db.session.add(course)
    db.session.commit()
    
def update_course(course,VectoreStore):
    course.vectore_store=VectoreStore
    db.session.commit()
