from config import db

class Course(db.Model):
    __tablename__ = 'Courses_DB'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    description = db.Column(db.String(1000))
    pdf_file_id = db.Column(db.Integer, db.ForeignKey('PDF_FileDB.id'),nullable=True)

    def __init__(self, title, description):
        self.title=title
        self.description=description


