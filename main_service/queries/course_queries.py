from config import db
from models.course import Course

def does_course_already_exists(title) :
    course = Course.query.filter_by(title=title).all()
    if len(course) != 0:
        return True
    
    return False

def get_course_id_from_title(title) : 
    course = Course.query.filter_by(title=title).all()
    if len(course) != 0:
        return course[0].id
    
    return None

def get_all():
    courses=Course.query.all()
    print(courses)