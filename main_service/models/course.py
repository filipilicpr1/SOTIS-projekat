from config import db
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

class Course(db.Model):
    __tablename__ = 'Courses_DB'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    description = db.Column(db.String(1000))
    pdfs = relationship("PDFFile", back_populates="course")

    def __init__(self, title, description):
        self.title = title
        self.description = description


class CourseSchema(Schema):
    id = fields.Integer()
    title = fields.Str()
    description = fields.Str()