from models.course import Course
from .constants import courses_per_page
from math import ceil

def get_course(course_id) :
    course = Course.query.get(course_id)
    
    return course

def does_course_already_exists(title) :
    course = Course.query.filter_by(title=title).first()
    if course is None :
        return False
    
    return True

def does_course_exists(id) :
    course = Course.query.get(id)
    if course is None :
        return False
    
    return True

def get_courses_paginated(page):
    return Course.query.order_by(Course.title).paginate(page = page, per_page = courses_per_page).items

def get_total_pages():
    return ceil(Course.query.count() / courses_per_page)