from config import db
from marshmallow import Schema, fields

class User(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    email = db.Column(db.String(32))
    password = db.Column(db.String(256))

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

class UserSchema(Schema):
    id = fields.Integer()
    first_name = fields.Str()
    last_name = fields.Str()
    email = fields.Str()
