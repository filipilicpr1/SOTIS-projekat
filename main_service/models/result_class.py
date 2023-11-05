from marshmallow import Schema, fields

class CoursePDFs:
    def __init__(self, pdfs):
        self.pdfs = pdfs
        
class CoursePDFsSchema(Schema):
    pdfs = fields.List(fields.String())