from config import db
from models.course import Course
from .constants import courses_per_page
from math import ceil

def does_course_already_exists(title) :
    course = Course.query.filter_by(title=title).all()
    if len(course) != 0:
        return True
    
    return False

def does_course_exists(id) :
    course = Course.query.get(id)
    if course is None :
        return False
    
    return True

def get_course_id_from_title(title) : 
    course = Course.query.filter_by(title=title).all()
    if len(course) != 0:
        return course[0].id
    
    return None

def get_courses_paginated(page):
    return Course.query.order_by(Course.title).paginate(page = page, per_page = courses_per_page).items

def get_total_pages():
    return ceil(Course.query.count() / courses_per_page)