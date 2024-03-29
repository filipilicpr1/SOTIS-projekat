from config import db
from models.course import Course

def create_new_course(title,description):
    course = Course(title,description)

    db.session.add(course) 
    db.session.commit()
    
    return course

def delete_course(course):
    db.session.delete(course)
    db.session.commit()