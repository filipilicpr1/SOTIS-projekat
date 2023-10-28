from database.config import db
from marshmallow import Schema, fields

class Course(db.Model):
    __tablename__='CourseMaterial'
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    vectore_store = db.Column(db.LargeBinary)
    
    def __init__(self,id,vectore_store):
        self.id = id
        self.vectore_store = vectore_store
