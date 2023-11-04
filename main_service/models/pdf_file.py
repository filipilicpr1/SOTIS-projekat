from config import db

class PDFFile(db.Model):
    __tablename__ = 'PDF_FileDB'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    pdf_file = db.Column(db.LargeBinary)
    course_id = db.Column(db.Integer, db.ForeignKey('Courses_DB.id'), nullable=True)

    def __init__(self, title, pdf_file,course_id):
        self.title = title
        self.pdf_file = pdf_file
        self.course_id = course_id


