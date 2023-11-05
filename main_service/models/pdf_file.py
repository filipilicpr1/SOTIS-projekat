from config import db
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields

class PDFFile(db.Model):
    __tablename__ = 'PDF_FileDB'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    pdf_file = db.Column(db.LargeBinary)
    course_id = db.Column(db.Integer, db.ForeignKey('Courses_DB.id'))
    course = relationship("Course", back_populates="pdfs")

    def __init__(self, title, pdf_file):
        self.title = title
        self.pdf_file = pdf_file

class PDFFileSchema(Schema):
    id = fields.Integer()
    title = fields.Str()
    course_id = fields.Integer()  
